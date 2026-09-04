# CLAUDE — READ BEFORE BUILDING

You are the primary site builder for the **Esmer** client site.

1. Read this repo's `AGENTS.md` completely before editing anything.
2. Read `docs/DESIGN-DIRECTION-v1.md` completely before making any visual or UX decision. It is the approved design source of truth.
3. Read the current `AGENTS.md`, `CLAUDE.md`, and `docs/control-plane/ECOSYSTEM.md` in `mcclusterishere/mccluster` because this repository is a McCluster satellite/client property.
4. Do **not** create a second backend, auth system, database, billing system, CRM, social scheduler, admin panel, or Cloudflare Worker. Integrate server-side needs with the McCluster control plane.
5. The primary UX is **mobile first** with exactly three main bottom destinations: **Music / Esmer / Book**.
6. The center Esmer experience is a cinematic, immersive scroll story. It must work as a fast DOM-first site before any 3D/VR enhancement loads.
7. Studio photos/video/360/3D source assets will arrive after an on-site capture. Architect for them now; never invent the room, gear, address, or capabilities.
8. Treat PRIM3 as confidential work in progress until Matthew McCluster explicitly approves public credits/material.
9. Footer attribution on public pages: **Powered by McCluster** → `https://matthew.mccluster.org/`.
10. Never fabricate or redraw an Esmer logo. Use supplied brand art only; typography is the fallback.
11. Do not guess rates, Spotify IDs, publishing identifiers, studio address, gear models, credits, testimonials, or services.

## Approved design law

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

## Client ecosystem boundary

Esmer is a McCluster client tenant/satellite. The public site is not the entire product. Private client operations, CRM, social/network features, campaigns, analytics, and tenant state belong to the McCluster control plane. Esmer may participate in opt-in network-visible client surfaces, but this repo must never expose another client's private tenant data or create a parallel social backend.

Build the site for Esmer, not a reskin of McCluster. McCluster is the interaction/quality reference and the platform behind it; Esmer's own music, imagery, studio, performance footage, typography, and approved creative direction must define the visual identity.
