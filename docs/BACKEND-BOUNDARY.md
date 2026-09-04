# Backend boundary — read before writing any server code in this repo

**Do not build a backend in this repository.** `AGENTS.md` §17 and `CLAUDE.md`
§6 already say so. This file says where the backend actually is, so that rule
is followable instead of merely restrictive.

Esmer's server-side needs are served by the McCluster control plane, which is
already live:

- API: `https://api.mccluster.org`
- Worker source: `mcclusterishere/mccluster` → `workers/mccluster`
- Data: Supabase `zmnhbrjyhxzhkxmhkexs`
- Contract: `mcclusterishere/mccluster` → `docs/control-plane/CLIENT-PAYMENTS.md`

Esmer is registered on the plane as org slug **`esmer`**.

## What this repo owns

The site. Markup, styling, motion, the three-tab shell (Music / Esmer / Book),
the scroll story, media, and the fetch calls that talk to the API below.

## What this repo must never contain

A database, an auth system, a Stripe key of any kind, a Cloudflare Worker, an
admin panel, a CRM, or a social scheduler. If a feature seems to need one,
it belongs on the plane — raise it there.

**No Stripe key, publishable or secret, belongs in this repo.** Payment
surfaces are created server-side by the plane, which hands back a Stripe-hosted
URL for the browser to visit.

## The Book tab

Booking is **inquiry-first**. A booking request is a lead, not a charge —
Esmer's rates are not settled, and `CLAUDE.md` forbids guessing them. The form
posts an inquiry; Esmer reviews it; payment is arranged afterwards.

The form is a **conversation tree**: each service category carries its own
follow-up questions, and only the chosen branch is on screen. Branch answers
are transcribed into `note` above the visitor's message — `want` stays the
category — so the API stays generic and one client's form does not bend it.

```js
await fetch('https://api.mccluster.org/v1/inquiries', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    org: 'esmer',
    name, email,
    want,            // which service — free text, the list is not settled
    note,            // the message
    page: location.pathname,
    source: 'esmer-book'
  })
});
// 201 -> { received: true, at: "…", notified: true }
//
// `notified` says whether the plane actually reached a person. It is false
// when the client has no owner account and no notify_email configured — the
// inquiry is still recorded and still lands in the inbox. Never show the
// visitor anything different based on it; it is for our diagnostics.
```

No API key. No auth. Nothing sensitive comes back — a `201` means it landed in
the CRM, and that is all the form needs to know.

Handle a non-2xx by telling the visitor the message did not send and offering
the fallback contact. Never claim an inquiry was received when it was not.

## Accounts

After a confirmed send, the Book page offers an account so the visitor can
keep the thread. It is **passwordless** — this repo never handles a password.

```js
await fetch('https://api.mccluster.org/v1/account/start', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ org: 'esmer', email })   // the address they just used
});
// 200 -> { sent: true }   Supabase emails the sign-in link.
```

The response is identical whether or not that address already has an account.
Do not surface any difference: it would turn the endpoint into a way to check
whether a given person is a McCluster client's customer.

Only offer this after the inquiry itself succeeded. An account offer stacked
on a message that did not send is a lie about the first half.

## Do not invent endpoints

If the site needs something the API does not serve, the answer is a change in
`mcclusterishere/mccluster`, not a new service here and not a mock that
pretends. Leave a precise TODO and ask.

## Status

`/v1/inquiries` is written and committed on the control plane but **not yet
deployed**, and the plane's Stripe keys are not yet set. Build the Book form
against the contract above; expect the endpoint to answer once the plane is
deployed. Do not work around it with a second backend.
