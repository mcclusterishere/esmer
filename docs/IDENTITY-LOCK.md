# ESMER — IDENTITY LOCK

**Status:** CANONICAL / REQUIRED
**Effective:** 2026-09-04

This file exists because broad music-platform searches for `Esmer`, `Justin`, song titles, or similar names can return unrelated artists. Those false matches are not acceptable research inputs for this client site.

## The client

The client is **Justin Esmer**, professionally known as **Esmer**, the Connecticut musician who attends Southern Connecticut State University and is active in the New Haven / Hamden-area music scene.

### Canonical anchors

Use these anchors together when verifying public material:

- Public name: **Justin Esmer**
- Artist name: **Esmer**
- Geography: Connecticut; public coverage identifies Hamden / New Haven roots
- School: Southern Connecticut State University
- Canonical Apple Music artist ID: **1542619015**
- Canonical Apple Music artist URL: `https://music.apple.com/us/artist/esmer/1542619015`
- Release label repeatedly shown on the canonical catalog: **JAJE**
- Confirmed catalog anchors include:
  - `Rotten` — EP (2022)
  - `Ponyo` — single (2023)
  - `Train Stops` — EP (2023)
  - `Achilles Heel` — EP (2024)
  - `YCANTUC` — single (2025)
  - `Heather` — single (2025)
  - `Dive In // Gravitate` — single (2025)
  - `My Everything` — single (2026)

Strong identity-correlated public sources include:

- The Daily Campus, `The Music Never Stops: Esmer`
- Your Favorite Groupies, `An Inside Look at Justin Esmer's Journey with Achilles Heel`
- Southern Connecticut State University Spring 2026 Dean's List
- Space Ballroom's Esmer artist/event bio
- Cherry Tape Magazine's Connecticut scene profile for Justin Esmer
- New Haven Arts coverage naming Esmer as a Connecticut performer

## Explicit false matches — NEVER USE

The following surfaced in broad search results but **are not this client** and must never be added to biography, music, imagery, structured data, media manifests, or design references:

- **Justin Esser** — not Justin Esmer
- **Santa Esmeralda**
- **Caro Emerald**
- **Henry Santos** / `Diamante & Esmeralda`
- **B-Lovee**
- **Emdasche**
- **Everrest**
- **Her Name Echoes**
- **EMA**
- Apple Music artist ID **1585238550** (a different artist also named Esmer)
- Apple Music artist ID **1637095687** (Justin Esser)
- Any other artist or release returned only because a title contains `Esmer`, `Esmeralda`, `Justin`, `Gravity`, `Heather`, `My Everything`, or another overlapping term

This exclusion list is not exhaustive. A name collision is not evidence.

## Verification rule

**No fuzzy identity matching.**

Before any external fact, image, video, music release, credit, or social profile enters this repository as Esmer material, it must satisfy at least one of these:

1. It is directly attached to Apple Music artist ID **1542619015** or a release already anchored to that canonical artist identity; or
2. It names **Justin Esmer / Esmer** and is corroborated by Connecticut / Southern / known-release context; or
3. Justin Esmer or Matthew McCluster directly supplies or confirms it.

For ambiguous results, require two independent identity anchors before accepting them.

### Apple Music-specific rule

Apple Music search output may contain unrelated `top results`. Ignore all of them unless they resolve to the canonical artist ID **1542619015** or to a release independently known to belong to that artist. Do not infer identity from a song title alone.

### Image/video-specific rule

Do not download or save media merely because a search result says `Esmer`. Confirm the page is about Justin Esmer first. When faces are visible, the surrounding source page must independently identify the subject as Justin Esmer / Esmer. Public press images remain reference-only unless reuse rights are confirmed.

## Build rule

Claude and every other agent must read this file before using `docs/ESMER-DOSSIER.md`, `docs/MEDIA-MANIFEST.json`, or doing any new Esmer research.

If a future source conflicts with this identity lock, stop and verify rather than blending the records.
