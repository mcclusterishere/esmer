# ESMER — AUTHORITY, PRESS & LINK GRAPH

**Status:** canonical SEO/authority brief for the Esmer build
**Identity lock:** `docs/IDENTITY-LOCK.md` always wins
**Subject:** Justin Esmer, professionally known as **Esmer**
**Verified Apple Music artist:** `1542619015`

The goal is to make the finished Esmer property the clearest canonical first-party web entity for searches such as `Justin Esmer`, `Esmer musician`, `Esmer Connecticut`, `Justin Esmer music`, and release-specific searches.

This is not a keyword-stuffing plan and it cannot guarantee a ranking. Authority should come from a consistent entity graph, useful first-party information, verifiable credits, crawlable release/press content, strong internal linking, structured data, and legitimate third-party references/backlinks.

## 1. Citations vs backlinks

A link from the Esmer site **to** an article is an outbound citation. A backlink is a link **from that third-party site back to Esmer's canonical domain**.

We have both.

### Existing real backlinks

Two reputable existing pages already identify `https://www.esmermusic.com/` as Justin Esmer / Esmer's official site:

1. **Cherry Tape Magazine — `Welcome to CT: See the Scene`**
   - Its `Justin Esmer` heading links directly to `https://www.esmermusic.com/`.
2. **Space Ballroom — Similar Kind / Esmer (2025)**
   - The ESMER artist block has an `Official Website` link to `https://www.esmermusic.com/`.

These are existing inbound links, not outreach targets we still need to invent.

### Canonical-domain preservation law

Before deployment, confirm whether Justin controls `esmermusic.com`.

- If **yes**, prefer deploying the new official property on that domain because third parties already treat it as canonical.
- If a replacement domain is required, permanently **301 redirect** the old canonical hostname to the new one and preserve meaningful path-level redirects where practical.
- Choose one preferred hostname (`www` or apex), redirect the other, enforce HTTPS, and emit one canonical URL per route.
- Do not abandon or allow a known externally linked official domain to become a dead page.

Domain control itself is not inferred from these backlinks; Justin must confirm it.

The machine-readable inventory for Claude/admin is `data/press-sources.json`.

## 2. High-confidence public source graph

Only the Justin Esmer / Esmer identity locked in `IDENTITY-LOCK.md` belongs here.

### Tier A — direct profiles / interviews / substantial features

1. **The Daily Campus — “The Music Never Stops: Esmer”**
   - URL: `https://dailycampus.com/2024/10/09/the-music-never-stops-esmer/`
   - By Dan Stark, 2024-10-09.
   - Evidence value: explicitly identifies Justin Esmer as Esmer; singer-songwriter/guitarist from Hamden; discusses songwriting history, sound, collaboration, Achilles Heel and Connecticut live presence.
   - Site use: press card; bio sourcing; source graph; `subjectOf` Article schema.
   - Backlink opportunity after launch: ask the publication whether the feature can include the official Esmer site in an artist-links field or update block.

2. **Your Favorite Groupies — “An Inside Look at Justin Esmer’s Journey with Achilles Heel”**
   - URL: `https://www.yourfavoritegroupies.com/blog/blvm07427i5l5tvff7hn8fpl18vcop`
   - By Mishel Noboa; page displays Sep 12. Verify the year before emitting `datePublished` schema.
   - Evidence value: long-form interview; explicitly says Justin Esmer / Esmer; detailed instrument history, Southern Connecticut context, creative process, collaborators, family/name origin and Achilles Heel production story.
   - Site use: Process/Logs source; press card; biography fact-checking; `subjectOf` Article schema.
   - Backlink opportunity: strong. Request an official-site link in the artist intro/resources area once the canonical deployment is live.

3. **Cherry Tape Magazine — “Welcome to CT: See the Scene”**
   - URL: `https://cherrytapemag.com/welcome-to-ct-see-the-scene/`
   - By Matthew Spence, 2023-09-01.
   - Evidence value: dedicated Justin Esmer interview segment, tagged `@justinesmer`; direct quotes about Connecticut music community and Esmer’s own description of his sound.
   - Site use: Press/Community card; artist-voice verification; `subjectOf` Article schema.
   - **Existing backlink:** `Justin Esmer` already links to `https://www.esmermusic.com/`.

4. **Cafeteria Media — “ESMER PRESENTS: ACHILLES HEEL”**
   - URL: `https://www.cafeteria.fm/home/esmer-achilles-heel`
   - By Jungle Julia, 2024-09-07.
   - Evidence value: substantial release coverage of Esmer’s third EP, creative direction, collaboration, recording/mixing process, release event, photography/video and community response.
   - Site use: Achilles Heel release source; Press/Logs card; `subjectOf` Article schema.
   - Backlink opportunity: strong. Ask Cafeteria to link the official site from its existing artist-follow-up area if editorially appropriate.

