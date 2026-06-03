/* ============================================================
   powderday — interactions
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav shadow on scroll ---- */
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

  /* ---- Animated chat ---- */
  var chat = document.getElementById('chat');
  if (chat) {
    var msgs = Array.prototype.slice.call(chat.querySelectorAll('.msg'));

    if (reduceMotion) {
      msgs.forEach(function (m) { m.classList.add('show'); });
    } else {
      // hide all, then play sequentially when the chat scrolls into view
      msgs.forEach(function (m) { m.style.display = 'none'; });
      var played = false;

      function playChat() {
        if (played) return;
        played = true;

        var i = 0;
        function next() {
          if (i >= msgs.length) return;
          var m = msgs[i];
          var incoming = m.classList.contains('in');
          var delay = incoming ? 950 : 600;

          if (incoming) {
            var typing = document.createElement('div');
            typing.className = 'typing';
            typing.innerHTML = '<span></span><span></span><span></span>';
            chat.appendChild(typing);
            chat.scrollTop = chat.scrollHeight;
            setTimeout(function () {
              chat.removeChild(typing);
              show(m);
            }, delay);
          } else {
            setTimeout(function () { show(m); }, delay);
          }
        }
        function show(m) {
          m.style.display = '';
          // force reflow so the transition fires
          void m.offsetWidth;
          m.classList.add('show');
          chat.scrollTop = chat.scrollHeight;
          i++;
          next();
        }
        next();
      }

      if ('IntersectionObserver' in window) {
        var cio = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { playChat(); cio.disconnect(); }
          });
        }, { threshold: 0.4 });
        cio.observe(chat);
      } else {
        playChat();
      }
    }
  }

  /* ---- Signup form (static / no backend) ---- */
  var form = document.getElementById('signup');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('email');
      var msg = document.getElementById('formMsg');
      var val = (input.value || '').trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!ok) {
        msg.textContent = 'Please enter a valid email.';
        input.focus();
        return;
      }
      msg.textContent = "You're on the list — we'll be in touch. 🎉";
      form.reset();
      // To capture for real: swap this for a Formspree POST (see index.html comment).
    });
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
