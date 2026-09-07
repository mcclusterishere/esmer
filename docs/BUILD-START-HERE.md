# ESMER — BUILD START HERE

Claude: this file is the handoff. The research and design work has already been done. Do not start by browsing the web.

## Mandatory read order

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/IDENTITY-LOCK.md`
4. `docs/DESIGN-DIRECTION-v1.md`
5. `docs/ESMER-DOSSIER.md`
6. `docs/MEDIA-MANIFEST.json`
7. `docs/PRESS-SOURCE-REGISTER.md`
8. `docs/AUTHORITY-LINK-GRAPH.md`
9. `data/press-sources.json`
10. `data/site-seed.json`
11. `data/domain-state.json`
12. `docs/ADMIN-BACKEND-DESIGN.md`
13. `docs/ADMIN-MOBBIN-REFERENCE-BOARD.md`
14. `data/admin-config.json`
15. `docs/VR-SCROLL-ARCHITECTURE.md`
16. `docs/WEBSITE-STUDIO-BARTER-AGREEMENT-DRAFT.md` for ownership/scope boundaries only; do not convert legal language into public marketing copy
17. Current upstream `mcclusterishere/mccluster/AGENTS.md`, `CLAUDE.md`, `docs/control-plane/ECOSYSTEM.md`, and `docs/control-plane/SATELLITE.md`
18. GitHub issue `#1` for the active implementation checklist and review gate

If these files answer the question, **do not perform fresh external research**. Search only when a manifest/source link is dead, information must be refreshed for launch, or Matthew McCluster explicitly asks for new research.

---

## Product in one sentence

Build Esmer a **mobile-first artist / producer world** with the cinematic scroll discipline and infrastructure relationship of McCluster, but an unmistakably independent Esmer identity built from his music, photography, editorial references, studio, and voice, plus a private owner console Justin can use to operate it himself.

---

## Fixed public information architecture

Persistent mobile bottom navigation:

`MUSIC | ESMER | BOOK`

- **MUSIC** = catalog, release artwork, listening links/player behavior, credits, production work, later PRIM3 case-study capability.
- **ESMER** = default/home, identity, editorial logs, cinematic scroll, live work, production, press, studio threshold, reserved VR/spatial studio section.
- **BOOK** = structured inquiry and conversion flow.

Do not add more primary public tabs because there is more content. Put deeper content behind those three doors.

Crawlable deeper routes should include `/music`, release detail states, `/press`, `/logs`, and `/book` even if the visual experience is presented through one cohesive shell.

---

## Structural relationship to McCluster

Study the current McCluster main page for **behavioral architecture**, not surface styling.

Carry over the principles:

- fast useful first paint;
- poster -> scroll/canvas/video enhancement;
- sticky cinematic scenes;
- clear scroll progress;
- progressive media load;
- obvious bottom navigation;
- rich selected-work scenes instead of flat card grids;
- an embedded spatial/VR sequence that is part of the home narrative;
- accessible DOM underneath the cinematic layer;
- strong finale/conversion;
- reduced-motion and low-power fallbacks.

Do **not** carry over:

- McCluster's ruby palette;
- McCluster marks/logos;
- Vaunt/jet concepts;
- McCluster's album copy;
- McCluster's exact section composition;
- McCluster-specific app-bar labels;
- any asset merely because it exists upstream.

Esmer gets his own visual system.

---

## Approved public design synthesis

Use the exact approval matrix in `docs/DESIGN-DIRECTION-v1.md`.

Short version:

- Ciarán Logs = client visual-language anchor
- Freshman / Danik Bartolini = KEEP
- TIDAL immersive artist video = KEEP
- Studio Freight experimental gallery = KEEP LIMITED
- Studio Freight inquiry = KEEP
- Lightship contact = KEEP FLOW ONLY
- Spotify artist mobile = KEEP FUNCTION ONLY
- SoundCloud artist mobile = KEEP FUNCTION ONLY
- Nite Riot = REJECTED
- Poolsuite visual system = REJECTED
- Deezer marketing visual system = REJECTED

Never silently reintroduce a rejected reference.

For `/admin`, use `docs/ADMIN-MOBBIN-REFERENCE-BOARD.md`. The private console is restrained and creator-operable, not a cinematic copy of the public site.

---

## Data seed and source graph

Use `data/site-seed.json` as the implementation seed for verified identity, navigation, section order, catalog anchors, platform bindings and pending client inputs.

Use `data/press-sources.json` for press/source cards and machine-readable authority relationships.

Use `data/admin-config.json` for owner-console navigation, rights states, booking pipeline, role boundaries and API-contract planning.

Do not convert a source into a biography claim merely because it is present. Identity lock and publication approval rules still apply.

---

## Authority / Press / search graph

The project already has a verified source register and a machine-readable source graph. Use them rather than doing broad name searches:

- `docs/PRESS-SOURCE-REGISTER.md`
- `docs/AUTHORITY-LINK-GRAPH.md`
- `data/press-sources.json`

Build a real `/press` source hub and link relevant sources from release/log pages. Use original summaries; do not republish article bodies.

### Existing backlink/domain equity

External sources already link Justin Esmer / Esmer to `https://www.esmermusic.com/`.

Ownership/control is currently **unconfirmed**. Read `data/domain-state.json`.

**This is not a build blocker. Continue implementation.**

- Keep canonical-domain handling centralized in one config value.
- If Justin confirms he controls `esmermusic.com`, strongly prefer preserving that inbound-link equity.
- If he does not control it, proceed with the selected replacement domain and update canonical metadata/backlink outreach after the domain decision.
- Do not hard-code `esmermusic.com` into components as if ownership were established.

