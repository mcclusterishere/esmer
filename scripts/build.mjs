/* ESMER — static site generator.
 *
 * Not a framework (AGENTS.md §9 forbids adding one just because the repo is
 * empty). It is a renderer: catalog and press facts live once, in data/, and
 * every route is emitted as real crawlable HTML.
 *
 * That matters specifically because docs/AUTHORITY-LINK-GRAPH.md requires
 * addressable, crawlable URLs with meaningful DOM for /, /music,
 * /music/<slug>, /press, /logs and /book. A client-rendered SPA would put
 * the catalog behind JavaScript, which is the one thing the authority brief
 * is built to avoid.
 *
 *   node scripts/build.mjs
 *
 * Output is committed so GitHub Pages serves it with no build step.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

const site = read('data/site.json');
const catalog = read('data/releases.json');
const press = read('data/press-sources.json');

const ORIGIN = site.canonicalOrigin.replace(/\/$/, '');
const ENTITY = `${ORIGIN}/${site.entityId}`;

/* ---------- helpers ---------- */

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/* Dates are rendered from the ISO string without constructing a Date, so a
   release dated 2026-01-09 cannot slip to the 8th in a negative-offset
   timezone — which is exactly what `new Date('2026-01-09')` does. */
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const longDate = (iso) => {
  const [y, m, d] = String(iso).split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};
/* Returns null rather than the string "null" when a date is absent — one
   press source genuinely has no publication date, and it rendered as a
   literal "null" beside the publisher. Callers must handle the absence. */
const year = (iso) => (iso ? String(iso).slice(0, 4) : null);

const trackTitle = (t) => (t.feat ? `${t.title} (feat. ${t.feat})` : t.title);

/* ---------- shell ---------- */

const NAV = [
  { href: '/music/', label: 'Music', key: 'music' },
  { href: '/', label: 'Esmer', key: 'esmer' },
  { href: '/book/', label: 'Book', key: 'book' }
];

function nav(active) {
  return `<nav class="nav" aria-label="Primary">
  <div class="nav__inner">
    ${NAV.map((item) => `<a class="nav__item" href="${item.href}"${item.key === active ? ' aria-current="page"' : ''}><span class="nav__dot" aria-hidden="true"></span>${esc(item.label)}</a>`).join('\n    ')}
  </div>
</nav>`;
}

function listeningBar() {
  return `<div class="listening" data-open="false" aria-live="polite">
  <div class="listening__inner">
    <div class="listening__art" aria-hidden="true"></div>
    <div class="listening__text">
      <div class="listening__title"></div>
      <div class="listening__sub"></div>
    </div>
    <a class="listening__go" href="#" target="_blank" rel="noopener">Listen</a>
    <button class="listening__close" type="button" aria-label="Dismiss">&times;</button>
  </div>
</div>`;
}

function footer() {
  return `<footer class="foot">
  <div class="wrap">
    <div class="foot__links">
      <a href="/music/">Music</a>
      <a href="/logs/">Logs</a>
      <a href="/press/">Press</a>
      <a href="/book/">Book</a>
      <a href="${esc(site.appleMusicArtistUrl)}" target="_blank" rel="noopener">Apple Music</a>
    </div>
    <p class="foot__attr">
      &copy; ${new Date().getFullYear()} ${esc(site.publicName)}.
      <a href="${esc(site.attribution.href)}" target="_blank" rel="noopener">${esc(site.attribution.label)}</a>
    </p>
  </div>
</footer>`;
}

function page({ path, title, description, active, body, schema = [], extraJs = [] }) {
  const canonical = `${ORIGIN}${path}`;
  const scripts = ['/js/app.js', ...extraJs];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.artistName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta name="twitter:card" content="summary_large_image">
${path === '/auth/' ? '<meta name="robots" content="noindex,nofollow">' : ''}
<meta name="theme-color" content="#0b0b0c">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/css/site.css">
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"></div>
<main id="main">
${body}
</main>
${footer()}
${listeningBar()}
${nav(active)}
${scripts.map((src) => `<script src="${src}" defer></script>`).join('\n')}
</body>
</html>
`;
}

/* ---------- structured data ----------
   One persistent entity id for the person, alternateName Esmer, sameAs for
   identity-equivalent official profiles only. Press articles are represented
   as subjectOf on the Press page, never as sameAs
   (docs/AUTHORITY-LINK-GRAPH.md §5). */

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': ENTITY,
  name: site.publicName,
  alternateName: site.artistName,
  url: `${ORIGIN}/`,
  jobTitle: ['Singer-songwriter', 'Producer', 'Multi-instrumentalist', 'Music teacher'],
  sameAs: site.sameAs,
  homeLocation: { '@type': 'Place', name: 'Connecticut, United States' }
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${ORIGIN}/#website`,
  url: `${ORIGIN}/`,
  name: site.artistName,
  about: { '@id': ENTITY }
};

