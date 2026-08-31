# Cloudflare deployment checklist

1. Create a Cloudflare Pages project from this repository.
2. Add `www.puddlepoolssouthernnevada.com` as the primary custom domain.
3. Add `puddlepoolssouthernnevada.com` to Cloudflare DNS and create the apex -> www 301 redirect rule.
4. Optional/recommended: add `portal.puddlepoolssouthernnevada.com` as a second custom domain and route `/portal/` there, or protect `www.../portal/*` directly with Access.
5. Create D1 database: `puddle-pools-ops`.
6. Apply `cloudflare/schema.sql` to D1.
7. Create R2 bucket: `puddle-pools-uploads`.
8. Configure Pages bindings: `DB` -> D1 database, `UPLOADS` -> R2 bucket.
9. Replace the placeholder `database_id` in `wrangler.toml` if deploying with Wrangler.
10. Configure Cloudflare Access for employee portal identities and MFA policy.
11. Configure Cloudflare Turnstile for quote/contact forms and validate tokens server-side before accepting public submissions.
12. Turn on Always Use HTTPS and verify both apex and www behavior.
13. Test `_headers`, especially CSP, then loosen only if a trusted third-party integration requires it.
14. Create a bulk redirect from the default `*.pages.dev` hostname to your canonical `www` hostname.
15. Add real project photos, company contact information, service details and article content before launch.
16. Remove demo credentials and browser-only login logic before production launch.