-- TABLE 1: Bookings (Page 10 — Reservations)
CREATE TABLE IF NOT EXISTS bookings (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  guest_count   INTEGER NOT NULL CHECK(guest_count BETWEEN 1 AND 20),
  table_location TEXT NOT NULL CHECK(table_location IN ('Indoor','Bar','Patio','Private Room')),
  date          DATE NOT NULL,
  time          TIME NOT NULL,
  special_notes TEXT,
  status        TEXT DEFAULT 'pending' CHECK(status IN ('pending','confirmed','cancelled')),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(table_location, date, time) -- conflict-check constraint
);

-- TABLE 2: Inquiries (Page 14 — Contact)
CREATE TABLE IF NOT EXISTS inquiries (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  subject       TEXT NOT NULL,
  message       TEXT NOT NULL,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  timestamp     DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_read       BOOLEAN DEFAULT FALSE
);

-- TABLE 3: Event Leads (Page 15 — Celebration Hub)
CREATE TABLE IF NOT EXISTS event_leads (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type       TEXT NOT NULL CHECK(event_type IN ('Birthday','Anniversary','Corporate','Wedding','Other')),
  event_date       DATE NOT NULL,
  guest_count      INTEGER NOT NULL,
  estimated_budget TEXT NOT NULL CHECK(estimated_budget IN ('<₹40,000','₹40,000–₹1,25,000','₹1,25,000–₹4,00,000','>₹4,00,000')),
  add_ons          TEXT, -- JSON array: ["Live Music","Catering","Decor","Photography"]
  contact_name     TEXT NOT NULL,
  contact_email    TEXT NOT NULL,
  contact_phone    TEXT,
  special_requests TEXT,
  lead_status      TEXT DEFAULT 'new' CHECK(lead_status IN ('new','contacted','quoted','booked','lost')),
  submitted_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 4: Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  name             TEXT NOT NULL,
  description      TEXT,
  price            DECIMAL(10, 2) NOT NULL,
  category         TEXT NOT NULL CHECK(category IN ('Espresso Drinks', 'Cold Brew', 'Pour Overs', 'Food', 'Merch')),
  image_url        TEXT,
  is_available     BOOLEAN DEFAULT 1
);

-- TABLE 5: Shop Products
CREATE TABLE IF NOT EXISTS shop_products (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  name             TEXT NOT NULL,
  description      TEXT,
  price            DECIMAL(10, 2) NOT NULL,
  stock_quantity   INTEGER DEFAULT 0,
  image_url        TEXT,
  category         TEXT,
  badge            TEXT -- e.g., 'New', 'Bestseller'
);
