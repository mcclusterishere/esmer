# ESMER — ADMIN / CLIENT BACKEND DESIGN

**Status:** approved implementation brief for Claude
**Scope:** Esmer tenant UI only. The actual backend remains the McCluster control plane.

This document defines the private client backend Justin Esmer will use to manage his public site, media, bookings, content, analytics and connected McCluster client/network features.

## 0. Architectural law

Do **not** create a second backend in this repository.

Canonical platform:

- API: `https://api.mccluster.org`
- Worker: `mccluster`
- Supabase project: `zmnhbrjyhxzhkxmhkexs`
- Auth is Supabase-backed and the current McCluster Worker already exposes authenticated `/v1/me`.
- `mcclusterishere/esmer` is the Esmer **tenant UI / satellite**, not a new control plane.

The admin UI may live under `/admin` or an equivalent private route in this repository, but all authenticated state, tenant ownership, persistence, CRM, analytics ingestion, social/network state and authorization must route through McCluster APIs / shared tables.

Never expose a service-role key, database secret, other tenant data or direct unrestricted database write in browser code.

## 1. Design principle

The public site is cinematic and expressive. The backend should feel related to Esmer but behave like a professional instrument panel: quiet, fast, legible and hard to misuse.

### Visual language

- neutral warm/off-white or deep near-black surfaces, depending on user preference
- black/white primary typography with **one restrained Esmer accent** sampled from approved current artwork, not McCluster ruby
- strong typography, large section labels, compact utility copy
- generous whitespace
- obvious publish state
- artwork/media used as context, not decoration
- no glassmorphism soup
- no novelty 3D in admin
- animations limited to state transitions and feedback
- visible autosave / draft state
- explicit destructive-action confirmation

The backend is not a reskin of the public Ciarán-inspired site. It should share Esmer’s typography/identity lightly while prioritizing utility.

## 2. Approved Mobbin reference synthesis

These references are functional/design research, not templates to clone.

### A. Squarespace — Website flow
`https://mobbin.com/flows/4c3778d1-699b-4203-8734-6b1540b2be1c`

**KEEP:**
- persistent left navigation on desktop
- one obvious `Edit Site` / `Publish` action
- live site preview in context
- site status/progress visible without opening multiple screens
- content, scheduling, contacts and analytics organized as adjacent tools

**DO NOT COPY:** Squarespace visual brand or commerce-heavy IA.

### B. Patreon — Manage posts
`https://mobbin.com/flows/a9b26f09-cbce-470d-80d2-12ba2694f22a`

**KEEP:**
- Published / Scheduled / Drafts states
- simple content list
- fast edit/delete controls
- creator-first content management

Use this for **Logs / News / Announcements / release notes**.

### C. Squarespace — Asset Library
`https://mobbin.com/screens/3168d383-2323-47e9-ae48-7cd906d92027`

**KEEP:**
- folder + asset-grid mental model
- large visual thumbnails
- upload and folder actions at top
- search
- clear distinction between files and folders

### D. Air — upload/media library
`https://mobbin.com/screens/a1700422-515d-423f-ad8d-6edbfd0c9b4c`

**KEEP, LIMITED:**
- visual asset board
- filter/tag/search behavior
- media review status
- uploader identity / recency metadata where helpful

Do not reproduce Air’s enterprise complexity.

### E. Seline — analytics dashboard
`https://mobbin.com/screens/4e47be94-6871-46ed-b703-eeae23153be4`

**KEEP:**
- simple top metrics
- traffic trend
- top pages
- referrers
- date control
- low visual noise

Prefer this level of clarity over Google Analytics-style density.

### F. Squarespace — traffic analytics
`https://mobbin.com/screens/bc8707aa-636a-4d38-bee0-6e328a9c78f9`

**KEEP, LIMITED:**
- traffic / source / keyword / geography tabs
- trend visualization
- channel breakdown

Use only the useful creator-facing metrics. Do not turn Esmer into an analytics engineer.

### G. HoneyBook — lead form builder
`https://mobbin.com/flows/a8dee169-f7ef-4943-8327-ed5790e3666d`

**KEEP:**
- service-aware inquiry forms
- editable questions
- required/optional field control
- preview before publishing
- confirmation behavior

Adapt service types to Esmer: recording, production, engineering/session support, musician work, performance, collaboration/feature and general inquiry.

### H. HoneyBook — Contacts
`https://mobbin.com/flows/79b630ad-295f-477d-8897-55a7bbc2f03e`

**KEEP:**
- simple searchable contacts table
- status badges
- last interaction
- minimal contact metadata in list view

### I. Pipedrive — Lead detail
`https://mobbin.com/flows/ae699af3-0b7d-47af-ade1-4fb932564698`

**KEEP:**
- list + detail split-view on desktop
- notes/activity/files together
- next-action control
- history visible without leaving the lead

Adapt terminology from “deal” to **Inquiry / Project / Booking**.

