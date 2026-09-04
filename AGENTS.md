# ESMER — SITE BUILD LAW

This repository is the website for **Justin Esmer, professionally known as Esmer**. It is a McCluster client/satellite project. The goal is not a generic artist landing page. Build a premium, mobile-first, immersive artist + producer + booking property that feels like a world visitors enter.

## 0. Upstream McCluster law

Before changing this repo, read the current `AGENTS.md` and `CLAUDE.md` in `mcclusterishere/mccluster`.

The McCluster control plane remains canonical:

- Control repo: `mcclusterishere/mccluster`
- Public McCluster property: `https://matthew.mccluster.org/`
- API: `https://api.mccluster.org`
- Cloudflare Worker: `mccluster`
- Shared Supabase project: `zmnhbrjyhxzhkxmhkexs`

This repo is a **satellite/client site**. Do not create a competing backend, auth system, billing system, CRM, social scheduler, database, second Cloudflare Worker, or separate admin stack. If the Esmer site needs forms, bookings, analytics ingestion, CRM, social, or other server-side state, integrate with the McCluster control plane rather than inventing parallel infrastructure.

Never commit secrets or service-role keys to this repo.

## 1. Product definition

### Primary objective

Turn Esmer's existing music, production work, live performance, studio work, and personality into a single conversion-focused property that does three things extremely well:

1. **Listen** — make his music immediately discoverable and playable.
2. **Know Esmer** — communicate who he is, what he sounds like, what he does, and what makes his work distinct.
3. **Book** — convert artists, venues, collaborators, and clients into inquiries for recording, production, performance, and related services.

### Mobile first means mobile first

Design for a phone held in one hand before designing desktop. The phone experience is the primary product, not a compressed desktop version.

Required mobile behavior:

- Respect `env(safe-area-inset-*)`.
- Bottom navigation remains thumb-reachable and does not cover content.
- Minimum practical tap targets: about 44×44 CSS px.
- No interaction may depend on hover.
- No auto-playing audible media.
- Keyboard, screen reader, reduced-motion, and low-power fallbacks must work.
- The meaningful page must render without the 3D layer.
- Heavy media and 3D load after intent or after critical content, never ahead of the first useful paint.

## 2. The three-tab system — non-negotiable

The persistent bottom app bar has exactly three primary destinations. The labels may be tuned after client review, but the information architecture stays this simple.

### LEFT — MUSIC

Purpose: listening, discovery, catalog, recent work.

Include:

- Featured release / current single.
- Playable catalog using audio files that Esmer has actually authorized for site use.
- Apple Music / Spotify / other verified streaming destinations.
- Release artwork supplied by Esmer or obtained from an authorized source.
- Credits, collaborators, videos, and release notes where verified.
- A route or component for recent production work for other artists.
- **PRIM3** may become a featured recent-work/case-study card once its public credit language is approved by Matthew McCluster and Esmer. Do not publish unreleased audio or confidential PRIM3 material.

Do not scrape or download streaming audio. Link/embed according to platform rules, or use files delivered by the rights holder.

### CENTER — ESMER / HOME

Purpose: the immersive identity and story experience.

This is the visual centerpiece and default route/state. It should explain, through motion and media rather than walls of text:

- Justin Esmer → artist name **Esmer**.
- Singer-songwriter, vocalist, guitarist, producer, multi-instrumentalist, live performer.
- Connecticut music-scene identity.
- His sonic range: R&B, jazz, alternative rock and adjacent influences, where supported by his own language or published profiles.
- Production/studio work.
- Selected press and live moments.
- Studio environment once McCluster captures the media.

The experience should be an immersive scroll narrative with cinematic transitions, layered media, tasteful depth, and clear copy. The McCluster site is a reference for pacing, progressive media, bottom-bar interaction, and the idea of entering a world. **Do not blindly clone McCluster styling, assets, logos, or copy. Build an Esmer-specific visual language from Esmer's own supplied artwork, photography, wardrobe, studio, releases, and preferences.**

### RIGHT — BOOK

Purpose: turn interest into action.

The booking experience should support the services Esmer actually confirms. Likely categories to validate before public launch:

- Recording session / studio time
- Music production
- Engineering / session support
- Instrumental or musician services
- Live performance / venue booking
- Collaboration / feature request
- General inquiry