5. **New Haven Independent — “Esmer Returns Home With ‘Heather’”**
   - URL: `https://www.newhavenindependent.org/2025/05/06/esmer_returns_home_with_heather/`
   - By Jisu Sheen, 2025-05-06.
   - Evidence value: direct feature on Esmer and `Heather`; discusses the song’s construction, collaborators, recording context and visual release work.
   - Site use: Heather release page, Press, process/Logs source, `subjectOf` Article schema.
   - Backlink opportunity: high-priority legitimate request if the publication permits artist-site links.

### Tier B — reputable venue / local arts / scene references

6. **Space Ballroom — Pond View / RETROSOLO / ESMER (2022)**
   - URL: `https://spaceballroom.com/e/pond-view-retrosolo-440361070817/`
   - Date: 2022-10-23.
   - Evidence value: venue billing identifies Esmer as Justin Esmer, vocalist/producer and New Haven-area act; includes an early band lineup and period bio.
   - Site use: early live-performance chronology; venue proof; Event/source reference.
   - The archived Esmer block does not show an Official Website link.

7. **Space Ballroom — Similar Kind / ESMER (2025)**
   - URL: `https://spaceballroom.com/e/similar-kind-1296867468509/`
   - Date: 2025-06-07.
   - Evidence value: recent venue billing with Esmer identity and live-band context.
   - Site use: current live-performance proof; Press/Shows source.
   - **Existing backlink:** its `Official Website` field points to `https://www.esmermusic.com/`.

8. **New Haven Arts — “A Coffeehouse Open Mic, For Comprehensive Care” (2026)**
   - URL: `https://www.newhavenarts.org/arts-paper/articles/a-coffeehouse-open-mic-for-comprehensive-care`
   - By Solé Scott, 2026-05-03.
   - Evidence value: reports Justin Esmer/Esmer performing in New Haven; describes guitar and live vocal-processing/harmonizer use.
   - Site use: recent performance/press card; local cultural authority; `subjectOf` Article schema.
   - Backlink opportunity: request the official artist site only if their editorial policy supports performer links.

9. **Midbrow — “New Single Processes Dive Bar Encounter” (2025)**
   - URL: `https://midbrow.org/new-single-processes-dive-bar-encounter/`
   - By Jisu Sheen, 2025-03-20.
   - Evidence value: SB Khi feature identifies his touring band as Esmer, led by frontman Justin Esmer.
   - Site use: contextual press/source graph only; do not overstate as a direct Esmer feature.

10. **Midbrow — “Pandemic-Honed Performers Broke Out In 2025”**
    - URL: `https://midbrow.org/pandemic-honed-performers-broke-out-in-2025/`
    - By Jisu Sheen, 2025-12-23.
    - Evidence value: identifies Justin Esmer and discusses `Deathbed`, the live-band ecosystem, `Achilles Heel` production context and `Heather`.
    - Site use: scene-history/press source; `subjectOf` where appropriate.

11. **Southern Connecticut State University — Spring 2026 Dean’s List**
    - URL: `https://news.southernct.edu/2026/06/03/deans-and-presidents-lists-announced-for-spring-2026/`
    - Evidence value: lists Justin Esmer in the College of Arts & Sciences. Project context confirms this is the client.
    - Site use: identity corroboration only unless Esmer wants education surfaced.
    - Backlink opportunity: none needed; do not ask Southern to alter an academic list for SEO.

### Tier C — secondary supporting sources

- The Daily Campus profile of Sebastian Bernal can corroborate the live-band relationship where relevant.
- Crescent Magazine’s archive surfaces a Southern profile about Justin Esmer writing/producing songs; locate a stable article URL before making it a public Press destination.
- DistroKid HyperFollow pages support release/platform linkage but are not editorial press.

## 3. Sensitive / secondary identity sources

The dossier includes older Hamden school/civic records. They may help disambiguate identity internally, but they are **not required** to establish music authority and should not be published simply because they exist.

Do not make personal family history, school history, civic testimony or sensitive biographical information part of the public authority page without Esmer’s explicit approval.

## 4. Canonical public information architecture for authority

At minimum Claude should make these states/URLs crawlable and internally linked:

- `/` — canonical Esmer entity/home experience
- `/music` — catalog hub
- `/music/<release-slug>` — crawlable release detail pages/states for significant releases
- `/press` — Press & Features source hub
- `/book` — booking/services
- `/logs` — first-party editorial/process archive

If the implementation uses one visual SPA shell, these states still need addressable URLs, canonical tags and meaningful DOM content.

### Home entity copy target

The first crawlable text should make the entity unambiguous without reading like SEO spam:

- Justin Esmer performs as Esmer.
- Connecticut singer-songwriter, guitarist, vocalist, producer and multi-instrumentalist.
- Release catalog and current work.
- Verified official streaming/social destinations.
- Clear route to music, press, logs and booking.

Do not publish ages copied from old venue listings.

