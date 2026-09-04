# Esmer

Private build repository for the mobile-first artist / producer website for **Justin Esmer (Esmer)**, built by McCluster.

## Product

Three persistent mobile destinations:

- **Music** — catalog, player/streaming links, releases, credits, recent work.
- **Esmer** — immersive scroll-based identity, story, live work, production, studio, press, spatial experience.
- **Book** — recording/production/performance/collaboration inquiries using services and terms that Esmer confirms.

The site will progressively incorporate an immersive representation of Esmer's studio using source media captured on site. 3D/VR is an enhancement, never a requirement for access to core content.

Public footer attribution: **Powered by McCluster**.

## Canonical design direction

The approved design source of truth is:

- `docs/DESIGN-DIRECTION-v1.md`

Matthew McCluster approved the current reference synthesis on 2026-09-04. Claude must read that document before visual implementation.

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

## Current status

- Repository initialized with build law in `AGENTS.md`.
- Claude entry instructions live in `CLAUDE.md`.
- Approved design reference register lives in `docs/DESIGN-DIRECTION-v1.md`.
- Public artist research has been seeded in `AGENTS.md`, but must be verified with Esmer before public biography/metadata ships.
- Esmer is registered as a McCluster client satellite in the control-plane registry.
- Studio media, final services, rates, domain, booking destination, approved artist assets, and final PRIM3 credit language are pending.

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

Esmer's future private CRM, analytics, campaigns, social tools, and client-network participation belong to the McCluster control plane. Public network surfaces are opt-in; private tenant data remains tenant-scoped.
