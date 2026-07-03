/**
 * The Base Hua Hin Apartment — Reservation Backend (Cloudflare Worker)
 *
 * Receives reservation requests from reserve.html and pushes a notification
 * to the owner's LINE via the LINE Messaging API. Also serves the admin
 * dashboard (dashboard.html): PIN check and Google Sheet access happen
 * here so neither the PIN nor the Sheet's Apps Script URL are exposed
 * in client-side code.
 *
 * Required secrets (set in Cloudflare dashboard → Worker → Settings → Variables):
 *   LINE_CHANNEL_ACCESS_TOKEN  — long-lived channel access token from a
 *                                LINE Messaging API channel
 *   LINE_TARGET_ID             — userId or groupId that should receive
 *                                the reservation notification
 *   SHEETS_URL                 — Apps Script Web App URL (reservations sheet)
 *   ADMIN_PIN                  — PIN for dashboard.html
 *   SESSION_SECRET             — long random string, signs admin session tokens
 *
 * See LINE-RESERVATION-BACKEND-SETUP.md for full setup steps.
 */

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 ชั่วโมง

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method === 'POST' && url.pathname === '/api/reserve') {
      return handleReserve(request, env);
    }

    if (request.method === 'POST' && url.pathname === '/api/admin/login') {
      return handleAdminLogin(request, env);
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/reservations') {
      return handleAdminReservations(request, env);
    }

    if (request.method === 'POST' && url.pathname === '/api/admin/update-status') {
      return handleAdminUpdateStatus(request, env);
    }

    return json({ ok: false, error: 'Not found' }, 404, CORS_HEADERS);
  },
};

async function handleReserve(request, env) {
  let res;
  try {
    res = await request.json();
  } catch (e) {
    return json({ ok: false, error: 'Invalid JSON' }, 400, CORS_HEADERS);
  }

  if (!res || !res.name || !res.phone || !res.roomId || !res.moveInDate) {
    return json({ ok: false, error: 'Missing required fields' }, 400, CORS_HEADERS);
  }

  if (!env.LINE_CHANNEL_ACCESS_TOKEN || !env.LINE_TARGET_ID) {
    return json({ ok: false, error: 'Server not configured' }, 500, CORS_HEADERS);
  }

  const text = buildLineText(res);

  try {
    const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: env.LINE_TARGET_ID,
        messages: [{ type: 'text', text }],
      }),
    });

    if (!lineRes.ok) {
      const errBody = await lineRes.text();
      console.log('LINE push failed:', lineRes.status, errBody);
      return json({ ok: false, error: 'Failed to notify via LINE' }, 502, CORS_HEADERS);
    }
  } catch (e) {
    console.log('LINE push network error:', e);
    return json({ ok: false, error: 'Network error contacting LINE' }, 502, CORS_HEADERS);
  }

  // Save to Google Sheets (fire-and-forget — don't fail the reservation if Sheets is down)
  if (env.SHEETS_URL) {
    try {
      await fetch(env.SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res),
        redirect: 'follow',
      });
    } catch (e) {
      console.log('Sheets log failed (non-fatal):', e);
    }
  }

  return json({ ok: true }, 200, CORS_HEADERS);
}

async function handleAdminLogin(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON' }, 400, CORS_HEADERS);
  }

  const pin = (data.pin || '').toString();
  if (!env.ADMIN_PIN || !timingSafeEqual(pin, env.ADMIN_PIN)) {
    return json({ success: false, error: 'Invalid PIN' }, 401, CORS_HEADERS);
  }

  const token = await createToken(env.SESSION_SECRET);
  return json({ success: true, token }, 200, CORS_HEADERS);
}

async function handleAdminReservations(request, env) {
  const ok = await verifyAuthHeader(request, env);
  if (!ok) return json({ error: 'Unauthorized' }, 401, CORS_HEADERS);
  if (!env.SHEETS_URL) return json({ error: 'Not configured' }, 500, CORS_HEADERS);

  try {
    const res = await fetch(env.SHEETS_URL);
    const text = await res.text();
    return new Response(text, { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } });
  } catch (err) {
    console.log('Sheet proxy error:', err);
    return json({ error: 'Failed to fetch sheet' }, 502, CORS_HEADERS);
  }
}

async function handleAdminUpdateStatus(request, env) {
  const ok = await verifyAuthHeader(request, env);
  if (!ok) return json({ error: 'Unauthorized' }, 401, CORS_HEADERS);
  if (!env.SHEETS_URL) return json({ error: 'Not configured' }, 500, CORS_HEADERS);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400, CORS_HEADERS);
  }

  try {
    await fetch(env.SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'update_status', row: body.row, status: body.status }),
    });
    return json({ ok: true }, 200, CORS_HEADERS);
  } catch (err) {
    console.log('Status update proxy error:', err);
    return json({ ok: false, error: 'Failed to update status' }, 502, CORS_HEADERS);
  }
}

async function verifyAuthHeader(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return false;
  return verifyToken(token, env.SESSION_SECRET);
}

// ── Token: base64url(payload) + "." + base64url(HMAC-SHA256(payload)) ──
// Worker เป็น stateless เลยเซ็นชื่อ expiry ไว้ในตัว token เอง แทนที่จะเก็บ session ไว้ที่ server

async function createToken(secret) {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const payloadB64 = toBase64Url(payload);
  const sig = await hmac(secret, payloadB64);
  return `${payloadB64}.${sig}`;
}

async function verifyToken(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;

  const expectedSig = await hmac(secret, payloadB64);
  if (!timingSafeEqual(sig, expectedSig)) return false;

  try {
    const payload = JSON.parse(fromBase64Url(payloadB64));
    return typeof payload.exp === 'number' && Date.now() < payload.exp;
  } catch {
    return false;
  }
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return toBase64Url(String.fromCharCode(...new Uint8Array(sig)));
}

function toBase64Url(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str) {
  return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

function buildLineText(res) {
  const lines = [];
  lines.push('🆕 คำขอจองห้องพักใหม่ — The Base Hua Hin Apartment');
  lines.push('');
  lines.push(`ห้อง: ${res.roomName || res.roomId}`);
  lines.push(`ชื่อ: ${res.name}`);
  lines.push(`โทร: ${res.phone}`);
  if (res.email) lines.push(`อีเมล: ${res.email}`);
  lines.push(`วันที่ต้องการเข้าพัก: ${res.moveInDate}`);
  lines.push(`ระยะเวลาเช่า: ${res.duration === '12+' ? 'มากกว่า 12 เดือน' : res.duration + ' เดือน'}`);
  if (res.note) lines.push(`หมายเหตุ: ${res.note}`);
  return lines.join('\n');
}
