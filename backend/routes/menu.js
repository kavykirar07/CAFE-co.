const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/menu — Fetch menu items (seeded data)
router.get('/', (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM menu_items WHERE is_available = 1').all();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/menu/shop — Fetch shop products
router.get('/shop', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM shop_products').all();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
