# Esmer

Private build repository for the mobile-first artist / producer website for **Justin Esmer (Esmer)**, built by McCluster.

## Product

Three persistent mobile destinations:

- **Music** — catalog, player/streaming links, releases, credits, recent work.
- **Esmer** — immersive scroll-based identity, story, live work, production, studio, press, spatial experience.
- **Book** — recording/production/performance/collaboration inquiries using services and terms that Esmer confirms.

The site will progressively incorporate an immersive representation of Esmer's studio using source media captured on site. 3D/VR is an enhancement, never a requirement for access to core content.

Public footer attribution: **Powered by McCluster**.

## Build sources of truth

Claude must read these before implementation:

- `AGENTS.md` — local build law
- `CLAUDE.md` — implementation order / hard constraints
- `docs/BUILD-START-HERE.md` — consolidated handoff and milestones
- `docs/IDENTITY-LOCK.md` — prevents wrong-person media/metadata contamination
- `docs/ESMER-DOSSIER.md` — sourced Justin Esmer research
- `docs/MEDIA-MANIFEST.json` — current media/source lookup
- `docs/DESIGN-DIRECTION-v1.md` — approved public visual/UX direction
- `docs/PRESS-SOURCE-REGISTER.md` — verified external-source quick register and backlink status
- `docs/AUTHORITY-LINK-GRAPH.md` — press, search authority, structured data, internal links and backlink plan
- `data/press-sources.json` — machine-readable press/backlink source graph
- `data/site-seed.json` — verified implementation seed for identity, navigation, catalog, sections and pending client inputs
- `data/domain-state.json` — domain-ownership state and non-blocking canonical-domain instructions
- `docs/VR-SCROLL-ARCHITECTURE.md` — carved-out studio/360/Marble/VR section
- `docs/ADMIN-BACKEND-DESIGN.md` — private Esmer tenant backend/admin product architecture
- `docs/ADMIN-MOBBIN-REFERENCE-BOARD.md` — approved Mobbin-derived backend design language and flows
- `data/admin-config.json` — admin navigation, rights states, booking pipeline, roles and API-contract seed
- `admin/README.md` — implementation handoff for the owner console
- GitHub issue `#1` — active implementation checklist and review gate

## Canonical design direction

Matthew McCluster approved the current reference synthesis on 2026-09-04.

Key direction:

- client-supplied Ciarán reference is the editorial mood anchor
- Freshman / Danik Bartolini typography and restraint are approved
- TIDAL immersive artist/studio video behavior is approved
- Studio Freight archive language is approved in a limited mobile-safe form
- Spotify and SoundCloud are function-only music references
- Studio Freight inquiry is the principal Book visual reference
- Lightship contact flow is approved, but its corporate visual styling is not
- Poolsuite and Deezer marketing visuals are rejected
- **Nite Riot is explicitly rejected and must not be used**

## Authority goal

The finished property should become the strongest canonical first-party entity for searches around **Justin Esmer / Esmer**.

The repo contains a verified press/source graph including substantial coverage and references from The Daily Campus, Your Favorite Groupies, Cherry Tape Magazine, Cafeteria Media, New Haven Independent, Space Ballroom, New Haven Arts, Midbrow, Southern Connecticut State University and the official music catalog. Claude should use these as citations/source authority, not copy their text or media without rights.

### Existing backlink/domain equity

External source research found that **Cherry Tape Magazine** and **Space Ballroom** already link Justin Esmer / Esmer to `https://www.esmermusic.com/` as his website / Official Website.

Current ownership/control is **unknown and pending Justin’s confirmation**.

That question does **not** block the build. `data/domain-state.json` is the source of truth until Justin answers.

- Keep the canonical domain centralized in configuration.
- If he controls `esmermusic.com`, preserve that existing inbound-link equity.
- If he does not, proceed with the selected replacement domain and update canonical metadata/backlink outreach in one controlled change.
- Do not hard-code ownership assumptions into the UI.

The machine-readable source/backlink state lives in `data/press-sources.json`.

Third-party backlinks cannot be manufactured inside this repo. `docs/AUTHORITY-LINK-GRAPH.md` defines the legitimate post-launch outreach queue for publications that already covered Esmer but do not currently link his official site.

## Private Esmer backend

Justin must be able to operate his own site without editing code.

The private admin UI belongs in this satellite, but authentication, persistence, CRM, analytics, social/network state and authorization remain in the **McCluster control plane**.

Required admin modules:

- Overview
- Site editor + preview/publish
- Music/releases
- Logs/posts
- Media library
- Bookings/inquiry CRM
- Contacts
- Analytics
- Press/SEO
- McCluster client network
- Settings

The admin must work on phone and desktop. `docs/ADMIN-BACKEND-DESIGN.md` defines the functionality and data boundary. `docs/ADMIN-MOBBIN-REFERENCE-BOARD.md` defines the approved visual/interaction references. `data/admin-config.json` gives Claude the implementation seed.

## Current status