Do not invent rates. If rates are not supplied, use inquiry-based CTAs and collect enough structured information to qualify the lead.

Recommended inquiry fields: name, contact, service type, preferred dates, location/remote, project description, budget range (optional unless Esmer wants it required), reference links, and consent to be contacted.

All server-side booking/contact state should route through the McCluster control plane where feasible.

## 3. Immersive studio / VR layer

Matthew McCluster will capture photos, video, and potentially 360/3D source media at Esmer's studio. The site should be architected now so those assets can be inserted later without a rewrite.

Desired experience:

- Scroll-driven entry into the studio.
- Optional interactive 3D/VR or spatial studio scene.
- Hotspots for instruments, recording position, control area, releases, projects, or stories.
- Ability to move from the spatial experience directly into booking.

Possible source/production pipelines may include Marble 3D World, photogrammetry, NeRF/Gaussian-splat workflows, 360 imagery, GLB/GLTF, or conventional video. **Do not make the site dependent on one vendor or file type.** Treat the 3D world as progressive enhancement behind a stable DOM-first experience.

Required fallback ladder:

1. Static poster/photo + normal page content.
2. Lightweight video/scroll sequence if supported.
3. Interactive 3D/spatial scene on capable devices and after user intent.
4. WebXR only where supported and useful.

Do not expose a private studio's exact address, access path, alarm/security details, equipment serial numbers, keys, door codes, or other sensitive layout information. Before a public 3D/360 launch, review the capture for privacy/security.

## 4. Media capture intake

Expect assets to arrive after an on-site capture. When they arrive, organize them without destructive renaming and preserve originals.

Suggested structure:

```text
assets/
  artist/
    portraits/
    performance/
  music/
    artwork/
    previews/
  studio/
    originals/
    photos/
    video/
    360/
    models/
    posters/
  press/
```

For the studio capture, useful material includes:

- Establishing exterior/interior shots that do not reveal private access details.
- Wide coverage of the room from multiple positions.
- 360 capture if available.
- Portraits of Esmer in the room.
- Performance and production B-roll.
- Hands-on-instrument and console detail shots.
- Clean ambient-room footage.
- Gear closeups only when Esmer wants that gear publicly identified.
- A short spoken introduction or voice clip if he wants the site to have a human/audio layer.

Never invent a gear list from blurry imagery. Ask/verify model names.

## 5. Public research seed — VERIFY BEFORE SHIPPING

These are research leads, not immutable biography. They exist to help build an informed draft. Client-supplied facts outrank third-party summaries, and time-sensitive details must be rechecked before launch.

Publicly surfaced sources:

- Apple Music artist profile: `https://music.apple.com/us/artist/esmer/1542619015`
- DistroKid HyperFollow for `Dive In // Gravitate`: `https://distrokid.com/hyperfollow/esmer/dive-in--gravitate`
- The Daily Campus profile, `The Music Never Stops: Esmer`: `https://dailycampus.com/2024/10/09/the-music-never-stops-esmer/`
- Space Ballroom artist/event bio: `https://spaceballroom.com/e/similar-kind-1296867468509/`
- SCSU Spring 2026 Dean's/President's List: `https://news.southernct.edu/2026/06/03/deans-and-presidents-lists-announced-for-spring-2026/`
- Crescent Magazine profile/search context: `https://crescentmagazine.org/tag/photography/`

Research currently supports that Justin Esmer performs as **Esmer**, is a Connecticut singer-songwriter/guitarist/vocalist/producer with New Haven/Hamden roots, and has an active catalog including `My Everything`, `Dive In // Gravitate`, `Heather`, `YCANTUC`, and `Achilles Heel`. The SCSU Spring 2026 Dean's List contains a Justin Esmer in the College of Arts & Sciences. Do not turn these into a public bio without client confirmation that the records refer to him and remain current.

**Wallingford studio/location is client/user-supplied context and has not been independently verified as a public business location. Keep it private by default until Esmer explicitly approves publication.**

Do not publish age as a persistent bio field based on old event listings.

## 6. PRIM3 integration

`PRIM3` is a Matthew McCluster / McCluster Corp album project that is expected to be recorded/produced in whole or in part with Esmer under a separate signed barter/production agreement.

Until both parties approve public language:

