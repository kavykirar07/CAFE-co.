const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve static files

// Ensure DB is initialized and seeded
require('./db/database');
require('./db/seed');

// Routes
const bookingsRoutes = require('./routes/bookings');
const inquiriesRoutes = require('./routes/inquiries');
const eventsRoutes = require('./routes/events');
const menuRoutes = require('./routes/menu');

app.use('/api/bookings', bookingsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/menu', menuRoutes);

// Redirect root to home page
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// Catch-all route to serve index.html for unknown routes (if needed for client-side routing)
// Wait, the prompt uses multiple HTML files (e.g., home-2.html, index.html). 
// So serving static files is sufficient.

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Trigger nodemon restart for re-seed

