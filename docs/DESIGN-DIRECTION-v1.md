# ESMER — CANONICAL DESIGN DIRECTION v1

**Status:** APPROVED
**Approved by:** Matthew McCluster
**Approval date:** 2026-09-04
**Client reference supplied by Justin Esmer:** https://ciar-an.co/logs

This document is the design source of truth for the Esmer client site until Matthew McCluster explicitly revises it. Claude may implement this direction, but may not invent a competing visual system or substitute unapproved references.

## 1. Design workflow gate

The site follows this pipeline:

1. Client reference intake
2. Mobbin / reference research
3. McCluster design synthesis
4. Matthew McCluster approve / reject gate
5. Approved references recorded in this repository
6. Claude implementation
7. Mobile QA
8. Client review

**Do not skip the approval gate.** Research is not implementation permission. A Mobbin result is not a design mandate until it is approved here.

## 2. Client-supplied visual anchor — Ciarán

Justin supplied `ciar-an.co/logs` as a reference. Use it as a **visual-language anchor**, not as a template to clone.

Approved qualities to absorb:

- editorial / art-book presentation
- monochrome or restrained photography
- strong use of negative space
- sparse, deliberate typography
- large visual blocks
- work shown as logs / archive entries rather than generic SaaS cards
- subdued chrome
- image-first storytelling
- a sense of an authored creative world rather than a conventional musician landing page

Do not copy its source code, proprietary assets, photography, typefaces, layout measurements, or exact composition.

## 3. Explicit rejection — Nite Riot

**REJECTED. DO NOT USE.**

Nite Riot is not part of the Esmer design vocabulary. Do not use its dense production-list presentation, column treatment, visual density, typography, or imagery as inspiration. If it appears in previous research notes, treat it as superseded by this document.

## 4. Approved Mobbin references

### A. Freshman — Danik Bartolini
Reference: https://mobbin.com/sites/sections/cc46fe95-d2fb-46a6-927a-96c9bc6d5ecc

**Decision: KEEP.**

Borrow:
- oversized name typography
- dramatic scale contrast between type and portrait
- editorial restraint
- minimal interface furniture
- confident use of open space

Use primarily in the **Esmer / Home identity layer**.

### B. TIDAL — Unplugged / immersive artist video
Reference: https://mobbin.com/sites/sections/ad61ebfa-c138-4341-924b-3e49cd40f302

**Decision: KEEP.**

Borrow:
- full-bleed performance / studio video
- sparse copy over cinematic media
- controlled scroll entry into deeper content
- immediate human presence

Use for studio footage, live-performance media, and the transition into Esmer's spatial studio experience.

### C. Studio Freight — experimental gallery
Reference: https://mobbin.com/sites/sections/2f12827e-5e12-4f35-9bc8-93d914ff9695

**Decision: KEEP, LIMITED.**

Borrow:
- archive / gallery attitude
- curated fragments
- irregular visual sequencing
- the feeling of discovering work rather than browsing a card grid

Do **not** reproduce its desktop interaction model. On mobile, the experience remains linear, legible, thumb-friendly, and predictable enough to navigate easily.

Use most strongly for **Logs / Sessions / Credits / Selected Work**.

### D. Spotify — artist screen
Reference: https://mobbin.com/screens/a846a007-3e3e-44c8-ba26-3452d610700a

**Decision: KEEP FUNCTION ONLY.**

Borrow:
- persistent mini-player behavior
- clear return-to-playback affordance
- immediate artist context
- compact music interaction hierarchy

Do not visually imitate Spotify.

### E. SoundCloud — artist screen
Reference: https://mobbin.com/screens/bab76b2b-aaa3-4b9c-92fb-d5dfa8236eaa

**Decision: KEEP FUNCTION ONLY.**

Borrow:
- clear top-track hierarchy
- artist identity near the listening surface
- persistent player / current-track visibility

Do not visually imitate SoundCloud.

### F. Studio Freight — inquiry / contact
Reference: https://mobbin.com/sites/sections/4496ab63-aada-4e07-933b-c32a13e535b5

**Decision: KEEP.**

Borrow:
- dark minimal inquiry surface
- categorized reasons for contact
- sparse, editorial form presentation
- low distraction

This is the strongest visual reference for the **Book** tab.

### G. Lightship — contact flow
Reference: https://mobbin.com/sites/sections/0791334e-985a-4902-b866-3be56684576c

**Decision: KEEP FLOW, REJECT VISUALS.**

Borrow the sequence:
1. what service do you need?
2. preferred contact / project logistics
3. dates and project information
4. message / inquiry submission

Do not use its corporate visual language.

