/* ============================================================
   powderday — interactions
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav border on scroll ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Phone demo: cycle through the four app states ---- */
  var demo = document.getElementById('demo');
  if (demo) {
    var states = Array.prototype.slice.call(demo.querySelectorAll('.state'));
    var buttons = Array.prototype.slice.call(demo.querySelectorAll('.demo-steps button'));
    // how long each state stays on screen (render is longer so its tasks finish)
    var durations = [3200, 3000, 3600, 3400];
    var current = 0;
    var timer = null;
    var inView = true;

    function show(i) {
      current = i;
      states.forEach(function (s, k) { s.classList.toggle('active', k === i); });
      buttons.forEach(function (b, k) { b.classList.toggle('on', k === i); });
    }
    function schedule() {
      clearTimeout(timer);
      if (reduceMotion || !inView) return;
      timer = setTimeout(function () {
        show((current + 1) % states.length);
        schedule();
      }, durations[current]);
    }

    buttons.forEach(function (b, k) {
      b.addEventListener('click', function () { show(k); schedule(); });
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) schedule(); else clearTimeout(timer);
      }, { threshold: 0.3 }).observe(demo);
    } else {
      schedule();
    }
    show(0);
  }

  /* ---- Signup forms (static: confirm in-browser; see index.html for Formspree) ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.signup'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var msg = form.nextElementSibling;
      var val = (input.value || '').trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!ok) {
        if (msg) msg.textContent = 'Please enter a valid email.';
        input.focus();
        return;
      }
      if (msg) msg.textContent = "You're on the list. We'll ping you when it's your turn. ✦";
      form.reset();
    });
  });

  /* ---- Footer year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