const releaseSchema = (r) => ({
  '@context': 'https://schema.org',
  '@type': 'MusicAlbum',
  '@id': `${ORIGIN}/music/${r.slug}/#album`,
  name: r.title,
  albumReleaseType: r.format === 'EP' ? 'https://schema.org/EPRelease' : 'https://schema.org/SingleRelease',
  datePublished: r.releaseDate,
  url: `${ORIGIN}/music/${r.slug}/`,
  byArtist: { '@type': 'MusicGroup', name: site.artistName, '@id': ENTITY },
  ...(r.genres ? { genre: r.genres } : {}),
  recordLabel: { '@type': 'Organization', name: r.label },
  ...(r.upc ? { gtin13: r.upc } : {}),
  sameAs: [r.appleMusic],
  numTracks: r.tracks.length,
  track: r.tracks.map((t, i) => ({
    '@type': 'MusicRecording',
    name: trackTitle(t),
    position: i + 1,
    ...(t.isrc ? { isrcCode: t.isrc } : {}),
    byArtist: { '@type': 'MusicGroup', name: site.artistName, '@id': ENTITY }
  }))
});

/* ---------- shared partials ---------- */

function coverSlot(r, cls = 'release__cover') {
  /* A reference URL is not a rights clearance (docs/MEDIA-MANIFEST.json), so
     the reference artwork is never rendered. Until Esmer supplies master art
     the cover is a typographic plate. */
  if (r.artwork) {
    return `<div class="${cls}"><img src="${esc(r.artwork)}" alt="${esc(r.title)} cover artwork" loading="lazy" width="600" height="600"></div>`;
  }
  return `<div class="${cls}" role="img" aria-label="${esc(r.title)} — cover artwork pending"><span class="release__plate">${esc(r.title)}</span></div>`;
}

function listenAttrs(r) {
  return `data-listen data-listen-title="${esc(r.title)}" data-listen-sub="${esc(site.artistName)} — ${esc(r.format)}, ${esc(year(r.releaseDate))}" data-listen-href="${esc(r.appleMusic)}"`;
}

function releaseRow(r) {
  return `<article class="release reveal">
  <a href="/music/${esc(r.slug)}/" aria-hidden="true" tabindex="-1">${coverSlot(r)}</a>
  <div>
    <h3 class="release__title"><a href="/music/${esc(r.slug)}/">${esc(r.title)}</a></h3>
    <div class="release__meta">
      <span class="meta">${esc(r.format)}</span>
      <span class="meta">${esc(longDate(r.releaseDate))}</span>
      <span class="meta">${esc(r.label)}</span>
    </div>
    <a class="release__link" href="${esc(r.appleMusic)}" target="_blank" rel="noopener" ${listenAttrs(r)}>Listen on Apple Music</a>
  </div>
</article>`;
}

/* ---------- pages ---------- */

const releases = catalog.releases;
const latest = releases[0];

const ENTITY_LEDE =
  `${site.publicName} performs as ${site.artistName} — a Connecticut singer-songwriter, guitarist, vocalist, producer, multi-instrumentalist and music teacher.`;