- Treat PRIM3 as confidential work in progress.
- Do not upload unreleased masters, stems, session files, lyrics, story material, or private production notes.
- Do not assert a producer/writer/engineer credit until the actual contribution and final credit are established.

After approval/release, the Esmer site should be able to show PRIM3 as a recent-work case study with accurate role language and a backlink to McCluster. McCluster should likewise be able to link back to Esmer's site as the production/studio collaborator where factually accurate.

## 7. Footer / attribution

Every public page must include an unobtrusive but visible attribution:

**Powered by McCluster**

Link it to `https://matthew.mccluster.org/` unless the owner gives a different canonical McCluster URL.

Do not remove this attribution without Matthew McCluster's written approval.

## 8. Ownership and asset boundaries

Do not confuse client content with platform code.

- Esmer owns or controls the Esmer name/brand assets, music, artwork, photos, videos, biographies, trademarks, and other materials he supplies, subject to any third-party rights.
- McCluster retains its pre-existing code, reusable components, methods, design systems, control-plane infrastructure, backend, utilities, and other background technology.
- Site-specific deliverables and their final ownership/license are governed by the signed barter agreement. Do not add an open-source license that contradicts that agreement.
- Never draw, trace, reconstruct, recolor, or fabricate Esmer's logo. If no logo/wordmark is supplied, use typography only until approved art arrives.
- Never use unlicensed photography, album art, fonts, video, music, or 3D assets.

## 9. Build architecture

Start simple and fast. Prefer a static/DOM-first architecture with progressive JavaScript enhancement. Do not introduce a large framework merely because the repo is empty.

A reasonable initial structure:

```text
index.html
music.html or route/state for Music
book.html or route/state for Booking
css/
  style.css
js/
  app.js
  media.js
  spatial.js      # only when 3D arrives
assets/
AGENTS.md
CLAUDE.md
README.md
```

If a single-page shell produces the cleanest mobile three-tab experience, that is acceptable, but it must retain crawlable, accessible content and addressable states/URLs for music and booking.

### Performance budget

Target:

- Useful first paint immediately on a normal mobile connection.
- LCP approximately <= 2.5s on a representative midrange phone when network conditions allow.
- No giant 3D bundle in the critical path.
- Lazy-load embeds, video, and models.
- Use responsive image sizes and modern formats while retaining original source media separately.
- Honor `prefers-reduced-motion`.

## 10. SEO / identity graph

Once client identity and links are verified, add structured data that clearly distinguishes:

- `Person`: Justin Esmer
- Artist/performing identity: Esmer
- Music releases / recordings
- Offers or services where appropriate
- Verified `sameAs` links to streaming/social profiles

Do not invent Spotify IDs, ISNIs, PRO affiliations, business addresses, phone numbers, or credits. Verify before adding structured data.

## 11. Content and UX rules

- Lead with real work, sound, and image, not marketing adjectives.
- Keep copy tight enough to read on a phone.
- Show proof: releases, press, live footage, credits, projects.
- Make the booking CTA obvious without turning every viewport into an advertisement.
- Preserve user control over sound and animation.
- Do not manufacture testimonials or client names.
- Do not imply studio capabilities or services that Esmer has not confirmed.
- Every placeholder must be labeled in code/content as provisional and easy to replace.

## 12. Definition of done for v1

Do not call v1 complete until all of the following are true:

- Three-tab mobile navigation is polished and stable.
- Music can be explored and played/linked from authorized sources.
- Center Esmer story is visually compelling without depending on 3D.
- Booking flow works end-to-end on phone and desktop.
- Powered by McCluster attribution is present.
- No confidential PRIM3 material is exposed.
- No guessed address, prices, credits, gear, or identity IDs are published.
- Accessibility and reduced-motion pass is complete.
- Core content is crawlable.
- 3D/spatial assets, if present, are lazy and have fallbacks.
- Esmer has a clean approval pass for biography, services, releases, imagery, and contact routing.
- Matthew McCluster has a clean approval pass for McCluster attribution and any PRIM3 references.

## 13. Agent behavior

Claude is the primary site builder for this repo unless Matthew McCluster explicitly changes that instruction. Other agents may research, audit, prepare assets, or make narrowly requested changes, but they must not redesign the site behind Claude's work or create competing infrastructure.

When blocked by missing content, leave a precise TODO and build the surrounding structure. Do not fill factual gaps with guesses.
