(() => {
  const nav = document.querySelector('.site-nav');

  // ── Scroll shrink ──────────────────────────────────────────────────────
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── Hamburger menu toggle ───────────────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click (single-page feel)
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Magnetic Nav Links (desktop / fine pointer only) ───────────────────
  if (!window.matchMedia('(pointer: coarse)').matches && typeof gsap !== 'undefined') {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width  / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }
})();