## 3. Responsive navigation

### Desktop/tablet
Left rail:

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

Primary top-right action: **Preview Site**.
Contextual publish button appears wherever a draft exists.

### Phone
Bottom navigation:

- Home
- Site
- Bookings
- Media
- More

`More` opens Music, Logs, Contacts, Analytics, Press/SEO, Network and Settings.

Admin must be usable on a phone. Do not make basic edits desktop-only.

## 4. Overview dashboard

The first screen should answer, in less than ten seconds:

- Is the site live?
- Are there unpublished changes?
- Did anyone inquire/book?
- What content is performing?
- Is there anything Justin needs to respond to?

Cards:

- `Site` — Live / Draft changes / last publish
- `New inquiries` — count + oldest waiting
- `Upcoming` — confirmed/pending session or performance date if integrations support it
- `Traffic` — last 7 / 30 days
- `Top content` — release, log or page
- `Music clicks` — outbound Apple/Spotify/etc. click totals when tracked
- `Booking conversion` — inquiries from Book route
- `Media pending review` — if collaborative uploads are enabled
- `Network` — relevant new McCluster client-network activity, opt-in only

No vanity metric gets prime placement unless it changes an action.

## 5. Site editor

Justin should be able to edit public-facing content without touching code.

Editable groups:

### Home / Esmer
- hero headline/subheadline
- short bio / long bio blocks
- featured visual selection
- selected press blocks
- selected work
- studio/VR intro copy
- social links
- CTA copy within allowed layout slots

### Music
- feature/unfeature release
- reorder release cards
- add verified release link
- select cover artwork from approved media
- add credits / collaborators
- add release note
- control streaming buttons

### Book
- turn confirmed service categories on/off
- service descriptions
- inquiry questions
- availability language
- response-time expectation
- preferred contact method
- confirmation message

### Press
- add source URL
- publisher
- title
- date
- original summary
- tie source to release/project

Critical identity/security fields should **not** be a free-text instant publish:

- canonical artist identity / legal-name mapping
- canonical domain
- JSON-LD entity IDs
- PRIM3 ownership/credit language
- Powered by McCluster attribution
- auth / permissions
- API destinations
- secrets

Those are platform-controlled or review-required.

## 6. Content states and publishing

Every editable item has:

- Draft
- Published
- Scheduled where scheduling is useful
- Archived

Show `Saved just now`, `Unpublished changes`, and `Last published by ...` explicitly.

### Two publishing classes

**Instant tenant content** can publish directly after authorization:
- Logs/posts
- gallery/media selection
- booking-service visibility
- booking form questions
- public social links
- featured release/order
- non-sensitive short copy

**Identity-critical / platform-critical content** requires McCluster review or an elevated role:
- canonical name/identity graph
- schema IDs
- domain/canonical routing
- PRIM3 credits/ownership statements
- legal terms
- Powered by McCluster removal/change
- platform integrations

Do not force every typo fix through McCluster, but do not let a tenant accidentally break the identity graph or platform contract.

## 7. Live preview

Editing uses a two-pane pattern on wide screens:

- controls/content form on left or side panel
- live public-site preview on right/main canvas

Phone: edit first, then a sticky `Preview` button opens the same route in preview mode.

Preview modes:

- mobile
- desktop
- reduced motion

VR/spatial media should not attempt to fully run inside every admin preview. Show poster/state and a dedicated `Preview spatial section` action.

## 8. Media library

Collections:

- Portraits
- Live
- Studio
- Releases
- Press
- Video
- 360 / Spatial
- PRIM3 private
- Archive

Metadata per asset:

- title
- type
- source/uploader
- captured date
- credit / creator
- usage rights state
- public/private
- alt text
- tags
- linked release/project
- approval state
- focal point / crop preference where useful

Rights states:

- `Esmer-owned / supplied`
- `McCluster-created / licensed for site`
- `platform artwork / embed only`
- `press reference only`
- `unknown — do not publish`

The admin should make it difficult to accidentally publish a reference-only press photo.

## 9. Logs / posts

Use the Patreon-inspired Published / Scheduled / Drafts behavior.

Fields:

- title
- date
- cover/media
- short deck
- body
- linked release/project
- tags
- SEO title/description
- social share preview

Logs become first-party authority content: studio diaries, release notes, behind-the-scenes process, performance notes and verified project updates.

Do not auto-generate fake personal stories in Justin’s voice.

## 10. Bookings / inquiry CRM

Public Book form submits into the McCluster control plane and appears in Esmer’s tenant-scoped backend.

Pipeline:

`New → Needs reply → Qualified → Date proposed → Confirmed → Completed → Archived`

Optional terminal state: `Declined`.

Inquiry detail:

- contact
- requested service
- preferred date(s)
- location / remote
- project description
- budget if collected
- links/files
- conversation history
- internal notes
- next action
- status

Justin can:

