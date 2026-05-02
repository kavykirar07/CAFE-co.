(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Hero Headline Split & Stagger
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    // Simple manual split text for demo preserving <br>
    const htmlLines = heroTitle.innerHTML.split('<br>');
    heroTitle.innerHTML = '';
    htmlLines.forEach((line) => {
      const lineDiv = document.createElement('div');
      // strip any leftover tags if needed, but here it's just text
      line.trim().split('').forEach(char => {
        const span = document.createElement('span');
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        lineDiv.appendChild(span);
      });
      heroTitle.appendChild(lineDiv);
    });

    gsap.to('.hero-title span', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      delay: 0.3
    });
  }

  // Section Headers Clip-path wipe
  gsap.utils.toArray('.editorial-header').forEach(header => {
    gsap.fromTo(header, 
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      { 
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
        }
      }
    );
  });

  // Image Cards Scale & Fade
  gsap.utils.toArray('.img-brutalist').forEach(img => {
    gsap.fromTo(img,
      { scale: 0.92, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%'
        }
      }
    );
  });

  // Vertical Text Parallax
  gsap.utils.toArray('.vertical-text').forEach(text => {
    gsap.to(text, {
      yPercent: -40, // 0.4x speed roughly
      ease: 'none',
      scrollTrigger: {
        trigger: text.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
})();
