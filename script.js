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
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ── Sticky nav style on scroll ──────────────────────────── */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    nav.classList.toggle('scrolled', current > 60);

    // Hide nav on scroll down, reveal on scroll up
    if (current > 200) {
      if (current > lastScroll) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = current;
  }, { passive: true });

  /* ── Hero entrance animation ──────────────────────────────── */
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroImg = hero.querySelector('.hero__img');
    if (heroImg.complete) {
      hero.classList.add('is-loaded');
    } else {
      heroImg.addEventListener('load', () => hero.classList.add('is-loaded'));
    }
  }

  /* ── Mobile nav burger ────────────────────────────────────── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Smooth scroll for all anchor links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Contact form ─────────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate submission — replace with real endpoint
      setTimeout(() => {
        btn.textContent = 'Enquiry Sent';
        btn.style.background = 'var(--sage)';
        btn.style.borderColor = 'var(--sage)';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.borderColor = '';
          form.reset();
        }, 3500);
      }, 1200);
    });
  }

  /* ── Parallax on hero image (subtle) ─────────────────────── */
  const heroImg = document.querySelector('.hero__img');
  if (heroImg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${scrolled * 0.2}px)`;
      }
    }, { passive: true });
  }

})();
