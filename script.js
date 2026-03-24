/* ============================================================
   INLINE BATHROOMS — Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll-triggered reveal ──────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ── Hide/show nav on scroll ──────────────────────────────── */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 200) {
      nav.style.transform = current > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = current;
  }, { passive: true });

  /* ── Smooth scroll for anchor links ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight : 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* ── Contact form feedback ────────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Enquiry sent — we\'ll be in touch shortly';
        btn.style.background = 'var(--sage)';
        btn.style.borderColor = 'var(--sage)';

        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.borderColor = '';
          form.reset();
        }, 4000);
      }, 1000);
    });
  }

})();
