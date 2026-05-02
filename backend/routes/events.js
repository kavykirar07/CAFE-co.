const express = require('express');
const router = express.Router();
const db = require('../db/database');

// POST /api/events/leads — Submit celebration lead
router.post('/leads', (req, res) => {
  const { 
    event_type, event_date, guest_count, estimated_budget, add_ons, 
    contact_name, contact_email, contact_phone, special_requests 
  } = req.body;

  if (!event_type || !event_date || !guest_count || !estimated_budget || !contact_name || !contact_email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const addOnsJson = add_ons ? JSON.stringify(add_ons) : null;
    
    const stmt = db.prepare(`
      INSERT INTO event_leads 
      (event_type, event_date, guest_count, estimated_budget, add_ons, contact_name, contact_email, contact_phone, special_requests)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      event_type, event_date, guest_count, estimated_budget, addOnsJson, 
      contact_name, contact_email, contact_phone, special_requests
    );
    
    res.status(201).json({ id: info.lastInsertRowid, message: 'Event lead submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
