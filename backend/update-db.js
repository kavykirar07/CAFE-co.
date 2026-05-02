const Database = require('better-sqlite3');
const fs = require('fs');
const db = new Database('./db/cafe_co.sqlite');
db.prepare('DROP TABLE IF EXISTS event_leads').run();
const schema = fs.readFileSync('./db/schema.sql', 'utf8');
db.exec(schema);
console.log('Event leads table recreated.');