- reply through supported connected channel when available
- add internal note
- change status
- propose date
- archive
- create contact/project

The Esmer repo must not create its own CRM database.

## 11. Contacts

Tenant-scoped contacts only.

Fields visible by default:

- name
- primary contact
- relationship/type
- last interaction
- status
- linked inquiries/projects

Possible types:

- Artist
- Venue
- Promoter
- Producer
- Musician
- Press
- Client
- Collaborator
- Other

## 12. Analytics

Show creator-actionable metrics:

- visits / unique visitors
- page views
- top routes
- referrers
- search traffic when available
- device split
- streaming-platform outbound clicks
- release-card clicks
- Book views
- inquiry starts
- inquiry submissions
- conversion rate
- top press referral source
- top Logs content

Default window: 30 days. Quick switch: 7d / 30d / 90d / custom.

Avoid exposing raw internal tracking identifiers to Justin unless needed for troubleshooting.

## 13. Press / SEO control

This screen is specifically designed to reinforce Esmer as the canonical entity.

Modules:

- Identity health: canonical name, stage name, official-domain status
- Verified official profiles
- Press source library from `docs/AUTHORITY-LINK-GRAPH.md`
- Missing metadata warnings
- sitemap / indexing status when available
- top search/referral terms when available
- backlink outreach status (CRM-linked, not a spam tool)

Justin can add a proposed press link, but it should pass the identity lock and duplicate check before becoming public.

## 14. McCluster client network

The private backend can surface the wider McCluster creator/client network without leaking private tenant data.

Initial network functions:

- public profiles of opted-in clients
- collaboration requests
- cross-client project invites
- shared public posts/announcements
- referrals
- approved public metrics/proof cards

Never expose another tenant’s private contacts, CRM, analytics, drafts, files or booking data.

Network is a module of the McCluster control plane. Do not build a separate social database in Esmer.

## 15. Roles / permissions

Minimum role model:

### Esmer Owner
Justin can manage his tenant’s day-to-day content, media, bookings, contacts, logs, public services and analytics.

### Esmer Collaborator
Optional future role. Can be limited to media/content or booking operations.

### McCluster Platform Admin
Can manage platform bindings, identity-critical fields, legal/PRIM3 constraints, integrations, tenant ownership and recovery.

All authorization is enforced server-side, not by hiding buttons.

## 16. Required API contract for Claude

Claude should build the admin UI against a clear API abstraction and **must not invent browser-direct service-role database access**.

Proposed namespace for implementation planning:

- `GET /v1/clients/esmer/me`
- `GET /v1/clients/esmer/content`
- `PATCH /v1/clients/esmer/content/:id`
- `POST /v1/clients/esmer/publish`
- `GET /v1/clients/esmer/media`
- `POST /v1/clients/esmer/media`
- `PATCH /v1/clients/esmer/media/:id`
- `GET /v1/clients/esmer/inquiries`
- `GET /v1/clients/esmer/inquiries/:id`
- `PATCH /v1/clients/esmer/inquiries/:id`
- `GET /v1/clients/esmer/contacts`
- `GET /v1/clients/esmer/analytics`
- `GET /v1/clients/esmer/press`
- `POST /v1/clients/esmer/press`
- `GET /v1/clients/esmer/network`

These are an **API contract proposal**, not permission to create a second Worker. If the control-plane implementation uses a more generic tenant path such as `/v1/tenants/:tenantKey/...`, use that instead and keep Esmer scoped by authorization.

## 17. Data model requirements

The shared control plane needs tenant-scoped equivalents of:

- tenant
- tenant_members
- site_content
- content_revisions
- releases / music_links
- media_assets
- posts / logs
- service_catalog
- inquiry_forms
- inquiries
- inquiry_activity
- contacts
- analytics_events / rollups
- press_sources
- social/network profile + opt-in public activity

Use RLS/authorization to prevent cross-tenant reads/writes. Do not assume these exact table names already exist; map to current McCluster schema first.

## 18. Security / safety requirements

- private studio address stays private unless Esmer explicitly publishes a business location
- PRIM3 private assets never appear in public media picker
- reference-only press media cannot be published by accident
- no cross-tenant leakage
- no public service-role key
- session expiry and sign-out work
- file uploads validate type/size and are tenant-owned
- publishing writes an audit trail
- destructive deletion requires confirmation; prefer archive where possible

## 19. Definition of done

The admin is not done until Justin can, from his own account:

- sign in
- see only his tenant
- edit approved site content
- preview changes
- publish ordinary content
- manage releases and streaming links
- upload/tag/select media
- create/edit/schedule a Log
- view/respond to booking inquiries through supported platform channels
- manage inquiry status and contacts
- see useful analytics
- manage approved press/source entries
- use the client-network module when enabled
- do the core tasks from a phone

And McCluster can still centrally enforce identity, security, PRIM3/legal constraints and platform architecture.
