const express = require('express');
const router = express.Router();
const db = require('../db/database');

// POST /api/inquiries — Submit contact form
router.post('/', (req, res) => {
  const { subject, message, name, email, phone } = req.body;

  if (!subject || !message || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO inquiries (subject, message, name, email, phone)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(subject, message, name, email, phone);
    res.status(201).json({ id: info.lastInsertRowid, message: 'Inquiry submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
