(() => {
  // Skip custom cursor on touch/mobile devices — restore native cursor
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursorDot = document.createElement('div');
  cursorDot.classList.add('cursor-dot');
  
  const cursorRing = document.createElement('div');
  cursorRing.classList.add('cursor-ring');
  
  const customCursor = document.createElement('div');
  customCursor.classList.add('custom-cursor');
  customCursor.appendChild(cursorDot);
  customCursor.appendChild(cursorRing);
  document.body.appendChild(customCursor);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  // Track mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows exactly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // GSAP for smooth ring follow (lerp)
  gsap.ticker.add(() => {
    // Lerp formula: current = current + (target - current) * speed
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
  });

  // Hover states
  const interactables = document.querySelectorAll('a, button, .interactive');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });

  // Click state
  document.addEventListener('mousedown', () => {
    gsap.to(cursorRing, { scale: 0.8, duration: 0.1 });
  });
  document.addEventListener('mouseup', () => {
    gsap.to(cursorRing, { scale: 1, duration: 0.1 });
  });
})();