function home() {
  const body = `
<section class="band arrival">
  <div class="wrap">
    <p class="eyebrow">${esc(site.publicName)}</p>
    <h1 class="display">${esc(site.artistName)}</h1>
    <p class="lede">${esc(ENTITY_LEDE)}</p>
    <div class="arrival__foot">
      <span class="meta">Connecticut</span>
      <span class="meta">${esc(site.label)}</span>
      <span class="meta">${esc(releases.length)} releases</span>
    </div>
  </div>
</section>

<section class="band band--sunk">
  <div class="wrap">
    <p class="eyebrow">Current</p>
    <h2 class="h-section">${esc(latest.title)}</h2>
    <div class="release__meta">
      <span class="meta">${esc(latest.format)}</span>
      <span class="meta">${esc(longDate(latest.releaseDate))}</span>
      <span class="meta">${esc(latest.label)}</span>
    </div>
    <div class="actions"><a class="btn" href="${esc(latest.appleMusic)}" target="_blank" rel="noopener" ${listenAttrs(latest)}>Listen on Apple Music</a></div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <p class="eyebrow">Who</p>
    <div class="reveal">
      <p class="lede">Guitar-led songwriting, close harmony and a low, unhurried vocal. Recorded and released independently on ${esc(site.label)} since 2022.</p>
      <p>Public coverage places his roots in Hamden and New Haven. He plays regularly across Connecticut, and the records have moved steadily from something made alone toward something made with other people in the room.</p>
      <p>He also teaches — guitar, voice, production and songwriting, in person in Connecticut or online. The same ear that shapes the records is available to people learning to make their own.</p>
      <p><a class="release__link" href="/press/">Read the press</a></p>
    </div>
  </div>
</section>

<section class="band band--sunk">
  <div class="wrap">
    <p class="eyebrow">Logs</p>
    <h2 class="h-section">The archive</h2>
    <p class="lede">Releases, sessions and performances, kept as a record rather than a feed.</p>
    <p><a class="btn btn--ghost" href="/logs/">Open the logs</a></p>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <p class="eyebrow">Selected work</p>
    <h2 class="h-section">Releases</h2>
  </div>
  <div class="wrap">
    <div class="releases">
      ${releases.slice(0, 4).map(releaseRow).join('\n      ')}
    </div>
    <p style="margin-top:3rem"><a class="btn btn--ghost" href="/music/">The full catalog</a></p>
  </div>
</section>

<section class="band band--sunk">
  <div class="wrap">
    <p class="eyebrow">Live</p>
    <h2 class="h-section">In the room</h2>
    <p class="lede">Esmer performs across Connecticut, fronting a band with electric guitar and harmony.</p>
    <div class="slot slot--wide reveal">
      <span class="slot__label">Live photography and performance video
      &mdash; awaiting approved capture and reuse rights</span>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <p class="eyebrow">Studio</p>
    <h2 class="h-section">The threshold</h2>
    <p class="lede">Esmer records and produces in his own room in Connecticut.</p>
    <p>The studio becomes part of this site after an on-site capture. Nothing about the room, its gear or its location is described here until that capture exists and Esmer approves what it shows.</p>
    <div class="slot slot--wide reveal">
      <span class="slot__label">Studio stills and cinematic sequence
      &mdash; reserved, not yet captured</span>
    </div>
  </div>
</section>

<section class="band band--sunk" id="studio-world">
  <div class="wrap">
    <p class="eyebrow">Studio world</p>
    <h2 class="h-section">Spatial</h2>
    <p class="lede">A walkable version of the room, entered from this page.</p>
    <p>This section is carved into the architecture now and loads no 3D. When the 360 and spatial capture exists it mounts here as progressive enhancement, behind this text, never in front of it.</p>
    <div class="slot slot--wide reveal">
      <span class="slot__label">Spatial studio &mdash; reserved slot,
      see docs/VR-SCROLL-ARCHITECTURE.md</span>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <p class="eyebrow">Work together</p>
    <h2 class="h-section">Lessons &amp; sessions</h2>
    <p class="lede">Guitar, voice, production and songwriting lessons — in person or online. Plus recording, session support, performance and collaboration.</p>
    <div class="actions"><a class="btn" href="/book/">Start an inquiry</a></div>
  </div>
</section>`;

  return page({
    path: '/',
    title: `${site.artistName} — ${site.publicName}`,
    description: ENTITY_LEDE,
    active: 'esmer',
    body,
    schema: [websiteSchema, personSchema]
  });
}