---

## Media workflow

All known public media/reference URLs are centralized in `docs/MEDIA-MANIFEST.json`.

Use those URLs to understand:

- Esmer's current artist image;
- release-art direction over time;
- press/live photography;
- Achilles Heel process/event imagery;
- approved public-design reference frames.

Public press images are **reference-only until reuse rights are confirmed**. Do not ship them simply because the URLs are in the manifest.

Prefer, in order:

1. assets supplied directly by Esmer;
2. assets captured by McCluster for this project;
3. artwork Esmer confirms he controls and authorizes;
4. platform-supported embeds/links;
5. public press photography only after permission/license.

No stock studio photos.

---

## Private owner backend

Justin must be able to operate the site himself. Read:

- `docs/ADMIN-BACKEND-DESIGN.md` — product architecture, modules, permissions, API boundary
- `docs/ADMIN-MOBBIN-REFERENCE-BOARD.md` — approved visual/interaction language researched from Mobbin
- `data/admin-config.json` — implementation seed for navigation, states, roles and proposed API surface
- `admin/README.md` — directory-specific build handoff

The private admin can live under `/admin` in this repo, but it is a **tenant UI**, not a separate backend.

Required modules:

1. Overview
2. Site
3. Music
4. Logs
5. Media
6. Bookings
7. Contacts
8. Analytics
9. Press / SEO
10. Network
11. Settings

Justin must be able to edit ordinary content, preview it, publish it, manage music/release metadata, upload and classify media, post Logs, manage booking inquiries and contacts, see analytics, and maintain approved Press/SEO entries without touching code.

Identity-critical, legal, platform, PRIM3, canonical-routing, permission and Powered by McCluster fields remain protected/review-gated.

### Backend law

Use McCluster:

- API `https://api.mccluster.org`
- Worker `mccluster`
- shared Supabase-backed auth/data

Do not create an Esmer-specific Worker, service-role browser connection, separate CRM, separate auth database, separate analytics backend, or separate social/network persistence.

If the tenant endpoints are not implemented yet, build the UI behind an API-client abstraction with local fixtures and document the missing control-plane endpoints. Do not solve a missing endpoint by creating a second platform.

---

## Build what exists; reserve what does not

### Build now

- mobile public shell;
- three-tab bottom bar;
- Esmer home/editorial structure;
- real catalog metadata and platform links from the repo seed;
- release-art slots wired to approved/authorized sources;
- mini-player behavior / player shell;
- Logs / Selected Work architecture;
- Press/source architecture and internal links;
- booking form UI and McCluster control-plane handoff boundary;
- private admin shell and core owner-edit workflows;
- Powered by McCluster attribution;
- spatial/VR **section structure** and state contract;
- crawlable semantic content;
- accessibility and reduced-motion behavior.

### Reserve, do not fabricate

- 360 studio panorama;
- Marble/spatial studio world;
- studio GLB/splat/NeRF;
- exact studio room dimensions;
- public address;
- complete gear inventory;
- final studio hero photos/video;
- PRIM3 credits that have not been earned/approved;
- rates Esmer has not supplied;
- testimonials nobody gave;
- domain ownership/control that Justin has not confirmed.

---

## Home-page scroll intent

A strong first build should feel roughly like this, without treating it as a rigid wireframe:

1. **Identity arrival** — Esmer name / portrait / immediate atmosphere
2. **Current sound** — latest work / one decisive listen action
3. **Who he is** — minimal editorial copy, not a résumé dump
4. **Logs** — dated/curated fragments of sessions, releases, performances, process
5. **Selected work** — releases and production work as scenes
6. **Live / human** — performance and collaboration energy
7. **Studio threshold** — move from editorial representation toward real space
8. **Studio World / VR reserve** — the section described in `VR-SCROLL-ARCHITECTURE.md`
9. **Book / finale** — turn immersion into action

The bottom bar keeps Music and Book one tap away throughout normal scroll.

---

## Social/client ecosystem

Esmer is a **McCluster client satellite**, already registered in the control-plane registry.

Model the product in three layers:

1. **Public Esmer property** — fans, artists, venues, prospects.
2. **Esmer client/control layer** — Esmer's own inquiries, approved analytics, social/campaign tools, content/admin capabilities exposed by McCluster.
3. **Shared McCluster client network** — opt-in/public client identity, collaboration/discovery/social features as the control plane defines them.

Hard privacy rule: Esmer does not inherit access to another client's private CRM, private analytics, credentials, or tenant-private content. Shared-network visibility must be intentional and tenant-scoped.

Do not create a second social backend in this repo.

---

## First implementation milestones

### Milestone A — public shell

- working mobile shell;
- polished `MUSIC | ESMER | BOOK` bar;
- Esmer home page with the full scroll section sequence represented;
- real release metadata wired in;
- Press/authority page wired to repo data;
- reference-driven visual system established;
- studio-world section visibly carved into the architecture but not faked;
- booking UI present;
- no heavy 3D dependency yet.

### Milestone B — owner console

- `/admin` shell on phone and desktop;
- authentication boundary wired to McCluster adapter;
- Overview dashboard;
- Site editor with draft/preview/publish states;
- Music and Logs management;
- Media library shell with rights states;
- Bookings/inquiry list + detail workflow;
- Analytics and Press/SEO shells using real contracts or clearly labeled fixtures;
- no parallel persistence.

Stop for visual/interaction review after each milestone before spending time on speculative polish.
