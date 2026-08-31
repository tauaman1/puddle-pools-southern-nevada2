# Cloudflare DNS + HTTPS deployment template

## Canonical public hostname
Use **https://www.puddlepoolssouthernnevada.com** as the canonical customer URL.

Recommended hostnames:
- `www.puddlepoolssouthernnevada.com` — public customer site
- `puddlepoolssouthernnevada.com` — 301 redirect to `www`
- `portal.puddlepoolssouthernnevada.com` — optional dedicated employee portal; recommended for Cloudflare Access

## DNS template
If the site is deployed as a Cloudflare Pages project, add the custom domain from **Workers & Pages > your project > Custom domains** and let Cloudflare create/validate the required DNS record.

For a dedicated portal hostname pointing at the same Pages project, add it as an additional custom domain. If Cloudflare requests a CNAME, use the exact Pages project hostname it supplies (for example `your-project.pages.dev`) and keep the record proxied.

Do not copy a placeholder Pages hostname from this document into DNS.

## Canonical redirect: apex -> www
Cloudflare Dashboard > Rules > Redirect Rules > Create rule

Rule name: `Apex to WWW`

Match expression:
```
(http.host eq "puddlepoolssouthernnevada.com")
```

Dynamic target expression:
```
concat("https://www.puddlepoolssouthernnevada.com", http.request.uri.path)
```

Status: **301**
Preserve query string: **On**

## HTTPS template
Cloudflare Dashboard > SSL/TLS
- Encryption mode: **Full (strict)** whenever an origin is involved.
- Edge Certificates > Always Use HTTPS: **On**.
- Automatic HTTPS Rewrites: **On** where appropriate.
- Minimum TLS version: TLS 1.2 or newer.
- Enable HSTS only after HTTPS is confirmed working on every hostname you intend to keep.

Recommended HSTS rollout after testing:
- max-age: 6 months initially
- includeSubDomains: only after portal/other subdomains are HTTPS-ready
- preload: leave OFF until you intentionally meet preload requirements

## Employee portal protection
Preferred production hostname: `portal.puddlepoolssouthernnevada.com`.
Create a Cloudflare Zero Trust > Access > Applications > Self-hosted application for the portal hostname, then add allow policies for approved employee identities/groups. This gives an authentication gate before the application loads.

Application-level roles in D1 still control what authenticated employees can do:
- Technician
- Manager
- Administrator

## pages.dev redirect
After the custom domain is working, create a Cloudflare Bulk Redirect from the generated `*.pages.dev` hostname to `https://www.puddlepoolssouthernnevada.com`, preserving path suffix and query string.

## CAA note
If the zone already has restrictive CAA records, make sure they permit the certificate authorities Cloudflare Pages requires. If you do not use CAA records today, do not add them just because this template exists.