## 5. Structured-data graph

Use one persistent canonical ID for the person/artist, for example:

`<CANONICAL_DOMAIN>/#justin-esmer`

Recommended graph:

- `WebSite`
- `ProfilePage` / main entity page
- `Person` for Justin Esmer with `alternateName: "Esmer"`
- `MusicAlbum` / `MusicRecording` entities for verified releases
- `Event` only for verified public performance/event information when useful
- `BreadcrumbList`

### `sameAs`

Use `sameAs` only for identity-equivalent official profiles once verified, e.g. Apple Music, Spotify, Instagram, YouTube, TikTok, Bandcamp, etc. Do **not** put press articles into `sameAs`.

### `subjectOf`

Represent substantial press pieces as `subjectOf` Article/NewsArticle references or otherwise cite them in the Press page. Initial direct candidates:

- Daily Campus
- Your Favorite Groupies
- Cherry Tape Magazine
- Cafeteria Media
- New Haven Independent
- New Haven Arts
- Midbrow retrospective where the content directly discusses Esmer

Each Article object should use the article’s actual headline, publisher, URL and publication date when verified. Do not copy full article text.

## 6. Press page design/content rule

`/press` is not a link dump. Each card should contain:

- publisher
- headline
- date/year
- one short original summary of what the source establishes
- source link
- related release/project when relevant
- optional licensed/approved image only

Group by `Features`, `Interviews`, `Reviews / Releases`, `Live / Scene` if enough items exist.

Source public cards from `data/press-sources.json`, subject to identity and publication checks.

This page should become the source reporters, promoters and search/AI systems can use to verify the identity quickly.

## 7. Internal-link graph

- Home → Music, Press, Book, Logs
- Every release → Esmer entity/home + related Press/Logs + streaming destination
- Press → Esmer entity/home + relevant release
- Logs → relevant release/project and booking where commercially appropriate
- Book → selected work / press proof
- Footer → Home, Music, Press, Book + Powered by McCluster

Use descriptive anchor text such as `Esmer’s Achilles Heel EP` rather than generic `click here`.

## 8. First-party content strategy

Third-party press verifies the entity. First-party pages make the official site more useful than any single article.

Build durable, original, factual pages for:

- major releases
- credits/collaborators where verified
- selected live history
- production/session work
- Logs / studio diaries / release notes authored or approved by Esmer
- press index
- booking/service information

Do not manufacture personal stories in Esmer’s voice. The admin should let Justin publish those himself.

## 9. On-page technical SEO requirements

Before launch:

- unique `<title>` and meta description for each crawlable route
- one canonical URL per route
- 301 old canonical hostname/path where applicable
- Open Graph / Twitter cards with authorized images
- descriptive image alt text
- XML sitemap
- robots.txt
- stable public URLs
- meaningful server/DOM-visible text even when the cinematic layer uses JavaScript
- no duplicate alternate pages for the same entity
- no hidden keyword blocks
- no fake review stars
- no unverified credits
- useful 404 behavior and redirects for changed release/log slugs

Suggested home title pattern:

`Esmer (Justin Esmer) | Connecticut Singer, Songwriter & Producer`

Suggested press title pattern:

`Esmer Press & Features | Justin Esmer`

## 10. Backlink conversion plan after canonical deployment

First verify/preserve the backlinks already pointing to `esmermusic.com`.

Then create a short outreach queue in the McCluster CRM for publishers that already covered him but do not currently link the official site:

1. Your Favorite Groupies
2. Cafeteria Media
3. New Haven Independent
4. The Daily Campus
5. New Haven Arts
6. Crescent Magazine / relevant SCSU student media
7. Midbrow
8. Future venues/promoters with an `Official Website` field

The request is simple and editorially legitimate: **“You previously featured/billed Justin Esmer (Esmer). His official artist site is now <domain>. Would you be willing to add/update the official website link on the existing page?”**

Record every request and response in the McCluster CRM. Never repeatedly pressure an outlet that declines.

Do not buy spam backlinks, create fake profiles, mass-post comment links, or misrepresent affiliation.

## 11. Admin Press / SEO integration

Justin’s private backend should surface:

- canonical-domain status
- identity-health status
- verified official profiles
- current press-source registry
- `existing backlink` / `outreach needed` / `requested` / `linked` / `declined` statuses
- pages missing title/description/canonical/OG art
- top organic/referral entries when analytics supports them
- release pages missing verified credits or source links

The admin is an operating surface, not a backlink-spam tool.

## 12. Search/AI authority principle

The canonical site should contain more verified, first-party, structured, well-linked information about Justin Esmer than any single third-party article, while clearly citing the strongest independent sources.

Authority comes from consistency and usefulness:

`Justin Esmer` = `Esmer` = one canonical domain = one official catalog/profile graph.

Any source that fails the identity lock is excluded, even if a search engine places it near Esmer results.
