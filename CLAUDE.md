# CLAUDE — READ BEFORE BUILDING

You are the primary site builder for the **Esmer** client site.

1. Read this repo's `AGENTS.md` completely before editing anything.
2. Read `docs/IDENTITY-LOCK.md` completely before using any public biography, music metadata, image, video, social profile, or external research. **No fuzzy identity matching is allowed.**
3. Read `docs/DESIGN-DIRECTION-v1.md` completely before making any visual or UX decision. It is the approved public-site design source of truth.
4. Read `docs/ESMER-DOSSIER.md`, `docs/MEDIA-MANIFEST.json`, and `data/site-seed.json` before implementing public content/media.
5. Read `docs/PRESS-SOURCE-REGISTER.md`, `docs/AUTHORITY-LINK-GRAPH.md`, and `data/press-sources.json` before implementing SEO, Press, structured data, canonical URLs, internal links, release pages, or third-party source cards.
6. Read `data/domain-state.json` before hard-coding or configuring any canonical hostname. Domain ownership is pending and is **not** a build blocker.
7. Read `docs/ADMIN-BACKEND-DESIGN.md`, `docs/ADMIN-MOBBIN-REFERENCE-BOARD.md`, `data/admin-config.json`, and `admin/README.md` before implementing `/admin` or any private client-facing management UI.
8. Read `docs/VR-SCROLL-ARCHITECTURE.md` before implementing the studio/VR slot.
9. Read the current `AGENTS.md`, `CLAUDE.md`, `docs/control-plane/ECOSYSTEM.md`, and `docs/control-plane/SATELLITE.md` in `mcclusterishere/mccluster` because this repository is a McCluster satellite/client property.
10. Read GitHub issue `#1` for the active first-build checklist and review gate.
11. Do **not** create a second backend, auth system, database, billing system, CRM, social scheduler, admin data store, or Cloudflare Worker. The Esmer private admin **UI can live in this repo**, but authenticated state/persistence belongs to the McCluster control plane.
12. The primary public UX is **mobile first** with exactly three main bottom destinations: **Music / Esmer / Book**.
13. The center Esmer experience is a cinematic, immersive scroll story. It must work as a fast DOM-first site before any 3D/VR enhancement loads.
14. Studio photos/video/360/3D source assets will arrive after an on-site capture. Architect for them now; never invent the room, gear, address, or capabilities.
15. Treat PRIM3 as confidential work in progress until Matthew McCluster explicitly approves public credits/material.
16. Footer attribution on public pages: **Powered by McCluster** → `https://matthew.mccluster.org/`.
17. Never fabricate or redraw an Esmer logo. Use supplied brand art only; typography is the fallback.
18. Do not guess rates, Spotify IDs, publishing identifiers, studio address, gear models, credits, testimonials, services, or press identity matches.

## Identity lock — non-negotiable

The client is **Justin Esmer**, professionally **Esmer**, the Connecticut / Southern Connecticut State University musician documented in `docs/IDENTITY-LOCK.md`.

The canonical Apple Music artist ID is **1542619015**.

Never use material belonging to similarly named people or artists. In particular, **Justin Esser, Santa Esmeralda, Caro Emerald, Henry Santos, B-Lovee, Emdasche, Everrest, Her Name Echoes, EMA, Apple Music artist 1585238550, and Apple Music artist 1637095687 are not this client.** Broad platform search `top results` are not evidence. If a source cannot be anchored to the canonical identity, discard it.

## Approved public design law

Matthew McCluster approved the current reference synthesis on 2026-09-04. `docs/DESIGN-DIRECTION-v1.md` records the approval.

Important constraints:

