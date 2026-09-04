# Esmer Admin — implementation handoff

This directory is reserved for the **private Esmer tenant UI**.

Claude: before building here, read:

1. `../CLAUDE.md`
2. `../docs/IDENTITY-LOCK.md`
3. `../docs/ADMIN-BACKEND-DESIGN.md`
4. `../docs/AUTHORITY-LINK-GRAPH.md`
5. upstream `mcclusterishere/mccluster/docs/control-plane/SATELLITE.md`

## Product

Justin Esmer must be able to manage his own tenant from phone or desktop:

- Overview
- Site editor + preview/publish
- Music/releases
- Logs/posts
- Media
- Bookings/inquiries
- Contacts
- Analytics
- Press/SEO
- McCluster Network
- Settings

## Architecture

The admin **UI** lives in this satellite. The backend does not.

Production data/auth/persistence must use the McCluster control plane at `https://api.mccluster.org` and shared Supabase-backed identity/tenant authorization.

Do not create:

- a second Worker
- a second Supabase project
- a service-role key in client code
- a private database inside this repo
- a parallel CRM
- a parallel social network

Use a small API adapter so local fixtures can be swapped for the production McCluster tenant endpoints without rewriting screens.

## Suggested local structure

```text
admin/
  index.html
  css/admin.css
  js/
    app.js
    api.js
    auth.js
    router.js
    preview.js
  views/
    overview.js
    site.js
    music.js
    logs.js
    media.js
    bookings.js
    contacts.js
    analytics.js
    press.js
    network.js
    settings.js
  fixtures/     # local UI development only; never production source of truth
```

A framework is allowed only if it materially improves the admin without bloating the public site. The public Esmer experience and private admin do not have to share the same runtime bundle.

## Publish model

Ordinary tenant content may publish after Esmer authorization. Identity-critical/platform-critical changes require McCluster review as defined in `docs/ADMIN-BACKEND-DESIGN.md`.

The admin must always show whether the user is editing Draft or Published state.
