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

  /* The radio carries the human label as its value; the branch is keyed by
     id. The checked radio's own element id ("want-lessons") is the link. */
  var serviceId = function (label) {
    var input = form.querySelector('input[name="want"]:checked');
    return input && input.id ? input.id.replace(/^want-/, '') : String(label);
  };

  var status = form.querySelector('.form__status');
  var sent = document.querySelector('[data-sent]');
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

    /* THE ANSWERS.

       The control plane takes `want` (200 chars) and `note` (4000). The tree
       can produce a dozen answers, so they are folded into those two fields
       rather than bending a shared API for one client: `want` stays the
       category, and the branch's answers are transcribed into `note` above
       the visitor's own message, where whoever reads the lead can see them.

       Only the SELECTED branch is read. An unselected branch still has its
       radios pre-checked in the DOM — with :has() unsupported they are even
       on screen — so collecting every field would post answers to questions
       the visitor never saw. */
    var category = String(data.get('want') || '');
    var branch = form.querySelector('[data-branch="' + serviceId(category) + '"]');
    var answers = [];
    if (branch) {
      var groups = branch.querySelectorAll('fieldset');
      for (var g = 0; g < groups.length; g++) {
        var legend = groups[g].querySelector('legend');
        var picked = groups[g].querySelectorAll('input:checked');
        if (!legend || !picked.length) continue;
        var values = [];
        for (var v = 0; v < picked.length; v++) values.push(picked[v].value);
        answers.push(legend.textContent.trim() + ' ' + values.join(', '));
      }
    }
    var timing = String(data.get('timing') || '');
    if (timing) answers.push(form.getAttribute('data-timing-label') + ' ' + timing);

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
        want: category.slice(0, 200),
        note: (answers.length ? answers.join('\n') + '\n\n' : '') + String(data.get('note') || ''),
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
        say('');
        /* The form is replaced, not merely annotated: the inquiry is done and
           the only thing left to offer is the account. */
        form.hidden = true;
        if (sent) {
          sent.hidden = false;
          sent.scrollIntoView({ block: 'start' });
          /* The address is already known from the inquiry, so the account
             offer never asks for it twice. */
          sent.setAttribute('data-email', email);
        }
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

  /* ACCOUNT — passwordless, and only ever offered after a confirmed send.

     No password is collected because this repo must never handle one: auth
     belongs to the McCluster control plane (docs/BACKEND-BOUNDARY.md). The
     plane emails a sign-in link to the address the inquiry already used. */
  var accountBtn = document.querySelector('[data-account-start]');
  if (accountBtn && sent) {
    var accountStatus = sent.querySelector('[data-account-status]');
    accountBtn.addEventListener('click', function () {
      var email = sent.getAttribute('data-email');
      if (!email) return;
      accountBtn.disabled = true;
      accountStatus.textContent = 'Sending…';
      accountStatus.removeAttribute('data-state');

      var controller = typeof AbortController === 'function' ? new AbortController() : null;
      var timer = controller ? window.setTimeout(function () { controller.abort(); }, 15000) : null;

      fetch(form.getAttribute('data-account-endpoint'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        signal: controller ? controller.signal : undefined,
        body: JSON.stringify({ org: org, email: email })
      })
        .then(function (response) {
          if (!response.ok) throw new Error(String(response.status));
          accountStatus.textContent = 'Check ' + email + ' for your sign-in link.';
          accountBtn.hidden = true;
        })
        .catch(function () {
          /* The inquiry itself already succeeded. Say only that the link
             failed, so nobody thinks their message was lost too. */
          accountStatus.textContent =
            'The sign-in link did not send. Your message reached Esmer either way — you can try again in a moment.';
          accountStatus.setAttribute('data-state', 'error');
          accountBtn.disabled = false;
        })
        .then(function () { if (timer) window.clearTimeout(timer); });
    });
  }
})();
