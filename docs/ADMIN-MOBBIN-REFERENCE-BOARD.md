# ESMER — ADMIN MOBBIN REFERENCE BOARD

**Status:** APPROVED FOR IMPLEMENTATION
**Date:** 2026-09-04
**Purpose:** give Claude a visual/functional reference board for the private Esmer owner backend without forcing new design research.

This board applies to `/admin` or the equivalent private Esmer tenant UI. It does **not** replace `docs/ADMIN-BACKEND-DESIGN.md`; it defines the visual and interaction references that document should be implemented against.

The public site remains expressive and cinematic. The admin is a professional instrument panel: restrained, fast, legible, mobile-capable, and unmistakably connected to Esmer without copying the public-site composition.

## Global admin design language

Use:

- a quiet off-white or near-black base
- high-contrast black/white typography
- one restrained Esmer-derived accent sampled from approved artist/release media
- large section titles, compact utility labels, strong hierarchy
- real artwork/media as contextual thumbnails
- persistent publish/draft state
- obvious primary actions
- generous space and low visual noise
- mobile layouts that preserve the same tasks instead of hiding them

Do not use:

- McCluster ruby as the default Esmer accent
- glassmorphism-heavy surfaces
- decorative 3D in admin
- motion that obscures state
- dense enterprise tables where a creator-focused list is enough
- generic SaaS gradients that disconnect the backend from Esmer

## Approved reference synthesis

### 1. Squarespace — Website flow
https://mobbin.com/flows/4c3778d1-699b-4203-8734-6b1540b2be1c

**KEEP**
- persistent left navigation on desktop
- site status visible from the dashboard
- one clear Edit Site / Publish path
- live site preview in context
- neighboring tools such as assets, scheduling, contacts, analytics

**REJECT**
- commerce-heavy information architecture
- visual branding specific to Squarespace

### 2. Kajabi — Website management flow
https://mobbin.com/flows/977b8b1b-94b2-41a6-adef-c8cccb519c3d

**KEEP**
- clear separation between Pages, Navigation, Blog/Posts, and site-level settings
- page list with thumbnails and last-updated state
- obvious `New Page` / `New Post` actions
- creator-friendly website hierarchy without forcing a visual page-builder everywhere

**USE FOR ESMER**
- Site editor index
- Music/release page management
- Logs index
- Press page management

### 3. beehiiv — Editing website draft
https://mobbin.com/flows/841b83a5-59a9-488e-871c-03720715ecff

**KEEP**
- editing canvas plus structured settings
- tabs for web/SEO/delivery-style metadata around the content
- persistent draft/saved state
- Preview and Schedule/Publish controls grouped with the edit workflow

**USE FOR ESMER**
- Logs/posts
- release notes
- press/source summaries
- SEO title, description, slug and social-preview controls

**REJECT**
- newsletter-specific settings that do not map to the site

### 4. Patreon — Manage posts
https://mobbin.com/flows/a9b26f09-cbce-470d-80d2-12ba2694f22a

**KEEP**
- Published / Scheduled / Drafts
- simple list management
- obvious edit/delete controls
- creator-first language

**USE FOR ESMER**
- Logs
- News
- Release announcements
- Studio diaries

### 5. Squarespace — Asset Library
https://mobbin.com/screens/3168d383-2323-47e9-ae48-7cd906d92027

**KEEP**
- folders + visual asset grid
- large thumbnails
- search
- Upload / Add Folder actions
- strong difference between folder and file

### 6. Air — Media library
https://mobbin.com/screens/a1700422-515d-423f-ad8d-6edbfd0c9b4c

**KEEP, LIMITED**
- media-first grid
- tags / filters / search
- visual status metadata
- usage-rights / review-state mentality

**REJECT**
- enterprise collaboration complexity that Justin does not need

**ESMER-SPECIFIC EXTENSION**
Every media item needs a visible rights state: `Esmer-owned`, `McCluster-created`, `platform/embed only`, `press reference only`, or `unknown/do not publish`.

### 7. Seline — Analytics dashboard
https://mobbin.com/screens/31becc74-4060-407f-8102-4516d7cf38b6

**KEEP**
- low-noise top metrics
- simple trend graphs
- top pages
- referrers
- date-range selector

**USE FOR ESMER**
- visits
- unique visitors
- page views
- top release/page/log
- referral sources
- Book views and inquiry conversion
- streaming outbound clicks

### 8. Squarespace — Traffic analytics
https://mobbin.com/screens/84370f2e-90c1-4bf1-bf0d-98c92b8c2232

**KEEP, LIMITED**
- source / keyword / geography breakdown
- traffic trend
- device context

**REJECT**
- anything that turns the owner dashboard into an analyst workstation

### 9. HoneyBook — Lead form builder
https://mobbin.com/flows/a8dee169-f7ef-4943-8327-ed5790e3666d

**KEEP**
- service-aware inquiry form construction
- editable questions
- required/optional controls
- preview before publish
- confirmation settings

**ESMER SERVICE TYPES TO SUPPORT WHEN CONFIRMED**
- Recording
- Production
- Engineering / session support
- Musician / instrumental work
- Live performance
- Collaboration / feature
- Other

Do not invent rates.

### 10. HoneyBook — Contacts
https://mobbin.com/flows/79b630ad-295f-477d-8897-55a7bbc2f03e

**KEEP**
- searchable contact table
- status badge
- last interaction
- minimal list-level detail

### 11. Pipedrive — Lead detail
https://mobbin.com/flows/ae699af3-0b7d-47af-ade1-4fb932564698

**KEEP**
- list/detail split view on larger screens
- notes, activity, files and next action in one workspace
- visible history

**RENAME**
- Deal -> Inquiry / Project / Booking
- Salesperson -> Owner / collaborator if ever needed

## Admin navigation law

Desktop/tablet left rail:

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

Phone bottom navigation:

- Home
- Site
- Bookings
- Media
- More

`More` contains Music, Logs, Contacts, Analytics, Press / SEO, Network and Settings.

## Owner-editing law

Justin must be able to edit without touching code:

- home copy within approved fields
- featured visual
- release order and featured release
- verified streaming links
- release notes and credits
- Logs/posts
- public social links
- service visibility/descriptions
- inquiry-form questions
- media selection/alt text/tags
- press links and short original summaries

Platform/identity-critical fields remain protected or review-gated:

- canonical `Justin Esmer` / `Esmer` identity graph
- canonical domain routing
- JSON-LD entity IDs
- PRIM3 ownership/credit language
- legal terms
- Powered by McCluster attribution
- auth, tenant ownership and permissions
- API destinations/secrets

## Backend implementation boundary

The UI lives here. The backend does not.

Use the McCluster control plane:

- `https://api.mccluster.org`
- shared Supabase-backed auth/data
- tenant-scoped authorization

Do not create a separate Esmer Worker, database, CRM, auth system or social backend.

If a required endpoint does not exist, isolate the UI behind an API client and document the missing control-plane contract rather than inventing parallel persistence.

## Definition of visual success

When Justin opens the backend, it should feel like **his professional operating console**, not McCluster wearing an Esmer logo and not a generic template dashboard.

The hierarchy should make these actions obvious within seconds:

`What changed? -> What needs me? -> Edit site -> Publish -> Manage music -> Respond to bookings -> Check performance.`
