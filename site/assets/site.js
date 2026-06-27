/* ============================================================
   MEC Eye Specialists — shared site behaviour
   ============================================================ */
(function () {
  'use strict';

  /* ---- mobile nav ---- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.navlinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        links.classList.toggle('open');
      });
    }
  }

  /* ---- reveal on scroll ---- */
  function initReveal() {
    var els = document.querySelectorAll('.fade-up');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('reveal'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var d = en.target.getAttribute('data-delay');
          if (d) en.target.style.animationDelay = d + 'ms';
          en.target.classList.add('reveal');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- EN / ES language toggle ----
     Elements carry data-en="..." and data-es="..." ; we swap textContent.
     Placeholders use data-en-ph / data-es-ph. Preference persists. ---- */
  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-en-ph]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang + '-ph');
      if (v != null) el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }
  function initLang() {
    var saved = 'en';
    try { saved = localStorage.getItem('mec-lang') || 'en'; } catch (e) {}
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.addEventListener('click', function () {
        var lang = b.getAttribute('data-lang');
        try { localStorage.setItem('mec-lang', lang); } catch (e) {}
        applyLang(lang);
      });
    });
    if (document.querySelector('[data-en]') || document.querySelector('.lang-switch')) applyLang(saved);
  }

  /* ---- homepage visual-direction switcher ---- */
  function initDirection() {
    var sw = document.querySelector('.dir-switch');
    if (!sw) return;
    var saved = 'aurora';
    try { saved = localStorage.getItem('mec-dir') || 'aurora'; } catch (e) {}
    function set(dir) {
      document.body.classList.remove('dir-aurora', 'dir-modern', 'dir-calm');
      document.body.classList.add('dir-' + dir);
      sw.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-dir') === dir);
      });
      try { localStorage.setItem('mec-dir', dir); } catch (e) {}
    }
    sw.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () { set(b.getAttribute('data-dir')); });
    });
    set(saved);
  }

  /* ---- multi-step form engine ----
     Markup: .mform > [.fstep ...] ; nav buttons [data-step-next]/[data-step-prev].
     Progress rail: .fprogress with .fprog-item per step. ---- */
  function initForms() {
    document.querySelectorAll('.mform').forEach(function (form) {
      var steps = Array.prototype.slice.call(form.querySelectorAll('.fstep'));
      var progItems = Array.prototype.slice.call(form.querySelectorAll('.fprog-item'));
      var bar = form.querySelector('.fprog-bar > i');
      var current = 0;

      function show(i) {
        current = Math.max(0, Math.min(steps.length - 1, i));
        steps.forEach(function (s, idx) { s.hidden = idx !== current; });
        progItems.forEach(function (p, idx) {
          p.classList.toggle('done', idx < current);
          p.classList.toggle('current', idx === current);
        });
        if (bar) bar.style.width = ((current) / (steps.length - 1) * 100) + '%';
        var top = form.getBoundingClientRect().top + window.pageYOffset - 110;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }

      function validate(stepEl) {
        var ok = true;
        stepEl.querySelectorAll('[required]').forEach(function (f) {
          var bad = false;
          if (f.type === 'checkbox') bad = !f.checked;
          else bad = !String(f.value || '').trim();
          if (f.type === 'email' && f.value) bad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value);
          var field = f.closest('.field') || f.parentElement;
          if (field) field.classList.toggle('invalid', bad);
          if (bad && ok) { try { f.focus(); } catch (e) {} }
          if (bad) ok = false;
        });
        return ok;
      }

      form.addEventListener('click', function (e) {
        var next = e.target.closest('[data-step-next]');
        var prev = e.target.closest('[data-step-prev]');
        if (next) {
          e.preventDefault();
          if (validate(steps[current])) {
            if (current === steps.length - 1) { submit(); } else { show(current + 1); }
          }
        } else if (prev) {
          e.preventDefault();
          show(current - 1);
        }
      });

      form.addEventListener('input', function (e) {
        var field = e.target.closest('.field');
        if (field && field.classList.contains('invalid')) field.classList.remove('invalid');
      });

      // allow jumping back via progress rail
      progItems.forEach(function (p, idx) {
        p.addEventListener('click', function () { if (idx < current) show(idx); });
      });

      function submit() {
        var done = form.querySelector('.fdone');
        var wrap = form.querySelector('.fsteps-wrap');
        var rail = form.querySelector('.fprogress');

        var evt = new CustomEvent('mec-form-submit', { detail: { form: form }, cancelable: true });
        form.dispatchEvent(evt);

        if (done) {
          if (wrap) wrap.hidden = true;
          if (rail) rail.hidden = true;
          done.hidden = false;
          window.scrollTo({ top: form.getBoundingClientRect().top + window.pageYOffset - 120, behavior: 'smooth' });
        }
      }

      show(0);
    });
  }

  /* ---- signature pad for consent forms ---- */
  function initSignature() {
    document.querySelectorAll('canvas.sigpad').forEach(function (canvas) {
      var ctx = canvas.getContext('2d');
      var ratio = window.devicePixelRatio || 1;
      function size() {
        var r = canvas.getBoundingClientRect();
        canvas.width = r.width * ratio; canvas.height = r.height * ratio;
        ctx.scale(ratio, ratio); ctx.lineWidth = 2.2; ctx.lineCap = 'round';
        ctx.strokeStyle = '#16313F';
      }
      size();
      var drawing = false, last = null, dirty = false;
      function pos(e) {
        var r = canvas.getBoundingClientRect();
        var t = e.touches ? e.touches[0] : e;
        return { x: t.clientX - r.left, y: t.clientY - r.top };
      }
      function start(e) { drawing = true; last = pos(e); e.preventDefault(); }
      function move(e) {
        if (!drawing) return;
        var p = pos(e);
        ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        last = p; dirty = true;
        var hint = canvas.parentElement.querySelector('.sig-hint');
        if (hint) hint.style.opacity = 0;
        e.preventDefault();
      }
      function end() { drawing = false; }
      canvas.addEventListener('mousedown', start); canvas.addEventListener('mousemove', move);
      window.addEventListener('mouseup', end);
      canvas.addEventListener('touchstart', start, {passive:false}); canvas.addEventListener('touchmove', move, {passive:false});
      window.addEventListener('touchend', end);
      var clear = canvas.parentElement.querySelector('.sig-clear');
      if (clear) clear.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); dirty = false;
        var hint = canvas.parentElement.querySelector('.sig-hint');
        if (hint) hint.style.opacity = '';
      });
    });
  }

  /* ---- accordion (FAQ) ---- */
  function initAccordion() {
    document.querySelectorAll('.acc-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.acc-item');
        var ans = item.querySelector('.acc-a');
        var open = item.classList.toggle('open');
        ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
      });
    });
  }

  /* ---- form tab bar across the 4 new-patient forms ---- */
  function initFormTabs() {
    var shell = document.querySelector('.form-shell');
    if (!shell) return;
    var form = shell.closest('.mform');
    if (!form) return;
    var here = location.pathname.split('/').pop() || '';
    var tabs = [
      { f: 'registration.html', n: '1', en: 'Registration', es: 'Registro' },
      { f: 'medical-history.html', n: '2', en: 'Medical History', es: 'Historial Médico' },
      { f: 'insurance.html', n: '3', en: 'Insurance', es: 'Seguro' },
      { f: 'consent.html', n: '4', en: 'Consent', es: 'Consentimiento' }
    ];
    var activeIdx = tabs.findIndex(function (t) { return t.f === here; });
    var nav = document.createElement('nav');
    nav.className = 'form-tabs';
    nav.setAttribute('aria-label', 'New patient forms');
    nav.innerHTML = tabs.map(function (t, i) {
      var cls = i === activeIdx ? 'active' : (i < activeIdx ? 'done' : '');
      return '<a href="' + t.f + '" class="' + cls + '">' +
        '<span class="tn">' + (i < activeIdx ? '✓' : t.n) + '</span>' +
        '<span class="lbl" data-en="' + t.en + '" data-es="' + t.es + '">' + t.en + '</span></a>';
    }).join('');
    form.parentNode.insertBefore(nav, form);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFormTabs();
    initNav(); initReveal(); initLang(); initDirection(); initForms(); initSignature(); initAccordion();
    // set active nav link by filename
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navlinks a[data-page]').forEach(function (a) {
      if (a.getAttribute('data-page') === path) a.classList.add('active');
    });
  });
})();
