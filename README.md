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
- `docs/IDENTITY-LOCK.md` — prevents wrong-person media/metadata contamination
- `docs/ESMER-DOSSIER.md` — sourced Justin Esmer research
- `docs/MEDIA-MANIFEST.json` — current media/source lookup
- `docs/DESIGN-DIRECTION-v1.md` — approved public visual/UX direction
- `docs/AUTHORITY-LINK-GRAPH.md` — press, search authority, structured data, internal links and backlink plan
- `docs/VR-SCROLL-ARCHITECTURE.md` — carved-out studio/360/Marble/VR section
- `docs/ADMIN-BACKEND-DESIGN.md` — private Esmer tenant backend/admin design and functionality

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

The repo now contains a verified press/source graph including substantial coverage and references from The Daily Campus, Your Favorite Groupies, Cherry Tape Magazine, Cafeteria Media, Space Ballroom, New Haven Arts, Midbrow, Southern Connecticut State University and the official music catalog. Claude should use these as citations/source authority, not copy their text or media without rights.

Third-party backlinks cannot be manufactured inside this repo. `docs/AUTHORITY-LINK-GRAPH.md` defines the legitimate post-launch outreach queue for asking existing publishers/venues to add or update Esmer's official-site link.

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

The admin must work on phone and desktop. See `docs/ADMIN-BACKEND-DESIGN.md`.

## Current status

- Repository initialized with build law in `AGENTS.md`.
- Claude entry instructions live in `CLAUDE.md`.
- Approved design reference register lives in `docs/DESIGN-DIRECTION-v1.md`.
- Identity lock and sourced research are in place.
- Search/press authority graph is in place.
- Backend/admin design and API contract are in place.
- Esmer is registered as a McCluster client satellite in the control-plane registry.
- Studio media, final 360 capture, Marble/spatial world, final services, rates, domain, booking destination, approved artist assets, and final PRIM3 credit language are pending.

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
