/* ============================================================
   INLINE BATHROOMS — Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll-triggered reveal ──────────────────────────────── */
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  /* ── Nav: hide on scroll down, reveal on scroll up ─────────  */
  const nav = document.getElementById('nav');
  let prev = 0;
  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > 120) {
      nav.style.transform = curr > prev ? 'translateY(-100%)' : 'translateY(0)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    prev = curr;
  }, { passive: true });

  /* ── Smooth scroll for anchor links ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = (nav?.offsetHeight ?? 74);
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });

  /* ── Contact form ─────────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (form && submitBtn) {
    const originalLabel = submitBtn.textContent;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach((field) => {
        field.style.borderBottom = '';
        if (!field.value.trim()) {
          field.style.borderBottom = '1px solid #c0392b';
          valid = false;
        }
      });
      if (!valid) return;

      // Simulate submission
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Consultation request received — we\'ll be in touch shortly.';
        submitBtn.style.background = 'var(--sage)';
        submitBtn.style.borderColor = 'var(--sage)';

        setTimeout(() => {
          submitBtn.textContent = originalLabel;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          form.reset();
        }, 5000);
      }, 1200);
    });
  }

})();