- Repository initialized with build law in `AGENTS.md`.
- Claude entry instructions live in `CLAUDE.md`.
- Consolidated implementation handoff lives in `docs/BUILD-START-HERE.md`.
- Approved public design reference register lives in `docs/DESIGN-DIRECTION-v1.md`.
- Identity lock and sourced research are in place.
- Search/press authority graph and machine-readable press data are in place.
- Verified public-site seed data are in `data/site-seed.json`.
- Existing `esmermusic.com` inbound-link equity is documented; ownership remains pending and non-blocking.
- Backend/admin design, Mobbin reference board, admin config and API contract are in place.
- Esmer is registered as a McCluster client satellite in the control-plane registry.
- GitHub issue `#1` tracks the first public-shell and owner-console milestones.
- Studio media, final 360 capture, Marble/spatial world, final services, rates, confirmed canonical-domain control, booking destination, approved artist assets, and final PRIM3 credit language are pending.

## Build — Milestone A shipped

The public shell is implemented. Run the generator after editing anything in
`data/`:

```sh
node scripts/build.mjs
```

Output is committed so GitHub Pages serves it with no build step.

```
index.html            Esmer — home, the cinematic scroll
music/                catalog + a crawlable page per release
press/                press & features source hub
logs/                 the archive
book/                 inquiry flow
css/site.css          the design system
js/app.js             shell: reveal, scroll progress, listening bar
js/book.js            inquiry submission
data/site.json        canonical origin, sameAs, API, service list
data/releases.json    the catalog — one source of truth
scripts/build.mjs     renders every route from data/
```

Every route is real crawlable HTML rather than a client-rendered shell,
because `docs/AUTHORITY-LINK-GRAPH.md` needs `/`, `/music`, `/music/<slug>`,
`/press`, `/logs` and `/book` addressable with meaningful DOM.

### Verified on this build

- WCAG 2.1 AA clean — axe, every page, zero violations
- fully readable and navigable with JavaScript disabled
- no horizontal overflow at 320 / 390 / 430 px
- `prefers-reduced-motion` honoured; no 3D in the critical path
- booking form fails honestly — it never reports success it did not get
- Book is a conversation tree — every service category carries its own follow-up
  questions and only the chosen branch is on screen, via `:has()` rather than
  JavaScript. Answers are transcribed into the lead so an inquiry arrives
  answerable instead of needing three emails to become one
- after a confirmed send, a passwordless account offer so the visitor keeps the
  thread — never offered when the send failed
- sign-in is a **McCluster** account, shared with every McCluster-powered site —
  Google (PKCE/S256) or an email link, with `/auth/` completing the redirect

### Deliberately absent

Gaps left open on purpose; filling them by guessing breaks this repo's rules.

| Gap | Why | Unblocked by |
| --- | --- | --- |
| Covers, portraits, studio imagery | A reference URL is not a rights clearance (`docs/MEDIA-MANIFEST.json`); no stock substitutes | Esmer supplying masters |
| Logo | `CLAUDE.md` §15 — never fabricate or redraw one; typography is the fallback | Esmer supplying brand art |
| Typeface | None approved; unlicensed fonts forbidden. System stack, swappable via one CSS token | Approval |
| Colour accent | Palette is achromatic so Esmer's own artwork supplies the colour | Artwork |
| Rates | `CLAUDE.md` §16 — do not guess | Esmer |
| Lesson rates, length, age/level range | Teaching, its four subjects and both formats are confirmed (Matthew, 2026-09-04). Rates, lesson length and any age or level range are not. In-person is described as Connecticut only — the studio locality stays private | Esmer |
| Fallback contact address | Booking destination is on the approval list; shown only if the API fails | Esmer |
| Studio room, gear, address | Not captured; never invented | On-site capture |
| Spatial / VR studio | Slot carved into the architecture, loads no 3D | Capture |
| Logs in Esmer's voice | Interview material is personal and wants his wording | Esmer |

Placeholders render as labelled empty slots rather than hidden, so nothing
ships looking finished when it is not.

### Before deployment — canonical domain

`data/site.json` sets `canonicalOrigin` to `https://www.esmermusic.com` and
marks it **unconfirmed**. Confirm Justin controls it first. If a different
hostname is chosen, change that one value, re-run the build, and 301 the old
host so the documented inbound links are not dropped.

### Not yet built — Milestone B

The private owner console at `/admin` (`docs/ADMIN-BACKEND-DESIGN.md`,
`docs/ADMIN-MOBBIN-REFERENCE-BOARD.md`). `docs/BUILD-START-HERE.md` asks for
a visual/interaction review after Milestone A before that work starts.

## On-site capture checklist

Capture enough material to build both a conventional cinematic site and a later spatial layer:

- portrait set in studio
- wide room coverage from multiple positions
- slow video passes with stable exposure/focus
- 360 coverage if available
- Esmer playing guitar / singing / producing
- hands-on controls/instruments detail
- ambient room / empty-room shots
- album/release artwork and authorized music assets
- any logo/wordmark files in original quality
- Esmer's preferred bio, service list, contact destination, social links, and booking rules

Before publishing spatial media, remove or obscure private address/access information, serial numbers, codes, keys, sensitive screens/documents, and anything Esmer does not want to reveal publicly.

## McCluster integration

This is a McCluster satellite/client project. It does not own a separate platform backend. See `AGENTS.md`, `CLAUDE.md`, and upstream `docs/control-plane/ECOSYSTEM.md` for the control-plane rules.

Esmer's private CRM, analytics, campaigns, social tools, editable-site state, media metadata, and client-network participation belong to the McCluster control plane. Public network surfaces are opt-in; private tenant data remains tenant-scoped.
