const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/bookings/check — Check availability (date + location + time)
router.get('/check', (req, res) => {
  const { date, time, location } = req.query;
  
  if (!date || !time || !location) {
    return res.status(400).json({ error: 'Missing required query parameters: date, time, location' });
  }

  try {
    const stmt = db.prepare('SELECT id FROM bookings WHERE date = ? AND time = ? AND table_location = ? AND status != ?');
    const existing = stmt.get(date, time, location, 'cancelled');
    
    if (existing) {
      res.json({ available: false, message: `This slot is fully booked — try another time or location.` });
    } else {
      res.json({ available: true, message: 'Slot is available.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bookings — Create booking (with conflict check)
router.post('/', (req, res) => {
  const { name, email, phone, guest_count, table_location, date, time, special_notes } = req.body;
  
  if (!name || !email || !guest_count || !table_location || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO bookings (name, email, phone, guest_count, table_location, date, time, special_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(name, email, phone, guest_count, table_location, date, time, special_notes);
    res.status(201).json({ id: info.lastInsertRowid, message: 'Booking confirmed successfully.' });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).json({ error: 'This slot is fully booked — try another time or location.' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = router;
