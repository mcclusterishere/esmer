/* ESMER — site shell.
   Progressive enhancement only. Every page is complete and readable with
   this file blocked; nothing here is on the critical rendering path. */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Reveal on scroll.

     The failure mode here must be "content is visible without animation",
     never "content is invisible". That is not theoretical: an element the
     viewport jumps clean over — an anchor link, find-in-page, a restored
     scroll position — never intersects, so an observer-only implementation
     leaves it hidden permanently. Testing this page found three such
     elements.

     So there are three ways in and the class is only ever added:
       1. anything already on screen at load is revealed immediately;
       2. the observer handles the normal case of scrolling down to it;
       3. a timer sweeps up anything the first two missed.
     The hidden state is also only ever applied when there is an observer
     to undo it. */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var revealAll = function () {
      for (var k = 0; k < reveals.length; k++) reveals[k].classList.add('is-in');
    };

    if (reduced.matches || !('IntersectionObserver' in window)) {
      revealAll();
    } else {
      document.documentElement.classList.add('reveals-armed');

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

      for (var j = 0; j < reveals.length; j++) {
        var el = reveals[j];
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-in');
        } else {
          io.observe(el);
        }
      }

      /* The sweep. Long enough that a reader scrolling normally still sees
         the animation, short enough that nobody stares at a blank band. */
      window.setTimeout(revealAll, 4000);
    }
  }

  /* Scroll progress. */
  var progress = document.querySelector('.progress');
  if (progress && !reduced.matches) {
    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------
     LISTENING BAR

     Spotify and SoundCloud are function-only references: persistent
     visibility of what you are listening to, and one obvious way back to
     it. docs/MEDIA-MANIFEST.json forbids rehosting streaming audio, so
     this selects a release and hands off to the official platform rather
     than playing anything itself.

     The state is deliberately the same shape a real player would need
     (title, subtitle, artwork, destination), so that when Esmer supplies
     previews he controls, audio slots in behind this without the surface
     changing.
     --------------------------------------------------------------- */

  var bar = document.querySelector('.listening');
  if (bar) {
    var elTitle = bar.querySelector('.listening__title');
    var elSub = bar.querySelector('.listening__sub');
    var elGo = bar.querySelector('.listening__go');
    var elArt = bar.querySelector('.listening__art');
    var KEY = 'esmer:listening';

    var show = function (state) {
      if (!state || !state.title) return;
      elTitle.textContent = state.title;
      elSub.textContent = state.sub || '';
      elGo.href = state.href || '#';
      if (state.art) {
        elArt.style.backgroundImage = 'url("' + state.art + '")';
        elArt.style.backgroundSize = 'cover';
      }
      bar.setAttribute('data-open', 'true');
    };

    /* Carried across page loads so the bar behaves like a player and not
       like a banner that resets on every navigation. sessionStorage can
       throw outright in a locked-down browser, so every access is guarded
       and the bar simply stays closed if it fails. */
    try {
      var saved = window.sessionStorage.getItem(KEY);
      if (saved) show(JSON.parse(saved));
    } catch (e) { /* no persisted selection; not an error */ }

    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-listen]');
      if (!trigger) return;
      var state = {
        title: trigger.getAttribute('data-listen-title') || '',
        sub: trigger.getAttribute('data-listen-sub') || '',
        href: trigger.getAttribute('data-listen-href') || trigger.href || '',
        art: trigger.getAttribute('data-listen-art') || ''
      };
      show(state);
      try { window.sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* not fatal */ }
    });

    var close = bar.querySelector('.listening__close');
    if (close) {
      close.addEventListener('click', function () {
        bar.setAttribute('data-open', 'false');
        try { window.sessionStorage.removeItem(KEY); } catch (e) { /* not fatal */ }
      });
    }
  }
})();
