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
 * Redeploy after changing: wrangler deploy cloudflare-admin-proxy-worker.js
 *   --name thebasehuahin-admin-proxy --route "thebasehuahin.com/admin*"
 *   --compatibility-date 2026-07-04
 */

const ADMIN_ORIGIN = "https://thebasehuahin-admin.vercel.app";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const publicOrigin = url.origin;
    const target = new URL(url.pathname + url.search, ADMIN_ORIGIN);

    const originResponse = await fetch(new Request(target, request));

    const location = originResponse.headers.get("location");
    if (location && location.startsWith(ADMIN_ORIGIN)) {
      const response = new Response(originResponse.body, originResponse);
      response.headers.set("location", location.replace(ADMIN_ORIGIN, publicOrigin));
      return response;
    }

    return originResponse;
  },
};
