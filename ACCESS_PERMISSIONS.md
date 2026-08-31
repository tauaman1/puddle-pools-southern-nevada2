# Portal access + permission design

## Layer 1 — Cloudflare Access
Protect the employee hostname/path before the application is served. Allow only company-approved employee identities. Require MFA at the identity-provider level when available.

## Layer 2 — Application role
Store the employee's business role in D1 and enforce it server-side on every privileged API route.

Technician permissions:
- View assigned route/truck
- Submit inspections and photos
- Update assigned-truck inventory
- View approved documents
- Complete training

Manager permissions:
- All Technician permissions
- View team inspection submissions
- Receive and clear operational notifications
- Review inventory across assigned trucks
- View training completion across team

Administrator permissions:
- All Manager permissions
- Create/disable employees
- Assign roles and trucks
- Publish/remove documents and training modules
- Change par levels and fleet configuration
- Review all lead/booking submissions

The browser-only demo role switch is NOT authentication. In production, derive employee identity from Cloudflare Access or a verified auth token and enforce authorization in Pages Functions/Workers.