function musicIndex() {
  const body = `
<section class="band band--tight">
  <div class="wrap">
    <p class="eyebrow">Music</p>
    <h1 class="h-section">The catalog</h1>
    <p class="lede">${esc(releases.length)} releases on ${esc(site.label)}, ${esc(year(releases[releases.length - 1].releaseDate))}&ndash;${esc(year(latest.releaseDate))}.</p>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <div class="releases">
      ${releases.map(releaseRow).join('\n      ')}
    </div>
  </div>
</section>

<section class="band band--tight band--sunk">
  <div class="wrap">
    <p class="eyebrow">Also in the catalog</p>
    <p class="lede">Surfaced on the artist page, with metadata still to be verified before these get pages of their own.</p>
    <ul class="meta" style="list-style:none;padding:0;line-height:2.2">
      ${catalog.alsoInCatalog.map((r) => `<li>${esc(r.title)}${r.artist ? ` &mdash; ${esc(r.artist)}` : ''}${r.credit ? ` (${esc(r.credit)})` : ''}${r.year ? ` &mdash; ${esc(r.year)}` : ''}</li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

  return page({
    path: '/music/',
    title: `Music — ${site.artistName}`,
    description: `Every ${site.artistName} release: EPs and singles on ${site.label}, ${year(releases[releases.length - 1].releaseDate)} to ${year(latest.releaseDate)}.`,
    active: 'music',
    body,
    schema: [personSchema]
  });
}

function releasePage(r, index) {
  const prev = releases[index + 1];
  const next = releases[index - 1];

  const body = `
<section class="band band--tight">
  <div class="wrap">
    <p class="eyebrow"><a href="/music/">Music</a></p>
    <h1 class="h-section">${esc(r.title)}</h1>
    <div class="release__meta">
      <span class="meta">${esc(r.format)}</span>
      <span class="meta">${esc(longDate(r.releaseDate))}</span>
      <span class="meta">${esc(r.label)}</span>
      ${r.genres ? `<span class="meta">${esc(r.genres.join(' &middot; '))}</span>` : ''}
    </div>
    <div style="max-width:14rem;margin-block:2rem">${coverSlot(r, 'release__cover')}</div>
    <div class="actions">
      <a class="btn" href="${esc(r.appleMusic)}" target="_blank" rel="noopener" ${listenAttrs(r)}>Listen on Apple Music</a>
      ${r.hyperfollow ? `<a class="btn btn--ghost" href="${esc(r.hyperfollow)}" target="_blank" rel="noopener">All platforms</a>` : ''}
    </div>
  </div>
</section>

<section class="band band--tight band--sunk">
  <div class="wrap">
    <p class="eyebrow">Tracks</p>
    <ol style="list-style:none;padding:0;margin:0">
      ${r.tracks.map((t, i) => `<li style="padding-block:1rem;border-bottom:1px solid var(--rule-soft)">
        <div class="h-sub">${esc(String(i + 1).padStart(2, '0'))} &nbsp; ${esc(trackTitle(t))}</div>
        ${t.composers ? `<div class="meta">${esc(t.composers)}</div>` : ''}
        ${t.isrc ? `<div class="meta">ISRC ${esc(t.isrc)}</div>` : ''}
        ${t.provisional ? `<div class="meta">Credits pending verification</div>` : ''}
      </li>`).join('\n      ')}
    </ol>
    ${r.upc ? `<p class="meta" style="margin-top:1.5rem">UPC ${esc(r.upc)}</p>` : ''}
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <div class="foot__links">
      ${prev ? `<a href="/music/${esc(prev.slug)}/">&larr; ${esc(prev.title)}</a>` : ''}
      ${next ? `<a href="/music/${esc(next.slug)}/">${esc(next.title)} &rarr;</a>` : ''}
    </div>
  </div>
</section>`;

  return page({
    path: `/music/${r.slug}/`,
    title: `${r.title} — ${site.artistName}`,
    description: `${r.title}, ${r.format.toLowerCase()} by ${site.artistName} (${site.publicName}), released ${longDate(r.releaseDate)} on ${r.label}.`,
    active: 'music',
    body,
    schema: [releaseSchema(r)]
  });
}

