# Esmer Admin — implementation handoff

This directory is reserved for the **private Esmer tenant UI**.

Claude: before building here, read:

1. `../CLAUDE.md`
2. `../docs/IDENTITY-LOCK.md`
3. `../docs/ADMIN-BACKEND-DESIGN.md`
4. `../docs/ADMIN-MOBBIN-REFERENCE-BOARD.md`
5. `../docs/AUTHORITY-LINK-GRAPH.md`
6. `../docs/PRESS-SOURCE-REGISTER.md`
7. `../data/admin-config.json`
8. `../data/site-seed.json`
9. `../data/domain-state.json`
10. upstream `mcclusterishere/mccluster/docs/control-plane/SATELLITE.md`

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

This is an **owner console**, not a read-only analytics page.

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
  css/
    admin.css
    tokens.css
  js/
    app.js
    api.js
    auth.js
    router.js
    preview.js
    state.js
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
  components/
    app-shell.js
    status-badge.js
    publish-bar.js
    metric-card.js
    media-picker.js
    lead-detail.js
    empty-state.js
  fixtures/     # local UI development only; never production source of truth
```

A framework is allowed only if it materially improves the admin without bloating the public site. The public Esmer experience and private admin do not have to share the same runtime bundle.

## Mobbin design language

`../docs/ADMIN-MOBBIN-REFERENCE-BOARD.md` is the approved UI/UX reference board.

Core synthesis:

- Squarespace: site status, edit/publish clarity, preview-in-context
- Kajabi: page/content hierarchy
- beehiiv: draft + SEO + publish workflow
- Patreon: Published / Scheduled / Drafts content states
- Air / Squarespace asset libraries: visual media management
- Seline: creator-readable analytics
- HoneyBook: inquiry form construction and contact management
- Pipedrive: inquiry detail / next-action history

Do not copy those brands visually. The private console should use restrained Esmer identity: neutral surfaces, black/white typography, one approved Esmer-derived accent, real artwork/media for context, and minimal noise.

## Publish model

Ordinary tenant content may publish after Esmer authorization. Identity-critical/platform-critical changes require McCluster review as defined in `docs/ADMIN-BACKEND-DESIGN.md`.

The admin must always show whether the user is editing Draft or Published state.

At minimum display:

- `Saved just now` or equivalent autosave state
- `Unpublished changes`
- last published timestamp
- actor who published when available
- Preview
- Publish / Schedule when allowed

## Owner-editable public content

Justin should be able to change, without touching source code:

- approved hero/subhead copy
- short/long bio blocks within defined content slots
- featured release
- release order
- verified streaming links
- approved cover art selection
- release notes and credits
- Logs/posts
- selected media
- confirmed service visibility
- booking form questions
- public social links
- press/source proposals

He should **not** be able to accidentally rewrite platform law. Canonical identity, schema entity IDs, domain bindings, PRIM3 legal/credit language, auth, API bindings and Powered by McCluster are elevated/platform-controlled.

## Domain state is non-blocking

`../data/domain-state.json` currently records `esmermusic.com` ownership as **unknown/pending client confirmation**.

Do not stop implementation waiting for the answer.

Build canonical-domain handling through one configuration value so the final domain can be changed later without rewriting routes/components. If control of `esmermusic.com` is confirmed, preserve its existing inbound-link equity. If not, continue on the selected replacement domain and update canonicals/backlink outreach once the decision is made.

## First owner-console milestone

The first useful admin build should include:

1. authenticated shell wired to a mockable McCluster API adapter
2. responsive desktop rail + phone bottom navigation
3. Overview with site state, inquiries, traffic and top-content placeholders
4. Site editor with draft state and live-preview shell
5. Music manager seeded from `../data/site-seed.json`
6. Media library shell with rights-state badges
7. Bookings list + inquiry detail using the defined pipeline
8. Press/SEO screen reading `../data/press-sources.json`
9. obvious production-vs-fixture boundary

Stop for product review before implementing speculative platform features.
