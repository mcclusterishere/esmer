/* ESMER — Book inquiry.

   Inquiry-first by design: a booking request is a lead, not a charge.
   CLAUDE.md forbids guessing rates, so nothing here quotes a price or
   promises availability.

   The form posts to the McCluster control plane. This repository holds no
   backend, no database and no Stripe key — see docs/BACKEND-BOUNDARY.md.
   The endpoint contract lives in mcclusterishere/mccluster at
   docs/control-plane/CLIENT-PAYMENTS.md.

   The form element carries a real method/action so that with JS blocked it
   is still a labelled, submittable form rather than dead markup. */

(function () {
  'use strict';

  var form = document.querySelector('[data-book-form]');
  if (!form) return;

  var status = form.querySelector('.form__status');
  var button = form.querySelector('button[type="submit"]');
  var endpoint = form.getAttribute('data-endpoint');
  var org = form.getAttribute('data-org');

  var say = function (message, state) {
    if (!status) return;
    status.textContent = message;
    if (state) { status.setAttribute('data-state', state); }
    else { status.removeAttribute('data-state'); }
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var data = new FormData(form);
    var name = String(data.get('name') || '').trim();
    var email = String(data.get('email') || '').trim();

    if (!name || !email) {
      say('A name and an email address are needed to reply to you.', 'error');
      return;
    }

    /* A honeypot, not a CAPTCHA. If the hidden field is filled, a bot filled
       it. Report success rather than an error: telling a scraper it failed
       just teaches it to try again. */
    if (String(data.get('company') || '').trim()) {
      say('Thank you — your message has been sent.');
      form.reset();
      return;
    }

    button.disabled = true;
    say('Sending…');

    /* A request that never answers must not strand the visitor. Without
       this, an unreachable endpoint leaves "Sending…" on screen with the
       submit button disabled forever — the inquiry is lost and there is no
       way to retry. Booking is the whole point of this page, so it fails
       loudly and hands the form back. AbortSignal.timeout is recent, so
       fall back to a plain controller where it is missing. */
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timedOut = false;
    var timer = controller
      ? window.setTimeout(function () { timedOut = true; controller.abort(); }, 15000)
      : null;

    fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: controller ? controller.signal : undefined,
      body: JSON.stringify({
        org: org,
        name: name,
        email: email,
        want: String(data.get('want') || ''),
        note: String(data.get('note') || ''),
        page: window.location.pathname,
        source: 'esmer-book'
      })
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Request failed with ' + response.status);
        return response.json().catch(function () { return {}; });
      })
      .then(function () {
        form.reset();
        say('Thank you — your message has been sent. Esmer will reply by email.');
      })
      .catch(function () {
        /* Never claim an inquiry was received when it was not.

           A fallback address would be the right thing to offer here, but
           booking destination is on the client-approval list in
           docs/ESMER-DOSSIER.md §13 and none has been supplied. Inventing
           a plausible one would route real work to an address nobody
           reads, so the message stays honest until Esmer provides it and
           site.json carries it. */
        var fallback = form.getAttribute('data-fallback');
        var lead = timedOut
          ? 'That took too long to send.'
          : 'That did not send.';
        say(
          fallback
            ? lead + ' Please email ' + fallback + ' directly, or try again in a moment.'
            : lead + ' Please try again in a moment.',
          'error'
        );
      })
      .then(function () {
        if (timer) window.clearTimeout(timer);
        button.disabled = false;
      });
  });
})();
