/**
 * Reverse proxy: thebasehuahin.com/admin* -> thebasehuahin-admin.vercel.app/admin*
 *
 * The Next.js back-office app (repo: thebasehuahin-admin) is deployed on
 * Vercel and configured with `basePath: "/admin"`, so its own routes,
 * assets, and API calls already expect to live under /admin. This Worker
 * just forwards the request as-is to the Vercel deployment — no path
 * rewriting needed since both sides agree on the /admin prefix.
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
    const target = new URL(url.pathname + url.search, ADMIN_ORIGIN);
    return fetch(new Request(target, request));
  },
};
