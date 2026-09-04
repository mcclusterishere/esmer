# ESMER — VR / SPATIAL SCROLL ARCHITECTURE

**Status:** implementation law for the reserved studio-world section.

The Esmer site must reserve a first-class VR/spatial section now, even though the 360 studio capture and Marble/spatial-world build do not exist yet.

The rule is: **build the stage now; do not invent the performance.**

---

## 1. What to borrow from the McCluster main page

The current McCluster front page uses an interaction architecture that is explicitly relevant to Esmer:

- a scroll-progress layer;
- a long sticky cinematic hero with a poster, canvas-driven scroll visual, and video fallback;
- selected-work sections staged as scroll-dependent visual scenes;
- a dedicated 360/VR band inside the page rather than sending the user to a disconnected gimmick page;
- the VR band temporarily parks normal scroll while the user is inside the spatial experience;
- a clear briefing / entry state tells the visitor that the interaction rules have changed;
- free-look interaction follows the briefing;
- obvious exit controls return the visitor to the normal document flow;
- the page continues into a conversion/finale section after the immersive experience;
- meaningful DOM content and fallbacks exist underneath the cinematic layer.

On McCluster, the live implementation includes a `workvr` section with a canvas, a full-height briefing card, an explicit "Look around" handoff, a free-movement state, "Back to the card" / "Land" exits, and a visible `360 · live footage` label. The Esmer version should learn from that interaction grammar without copying the jet theme, McCluster copy, visual identity, or assets.

---

## 2. Esmer spatial concept

The Esmer spatial section is **the studio becoming a room on the website**.

The default Esmer/home scroll should move through his identity and work, then arrive at the studio naturally:

`ESMER -> songwriting -> releases -> live work -> production -> studio threshold -> STUDIO WORLD -> booking / next action`

The studio world must feel earned by the story. It is not a random "View in VR" button bolted onto a portfolio.

Possible narrative transition:

1. editorial stills / logs establish the studio and process;
2. scroll-dependent closeups move from instrument / console / hands / room details toward an establishing studio frame;
3. the page visually settles at the studio threshold;
4. the visitor is invited to enter the room;
5. normal scroll is deliberately parked only after explicit entry;
6. user explores the 360/spatial room;
7. contextual hotspots can open music, session stories, gear stories, projects, or booking;
8. exit returns to the exact normal-scroll point;
9. the site continues toward Book.

---

## 3. Reserve the DOM now

Claude should create the structural section during the first build even before real studio media exists.

Recommended semantic skeleton:

```html
<section class="studio-world" id="studio-world" aria-labelledby="studio-world-title">
  <div class="studio-world__sticky">
    <div class="studio-world__poster" aria-hidden="true"></div>
    <canvas id="studioWorldCanvas" hidden></canvas>

    <div class="studio-world__copy">
      <p class="kicker">The studio</p>
      <h2 id="studio-world-title">Enter the room where the records get made.</h2>
      <p class="studio-world__lede">Spatial studio experience pending on-site capture.</p>
      <button id="studioWorldEnter" type="button" disabled>Enter studio</button>
    </div>

    <div class="studio-world__brief" id="studioWorldBrief" hidden></div>
    <div class="studio-world__controls" hidden>
      <button id="studioWorldBack" type="button">Back to the story</button>
      <button id="studioWorldBook" type="button">Book a session</button>
    </div>
  </div>
</section>
```

The exact markup can change, but these states may not disappear:

- normal-scroll story state;
- real poster/photo fallback state;
- explicit enter state;
- briefing/instruction state;
- spatial interaction state;
- obvious exit;
- direct route to Book;
- reduced-motion and no-WebGL fallback.

### Before the capture arrives

- Do not ship a fake room.
- Do not generate a stock recording studio.
- Do not model equipment from guesses.
- Do not show a generic 360 panorama.
- Keep the section architecturally present in development.
- In a public pre-capture build, either hide the disabled entry affordance or present the section as normal editorial studio content using only real approved media that has actually been supplied.

---

## 4. Asset contract for the future studio build

Expected input locations:

```text
assets/studio/
  originals/     # untouched source capture
  photos/        # selected/processed stills
  video/         # conventional video + web derivatives
  360/           # equirectangular source + derivatives
  models/        # Marble/GLB/GLTF/splat/etc.
  posters/       # fast first-paint fallbacks
  metadata/      # capture notes, hotspots, room labels
```