- **Nite Riot is explicitly rejected and must not be used as inspiration.**
- Client-supplied Ciarán reference is the editorial mood anchor, not a clone target.
- Freshman / Danik Bartolini: keep typography and editorial restraint.
- TIDAL Unplugged: keep immersive performance/studio-video behavior.
- Studio Freight gallery: keep only the archive/discovery attitude; do not copy its desktop interaction model.
- Spotify and SoundCloud: function-only references for music hierarchy and persistent playback.
- Studio Freight inquiry: keep as the main Book-tab visual reference.
- Lightship contact: keep flow only, reject corporate visual styling.
- Poolsuite and Deezer marketing visual treatments are rejected.

Do not invent new reference-driven styling without Matthew McCluster's approval. If an unresolved visual choice materially changes the direction, leave a precise TODO and ask rather than choosing by taste.

## Search / authority requirement

This site should become the strongest canonical first-party web entity for searches around Justin Esmer / Esmer.

Implement the verified source graph and SEO rules in `docs/AUTHORITY-LINK-GRAPH.md` and use `data/press-sources.json` as the machine-readable source inventory:

- crawlable Home, Music, Press, Logs and Book states
- release-specific crawlable detail states where practical
- one stable Justin Esmer entity ID
- `alternateName: Esmer`
- verified official profiles in `sameAs`
- press/features represented as citations / `subjectOf`, **not** `sameAs`
- strong internal linking among entity, releases, press, logs and booking
- canonical tags, sitemap, robots, OG metadata and authorized imagery

### Existing-domain / backlink rule

Existing external pages already link Justin Esmer / Esmer to `https://www.esmermusic.com/`, but current ownership/control is unconfirmed.

Read `data/domain-state.json` and **continue building regardless**.

- Centralize the canonical hostname in configuration.
- Do not hard-code `esmermusic.com` as owned/controlled.
- If Justin confirms control, preserve the existing inbound-link equity.
- If he does not control it, use the selected replacement domain and update canonical metadata/backlink outreach after the decision.

Do not republish full third-party articles. Use original summaries and links.

## Esmer private admin / backend UI

Justin needs a real tenant-facing backend, not a static site that only McCluster can change.

Build the **UI/experience** described in `docs/ADMIN-BACKEND-DESIGN.md`, using the approved functional/visual reference synthesis in `docs/ADMIN-MOBBIN-REFERENCE-BOARD.md` and the implementation seed in `data/admin-config.json`. The required product includes:

- Overview dashboard
- Site editor with preview and publish states
- Music/release manager
- Logs/posts with Draft / Scheduled / Published
- Media library with rights/approval states
- Booking/inquiry CRM
- Contacts
- Creator-readable analytics
- Press/SEO source manager
- McCluster client-network module when enabled
- Settings

The admin must work on phone as well as desktop.

The admin is **not** a public-site reskin. It should feel lightly Esmer-branded but operate like a disciplined professional console. The Mobbin board controls the interaction-language references; do not invent a generic dashboard aesthetic after those references have already been approved.

### Backend boundary

The current McCluster control plane already exposes authenticated `/v1/me` and uses Supabase-backed auth. Build against the proposed tenant API abstraction in `docs/ADMIN-BACKEND-DESIGN.md`, but **do not implement a separate Worker or direct service-role database access from this repo**.

If required McCluster tenant endpoints do not exist yet:

1. keep the Esmer admin UI separated behind a small API client module,
2. implement fixtures/mock adapters only for local UI development,
3. document the exact missing endpoint contract,
4. make the production adapter point to `https://api.mccluster.org`,
5. do not silently create parallel persistence.

Server-side authorization must enforce tenant boundaries. Hiding controls in the browser is not authorization.

## Client ecosystem boundary

Esmer is a McCluster client tenant/satellite. The public site is not the entire product. Private client operations, CRM, social/network features, campaigns, analytics, and tenant state belong to the McCluster control plane. Esmer may participate in opt-in network-visible client surfaces, but this repo must never expose another client's private tenant data or create a parallel social backend.

Build the site for Esmer, not a reskin of McCluster. McCluster is the interaction/quality reference and the platform behind it; Esmer's own music, imagery, studio, performance footage, typography, and approved creative direction must define the visual identity.
