/**
 * Reverse proxy: thebasehuahin.com/admin* -> thebasehuahin-admin.vercel.app/admin*
 *
 * The Next.js back-office app (repo: thebasehuahin-admin) is deployed on
 * Vercel and configured with `basePath: "/admin"`, so its own routes,
 * assets, and API calls already expect to live under /admin. This Worker
 * just forwards the request as-is to the Vercel deployment — no path
 * rewriting needed since both sides agree on the /admin prefix.
 *
 * Some of Auth.js's own redirects (e.g. the ?error=CredentialsSignin
 * bounce after a failed login) are built from the raw request's own
 * origin rather than any X-Forwarded-* header — and since this fetch()'s
 * outgoing request targets the Vercel domain, that's what Auth.js sees
 * as "its own origin", leaking thebasehuahin-admin.vercel.app into the
 * Location header. (Overriding the Host header to fix this at the source
 * doesn't work either — Vercel 404s requests for a Host it doesn't have
 * registered as a project domain.) So instead we rewrite any leaked
 * Location header on the way back out, after the fact.
 *
 * Deployed as a zone-level Worker Route (not a Pages Function), bound to
 * thebasehuahin.com/admin* — Worker Routes take precedence over Pages'
 * own asset serving/_redirects for the same zone, so this intercepts
 * /admin* before Cloudflare Pages ever sees it.
 *
 * Caching: this Worker used to proxy every single request (HTML, API
 * calls, and every static Next.js asset alike) straight to Vercel with no
 * caching at all, meaning content-hashed, normally-cacheable-for-a-year
 * assets under /admin/_next/static/* re-fetched from Vercel on every load.
 * We now check Cloudflare's edge cache first for GET requests, and after a
 * cache miss, cache the response only if the origin itself marked it
 * `public` with a positive `max-age` and it carries no `Set-Cookie` — so
 * HTML pages, Auth.js session/auth routes, and anything personalized stay
 * live-proxied and are never cached. This intentionally doesn't hardcode
 * Next.js's internal path conventions; it just respects whatever caching
 * directives Vercel/Next.js already sends.
 *
 * Redeploy after changing: wrangler deploy cloudflare-admin-proxy-worker.js
 *   --name thebasehuahin-admin-proxy --route "thebasehuahin.com/admin*"
 *   --compatibility-date 2026-07-04
 */

const ADMIN_ORIGIN = "https://thebasehuahin-admin.vercel.app";

function isCacheableResponse(response) {
  if (response.status !== 200) return false;
  if (response.headers.has("set-cookie")) return false;
  const cacheControl = response.headers.get("cache-control") || "";
  return /(^|,)\s*public\s*(,|$)/i.test(cacheControl) && /max-age=([1-9]\d*)/i.test(cacheControl);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const publicOrigin = url.origin;
    const target = new URL(url.pathname + url.search, ADMIN_ORIGIN);

    const cache = caches.default;
    const isGet = request.method === "GET";

    if (isGet) {
      const cached = await cache.match(request);
      if (cached) return cached;
    }

    const originResponse = await fetch(new Request(target, request));

    const location = originResponse.headers.get("location");
    if (location && location.startsWith(ADMIN_ORIGIN)) {
      const response = new Response(originResponse.body, originResponse);
      response.headers.set("location", location.replace(ADMIN_ORIGIN, publicOrigin));
      return response;
    }

    if (isGet && isCacheableResponse(originResponse)) {
      ctx.waitUntil(cache.put(request, originResponse.clone()));
    }

    return originResponse;
  },
};