Never destructively replace originals.

A future `assets/studio/metadata/studio-world.json` should be able to describe:

- model/panorama source;
- poster source;
- initial camera/look direction;
- hotspot IDs;
- hotspot labels;
- hotspot media/content targets;
- privacy-redacted zones;
- booking CTA target;
- performance budget / preferred renderer;
- fallback chain.

Do not invent this JSON until the real capture exists.

---

## 5. Fallback ladder

The spatial section must degrade cleanly:

### Level 0 — crawlable DOM

Title, short studio description, service/booking context, and relevant links work with JavaScript disabled.

### Level 1 — real still

A real approved studio photograph/poster carries the section on all devices.

### Level 2 — scroll cinema

Use image sequences or optimized video tied to scroll where performance permits. Never make scroll dependent on decoding hundreds of full-resolution frames.

### Level 3 — interactive spatial view

Load 360/model/splat only after user intent and capability checks.

### Level 4 — WebXR

Offer headset/immersive XR only where supported and only if it improves the experience. WebXR is not the baseline.

---

## 6. Mobile behavior

Mobile is the primary product.

- The spatial viewer must respect safe areas.
- UI controls stay thumb-reachable.
- Do not trap the user in a landscape-only view.
- If device-orientation control is used, ask for platform-required permission at the moment it is useful.
- Touch-drag must work even when device orientation does not.
- Do not block the browser Back gesture with an edge-to-edge interaction zone unless unavoidable.
- Keep the Music / Esmer / Book bar out of the way during active spatial exploration, but restore it immediately when the user exits.
- Audio never autoplays.
- `prefers-reduced-motion` gets a still-first version and no forced scroll scrub.

---

## 7. Scroll-state behavior

The McCluster VR section's useful lesson is the explicit state transition: ordinary page scroll and spatial free-look are different modes and the user is told when the change happens.

Esmer must preserve that clarity.

Suggested state machine:

```text
SCROLL_STORY
  -> STUDIO_THRESHOLD
  -> BRIEFING
  -> SPATIAL_ACTIVE
  -> EXITING
  -> SCROLL_STORY
```

Rules:

- never lock scroll merely because the section enters the viewport;
- lock/park only after explicit Enter;
- restore the exact prior scroll position on exit;
- Escape exits on desktop;
- Back button exits on mobile;
- browser history should not become polluted by internal camera motion;
- page visibility changes pause expensive rendering;
- spatial rendering pauses when offscreen/inactive.

---

## 8. Hotspot ideas — pending verification

Potential hotspot categories, not guaranteed content:

- guitar / instrument story;
- vocal recording position;
- production workstation;
- a release / track that was worked on there;
- a "How I build a song" process note;
- a PRIM3 hotspot only after public credit/material approval;
- direct "Book this room / Book Esmer" action.

Do not publish a gear model, room capability, rate, or client credit merely because something appears in the capture.

---

## 9. Privacy and security review

Before any 360 or room model becomes public, inspect every direction and hotspot for:

- exact address / exterior access path;
- keys / access cards;
- door/alarm codes;
- Wi-Fi credentials;
- computer screens;
- private client/session names;
- unreleased track names;
- serial numbers;
- mail / documents;
- personal photographs or information not approved for the site;
- security camera placement or other sensitive access details.

The spatial experience is a marketing product, not a forensic map of a private room.

---

## 10. Relationship to Esmer's visual identity

The spatial section should inherit Esmer's approved editorial system:

- restrained chrome;
- strong photographic composition;
- deliberate typography;
- minimal instructional text;
- cinematic black/neutral ground when useful;
- transition from editorial archive into real space.

It should **not** inherit McCluster's ruby palette, logos, copy, aircraft motif, Vaunt materials, or branded interface details.

The McCluster reference supplies the **interaction grammar**. Esmer supplies the world.

---

## 11. Definition of done for the reserved section before capture

Before 360/Marble assets exist, this requirement is satisfied only if:

- the section has a stable semantic place in the home scroll;
- the DOM and styling anticipate poster + canvas/model + briefing + controls;
- it does not load a heavy 3D dependency yet;
- no fake studio content is present;
- there is a clear insertion contract for future media;
- layout works on mobile and desktop;
- the Book handoff is already designed;
- the code comments identify exactly where the real studio-world implementation will attach.

After capture, the definition of done expands to include actual spatial QA, privacy review, performance testing, reduced-motion fallback, and Esmer approval.
