(() => {
  // --- Reservations Form Logic ---
  const resForm = document.getElementById('reservation-form');
  if (resForm) {
    const checkBtn = document.getElementById('btn-check-avail');
    const msgDiv = document.getElementById('res-message');
    
    checkBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const location = document.getElementById('res-location').value;
      
      if (!date || !time || !location) {
        msgDiv.innerHTML = '<span class="text-danger">Please select date, time, and location.</span>';
        return;
      }
      
      try {
        const res = await fetch(`http://localhost:3001/api/bookings/check?date=${date}&time=${time}&location=${location}`);
        const data = await res.json();
        
        if (data.available) {
          msgDiv.innerHTML = `<span class="text-success">${data.message}</span>`;
          document.getElementById('res-step-2').classList.remove('d-none');
        } else {
          msgDiv.innerHTML = `<span class="text-danger" style="color: var(--burn) !important;">${data.message}</span>`;
          document.getElementById('res-step-2').classList.add('d-none');
        }
      } catch (err) {
        console.error(err);
      }
    });

    resForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const payload = {
        name: document.getElementById('res-name').value,
        email: document.getElementById('res-email').value,
        phone: document.getElementById('res-phone').value,
        guest_count: parseInt(document.getElementById('res-guests').value),
        table_location: document.getElementById('res-location').value,
        date: document.getElementById('res-date').value,
        time: document.getElementById('res-time').value,
        special_notes: document.getElementById('res-notes').value
      };
      
      try {
        const res = await fetch('http://localhost:3001/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        if (res.ok) {
          // Success animation
          resForm.innerHTML = `
            <div class="text-center py-5">
              <h2 class="editorial-header mb-4">Confirmed</h2>
              <p class="accent-text">Your ritual is booked. See you in the void.</p>
              <div class="mt-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" stroke-width="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
            </div>
          `;
        } else {
          msgDiv.innerHTML = `<span class="text-danger" style="color: var(--burn) !important;">${data.error}</span>`;
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  // --- Contact Form Logic ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const payload = {
        name: document.getElementById('c-name').value,
        email: document.getElementById('c-email').value,
        phone: document.getElementById('c-phone').value,
        subject: document.getElementById('c-subject').value,
        message: document.getElementById('c-message').value
      };
      
      try {
        const res = await fetch('http://localhost:3001/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (res.ok) {
          contactForm.innerHTML = `<h3 class="editorial-header">Message Transmitted.</h3><p class="accent-text mt-3">We will respond shortly.</p>`;
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
})();