## 5. Rejected references that remain useful as negative constraints

### Poolsuite player
Reference: https://mobbin.com/screens/af59e33a-5baa-4331-8f77-94cad574a14a

**Decision: REJECT.**

Reason: too themed and skeuomorphic. The UI would compete with Esmer's photography and music.

### Deezer marketing landing treatment
Reference: https://mobbin.com/sites/sections/1baccf4d-68d5-4101-9577-4f6a7469b983

**Decision: REJECT VISUAL LANGUAGE.**

Reason: generic streaming-platform marketing language. Do not use its visual treatment for Esmer.

Functional lessons from music products may still be considered only when they do not conflict with this approved design direction.

## 6. Canonical synthesis

The approved synthesis is:

**Ciarán editorial mood + Freshman typography + TIDAL immersive video + Studio Freight archive/inquiry restraint + Spotify/SoundCloud playback mechanics + McCluster three-tab mobile architecture + McCluster client/control-plane infrastructure.**

Nite Riot is excluded.

The result must feel like **Esmer**, not like a McCluster reskin and not like any one reference site.

## 7. Primary mobile architecture

Persistent bottom navigation remains exactly:

**MUSIC | ESMER | BOOK**

### MUSIC

Treat the music side like entering Esmer's record crate / working catalog.

Possible content sequence:
- current / featured release
- persistent mini-player
- selected tracks
- releases
- production credits
- work for other artists
- videos / session fragments
- PRIM3 case study only after public credit is approved

Visual direction:
- artwork and photography dominate
- copy stays concise
- credits and dates use small editorial metadata
- avoid conventional rounded SaaS-card grids unless a component genuinely needs one

### ESMER — default / center

This is the immersive identity experience.

Recommended narrative progression:

`ESMER → musician → producer → studio → logs → selected work → spatial studio`

Use:
- huge editorial name typography
- deliberately scaled portraits
- full-bleed studio / performance footage
- monochrome photography where appropriate to Esmer's supplied media
- Logs as an authored archive of sessions, releases, performances, experiments, and milestones
- spatial / 3D studio as progressive enhancement, never the critical rendering path

Biography should emerge through the experience. Avoid a long generic About block at the top.

### BOOK

The Book tab is a conversion surface without becoming corporate.

Initial service categories to confirm with Esmer:
- recording
- production
- engineering / session support
- instrumental performance
- live performance
- collaboration / feature
- other

Flow:

`service → dates/logistics → project details → contact → submit`

Use Studio Freight's restraint with Lightship's information architecture. Do not invent public rates.

## 8. Studio capture / spatial layer

The captured studio becomes part of the editorial story before it becomes a 3D feature.

Order of enhancement:
1. strong still photography
2. short cinematic video / scroll sequence
3. optional 360 / spatial media
4. interactive 3D or Marble-derived world when source quality supports it
5. WebXR only where useful

Do not expose security-sensitive studio information.

## 9. McCluster attribution and brand boundary

`Powered by McCluster` is infrastructure / authorship attribution, **not visual colonization**.

- Esmer's public property must feel Esmer-specific.
- Do not force McCluster's red palette, typography, logo system, or unrelated house styling into Esmer's interface.
- McCluster remains the control plane underneath the property.
- Footer attribution remains unobtrusive but visible.

## 10. Ecosystem / social layer

Esmer is a **McCluster client satellite**, not a standalone platform.

The public site is one layer. Esmer's private client tools and future social/network participation live through the McCluster control plane.

Principles:
- no separate Esmer auth/database/CRM/social scheduler in this repo
- tenant-private CRM, metrics, inquiries, and operational data remain private to the Esmer tenant and authorized McCluster operators
- network-visible profiles, posts, collaborations, releases, proof cards, or announcements are opt-in/published surfaces, not automatic exposure of private client data
- the public Esmer property may consume or link to these network surfaces when the control plane exposes sanctioned APIs/components
- never give one client broad access to another client's private tenant data

## 11. Implementation constraints for Claude

Claude may now implement this approved direction, subject to `AGENTS.md` and the upstream McCluster control-plane law.

Before writing visual code, Claude must:
1. read this document completely
2. read `AGENTS.md`
3. read this repo's `CLAUDE.md`
4. read upstream McCluster control-plane instructions
5. inventory actual client assets present in the repo

Claude must not:
- use Nite Riot
- invent a new design reference
- silently substitute a different style
- clone reference code or copyrighted assets
- invent Esmer branding or a logo
- create a second backend
- treat desktop as the primary canvas

If implementation requires a visual decision not resolved by this document, leave a precise TODO and ask Matthew McCluster for approval rather than deciding by taste.