function pressPage() {
  const direct = press.sources.filter((s) => s.directSubject);
  const context = press.sources.filter((s) => !s.directSubject);

  const card = (s) => `<article class="press__item reveal">
  <div class="press__pub">
    <span class="meta">${esc(s.publisher)}</span>
    ${year(s.publicationDate) ? `<span class="meta">${esc(year(s.publicationDate))}</span>` : ''}
    ${s.author ? `<span class="meta">${esc(s.author)}</span>` : ''}
  </div>
  <h3 class="press__headline"><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.headline)}</a></h3>
  <p class="press__summary">${esc(s.summary)}</p>
</article>`;

  const body = `
<section class="band band--tight">
  <div class="wrap">
    <p class="eyebrow">Press</p>
    <h1 class="h-section">Features &amp; coverage</h1>
    <p class="lede">Independent writing about ${esc(site.publicName)}. Summaries are ours; follow each link for the original.</p>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <p class="eyebrow">Profiles &amp; interviews</p>
    <div class="press">
      ${direct.map(card).join('\n      ')}
    </div>
  </div>
</section>

<section class="band band--tight band--sunk">
  <div class="wrap">
    <p class="eyebrow">Billing, scene &amp; record</p>
    <div class="press">
      ${context.map(card).join('\n      ')}
    </div>
  </div>
</section>`;

  /* Press pieces are subjectOf on the Person — deliberately not sameAs. */
  const schema = {
    ...personSchema,
    subjectOf: direct.map((s) => ({
      '@type': 'Article',
      headline: s.headline,
      url: s.url,
      ...(s.publicationDate ? { datePublished: s.publicationDate } : {}),
      ...(s.author ? { author: { '@type': 'Person', name: s.author } } : {}),
      publisher: { '@type': 'Organization', name: s.publisher }
    }))
  };

  return page({
    path: '/press/',
    title: `Press — ${site.artistName}`,
    description: `Independent press and features about ${site.publicName}, who performs as ${site.artistName}.`,
    active: 'esmer',
    body,
    schema: [schema]
  });
}

function logsPage() {
  /* Entries are release milestones — verifiable catalog facts.
     docs/ESMER-DOSSIER.md §5 holds richer process material from Esmer's
     interviews, but flags it as personal and wanting his approved wording.
     So the architecture ships and the voice arrives with his approval. */
  const entries = releases.map((r) => ({
    date: r.releaseDate,
    title: `${r.title} — ${r.format.toLowerCase()}`,
    body: `${r.tracks.length} ${r.tracks.length === 1 ? 'track' : 'tracks'}, released on ${r.label}.`,
    href: `/music/${r.slug}/`
  }));

  const body = `
<section class="band band--tight">
  <div class="wrap">
    <p class="eyebrow">Logs</p>
    <h1 class="h-section">The archive</h1>
    <p class="lede">A record of the work, kept in order.</p>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <div class="logs">
      ${entries.map((e) => `<a class="log" href="${esc(e.href)}">
        <span class="log__date meta">${esc(longDate(e.date))}</span>
        <h3 class="log__title">${esc(e.title)}</h3>
        <p class="log__body">${esc(e.body)}</p>
      </a>`).join('\n      ')}
    </div>
    <p class="meta" style="margin-top:2.5rem;max-width:46ch;line-height:1.9">
      Session notes, process writing and performance entries join this archive
      once Esmer approves his own wording for them.
    </p>
  </div>
</section>`;

  return page({
    path: '/logs/',
    title: `Logs — ${site.artistName}`,
    description: `An archive of ${site.artistName}'s releases, sessions and performances, in order.`,
    active: 'esmer',
    body,
    schema: [personSchema]
  });
}

