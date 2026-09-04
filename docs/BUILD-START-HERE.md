# ESMER — BUILD START HERE

Claude: this file is the handoff. The research and design work has already been done. Do not start by browsing the web.

## Mandatory read order

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/DESIGN-DIRECTION-v1.md`
4. `docs/ESMER-DOSSIER.md`
5. `docs/MEDIA-MANIFEST.json`
6. `docs/VR-SCROLL-ARCHITECTURE.md`
7. `docs/WEBSITE-STUDIO-BARTER-AGREEMENT-DRAFT.md` for ownership/scope boundaries only; do not convert legal language into public marketing copy
8. Current upstream `mcclusterishere/mccluster/AGENTS.md` and `docs/control-plane/ECOSYSTEM.md`

If these files answer the question, **do not perform fresh external research**. Search only when a manifest link is dead, information must be refreshed for launch, or Matthew McCluster explicitly asks for new research.

---

## Product in one sentence

Build Esmer a **mobile-first artist / producer world** with the cinematic scroll discipline and infrastructure relationship of McCluster, but an unmistakably independent Esmer identity built from his music, photography, editorial references, studio, and voice.

---

## Fixed information architecture

Persistent mobile bottom navigation:

`MUSIC | ESMER | BOOK`

- **MUSIC** = catalog, release artwork, listening links/player behavior, credits, production work, later PRIM3 case-study capability.
- **ESMER** = default/home, identity, editorial logs, cinematic scroll, live work, production, press, studio threshold, reserved VR/spatial studio section.
- **BOOK** = structured inquiry and conversion flow.

Do not add more primary tabs because there is more content. Put deeper content behind those three doors.

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

## Approved design synthesis

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

---

## Media workflow

All known public media/reference URLs are centralized in `docs/MEDIA-MANIFEST.json`.

Use those URLs to understand:

- Esmer's current artist image;
- release-art direction over time;
- press/live photography;
- Achilles Heel process/event imagery;
- approved Mobbin reference frames.

Public press images are **reference-only until reuse rights are confirmed**. Do not ship them simply because the URLs are in the manifest.

Prefer, in order:

1. assets supplied directly by Esmer;
2. assets captured by McCluster for this project;
3. artwork Esmer confirms he controls and authorizes;
4. platform-supported embeds/links;
5. public press photography only after permission/license.

No stock studio photos.

---

## Build what exists; reserve what does not

### Build now

- mobile shell;
- three-tab bottom bar;
- Esmer home/editorial structure;
- real catalog metadata and platform links from the dossier;
- release-art slots wired to approved/authorized sources;
- mini-player behavior / player shell;
- Logs / Selected Work architecture;
- booking form UI and McCluster control-plane handoff boundary;
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
- testimonials nobody gave.

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

## First implementation milestone

The first useful Claude milestone is **not** "finish the whole site."

It is:

- working mobile shell;
- polished `MUSIC | ESMER | BOOK` bar;
- Esmer home page with the full scroll section sequence represented;
- real release metadata wired in;
- reference-driven visual system established;
- studio-world section visibly carved into the architecture but not faked;
- booking UI present;
- no heavy 3D dependency yet.

Then stop for a visual/interaction review before spending time on polish or speculative features.