function bookPage() {
  const body = `
<section class="band band--tight">
  <div class="wrap">
    <p class="eyebrow">Book</p>
    <h1 class="h-section">Start an inquiry</h1>
    <p class="lede">Whether you want to learn or you want to record — tell Esmer what you need. He replies by email.</p>
    <p>He teaches guitar, voice, production and songwriting, in person in Connecticut or online.</p>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    <form class="form" data-book-form
          data-endpoint="${esc(site.api.origin + site.api.inquiries)}"
          data-org="${esc(site.api.org)}"
          data-timing-label="${esc(site.bookTiming.label)}"
          data-account-endpoint="${esc(site.api.origin + site.api.accountStart)}"
          ${site.fallbackContact ? `data-fallback="${esc(site.fallbackContact)}"` : ''}
          method="post" action="${esc(site.api.origin + site.api.inquiries)}">

      <style>${site.bookServices.filter((sv) => sv.questions && sv.questions.length)
        .map((sv) => `@supports selector(:has(*)){.form:has(#want-${sv.id}:checked) [data-branch="${sv.id}"]{display:block}}`)
        .join('')}</style>

      <fieldset class="fieldset">
        <legend class="fieldset__legend">What do you need?</legend>
        <div class="choices">
          ${site.bookServices.map((s, i) => `<label class="choice">
            <input type="radio" name="want" id="want-${esc(s.id)}" value="${esc(s.label)}"${i === 0 ? ' checked' : ''}>
            <span>${esc(s.label)}</span>
          </label>`).join('\n          ')}
        </div>
      </fieldset>

      ${site.bookServices.filter((sv) => sv.questions && sv.questions.length).map((sv) => `
      <div class="branch" data-branch="${esc(sv.id)}">
        ${sv.questions.map((qn) => `<fieldset class="fieldset">
          <legend class="fieldset__legend">${esc(qn.label)}</legend>
          <div class="choices">
            ${qn.options.map((op) => `<label class="choice">
              <input type="${qn.type === 'multi' ? 'checkbox' : 'radio'}"
                     name="${esc(sv.id)}.${esc(qn.id)}"
                     value="${esc(op.label)}"${qn.type === 'one' && qn.default === op.id ? ' checked' : ''}>
              <span>${esc(op.label)}</span>
            </label>`).join('\n            ')}
          </div>
        </fieldset>`).join('\n        ')}
      </div>`).join('\n      ')}

      <fieldset class="fieldset">
        <legend class="fieldset__legend">${esc(site.bookTiming.label)}</legend>
        <div class="choices">
          ${site.bookTiming.options.map((op) => `<label class="choice">
            <input type="radio" name="timing" value="${esc(op.label)}"${site.bookTiming.default === op.id ? ' checked' : ''}>
            <span>${esc(op.label)}</span>
          </label>`).join('\n          ')}
        </div>
      </fieldset>

      <div class="field">
        <label for="bk-name">Your name</label>
        <input class="input" id="bk-name" name="name" type="text" autocomplete="name" required maxlength="200">
      </div>

      <div class="field">
        <label for="bk-email">Email</label>
        <input class="input" id="bk-email" name="email" type="email" autocomplete="email" required maxlength="320">
      </div>

      <div class="field">
        <label for="bk-note">The project</label>
        <textarea class="textarea" id="bk-note" name="note" rows="5" maxlength="4000"
          placeholder="Dates, where, what you are working on."></textarea>
      </div>

      <!-- Honeypot. Hidden from people, irresistible to bots. -->
      <div class="field" aria-hidden="true" style="position:absolute;left:-9999px">
        <label for="bk-company">Company</label>
        <input class="input" id="bk-company" name="company" type="text" tabindex="-1" autocomplete="off">
      </div>

      <button class="btn" type="submit">Send inquiry</button>
      <p class="form__status" role="status" aria-live="polite"></p>
    </form>

    <!-- Shown in place of the form once the control plane has confirmed the
         inquiry. Never shown on a failure: an account offer on top of a
         message that did not send would be a lie about the first half. -->
    <div class="sent" data-sent hidden>
      <p class="eyebrow">Sent</p>
      <h2 class="h-section">Your message is with Esmer.</h2>
      <p class="lede">He replies by email.</p>

      <div class="sent__account">
        <h3 class="h-sub">Keep the conversation</h3>
        <p>Make an account and this thread stays in one place — his reply, your
        details, and anything you send next. No password: we email you a link.</p>
        <div class="actions">
          <!-- Hidden until the script confirms Google is enabled on the
               McCluster project. It is the same McCluster account either
               way — Esmer's site does not mint its own. -->
          <button class="btn" type="button" data-account-google hidden>Continue with Google</button>
          <button class="btn btn--ghost" type="button" data-account-start>Email me a sign-in link</button>
          <a class="btn btn--ghost" href="/">Not now</a>
        </div>
        <p class="form__status" role="status" aria-live="polite" data-account-status></p>
      </div>
    </div>

    <p class="meta" style="margin-top:3rem;max-width:46ch;line-height:1.9">
      Rates are agreed directly with Esmer. Nothing is charged through this form.
    </p>
  </div>
</section>`;

  return page({
    path: '/book/',
    title: `Book — ${site.artistName}`,
    description: `Guitar, voice, production and songwriting lessons with ${site.publicName}, in person in Connecticut or online — plus recording, session support, performance and collaboration.`,
    active: 'book',
    body,
    schema: [personSchema],
    extraJs: ['/js/mcc-auth.js', '/js/book.js']
  });
}

function authCallback() {
  /* Where a McCluster sign-in returns to on Esmer's own domain. It renders
     no account data — it spends the authorization code and moves on.

     The account is McCluster's, not Esmer's: same Supabase project, same
     auth user id as matthew.mccluster.org. This repo mints no identity of
     its own (docs/BACKEND-BOUNDARY.md). */
  const body = `
<section class="band arrival">
  <div class="wrap">
    <p class="eyebrow">McCluster account</p>
    <h1 class="h-section" id="auth-head">Signing you in…</h1>
    <p class="lede" id="auth-body">One moment.</p>
  </div>
</section>
<script src="/js/mcc-auth.js" defer></script>
<script defer>
  window.addEventListener('load', function () {
    var head = document.getElementById('auth-head');
    var body = document.getElementById('auth-body');
    function backTo() {
      var raw = new URLSearchParams(location.search).get('next') || '/book/';
      /* Same-origin only. An absolute URL here would make the sign-in flow
         an open redirect that arrives carrying a fresh session. */
      return (raw.charAt(0) === '/' && raw.charAt(1) !== '/') ? raw : '/book/';
    }
    window.MCC.complete().then(function (user) {
      if (!user) { head.textContent = 'Nothing to finish'; body.innerHTML = '<a href="/book/">Back to Book</a>'; return; }
      head.textContent = 'You are signed in';
      body.innerHTML = 'Taking you back…';
      location.replace(backTo());
    }).catch(function (error) {
      head.textContent = 'That sign-in did not complete';
      body.textContent = error.message || 'Please try again.';
    });
  });
<\/script>`;

  return page({
    path: '/auth/',
    title: `Signing in — ${site.artistName}`,
    description: 'Completing your McCluster sign-in.',
    active: 'book',
    body
  });
}

function notFound() {
  return page({
    path: '/404.html',
    title: `Not found — ${site.artistName}`,
    description: 'That page does not exist.',
    active: 'esmer',
    body: `<section class="band arrival"><div class="wrap">
  <p class="eyebrow">404</p>
  <h1 class="display">Lost</h1>
  <p class="lede">That page does not exist.</p>
  <p><a class="btn" href="/">Back to Esmer</a></p>
</div></section>`
  });
}

/* ---------- emit ---------- */

const routes = [
  ['index.html', home()],
  ['music/index.html', musicIndex()],
  ['press/index.html', pressPage()],
  ['logs/index.html', logsPage()],
  ['book/index.html', bookPage()],
  ['auth/index.html', authCallback()],
  ['404.html', notFound()],
  ...releases.map((r, i) => [`music/${r.slug}/index.html`, releasePage(r, i)])
];

/**
 * Rewrite root-absolute internal links to page-relative ones.
 *
 * Every template above writes `/css/site.css`, `/music/`, and so on.
 * That is only correct when the site is served from the root of a
 * domain. On GitHub Pages a PROJECT site is served from a subpath —
 * mcclusterishere.github.io/esmer/ — where `/css/site.css` resolves
 * against the wrong origin root and the page arrives with no stylesheet
 * and every link dead.
 *
 * Making the paths relative to each page fixes it WITHOUT pinning the
 * site to one host: the same build then works at a subpath, at a
 * custom-domain root, and from a file:// preview, with no flag to set
 * and no rebuild when the domain changes. That matters here because the
 * canonical hostname is genuinely still undecided.
 *
 * Only href/src attributes are touched. Canonical URLs, OG tags,
 * structured data and the sitemap stay absolute — they must be, and
 * they are built from ORIGIN separately.
 */
function relativise(html, rel) {
  // 'music/heather/index.html' -> 2 levels deep; 'index.html' -> 0.
  const depth = rel.split('/').length - 1;
  const up = depth === 0 ? './' : '../'.repeat(depth);

  return html.replace(
    /\b(href|src)="\/([^"]*)"/g,
    (_m, attr, path) => `${attr}="${up}${path}"`
  );
}

for (const [rel, html] of routes) {
  const out = join(ROOT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, relativise(html, rel));
}

/* sitemap + robots */
const urls = [
  '/', '/music/', '/press/', '/logs/', '/book/',
  ...releases.map((r) => `/music/${r.slug}/`)
];
writeFileSync(
  join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${ORIGIN}${u}</loc></url>`).join('\n')}
</urlset>
`
);
writeFileSync(
  join(ROOT, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`
);

console.log(`built ${routes.length} pages, ${urls.length} sitemap urls`);
if (!site.canonicalOriginConfirmed) {
  console.log(`\n  NOTE: canonicalOrigin is ${ORIGIN} and is NOT confirmed.`);
  console.log('  Confirm Justin controls that domain before deploying, or change');
  console.log('  data/site.json — see docs/AUTHORITY-LINK-GRAPH.md.');
}
