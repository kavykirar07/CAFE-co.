const db = require('./database.js');

const menuItems = [
  { name: 'Void Espresso', description: 'A dark, intense double shot pulled from our signature void blend.', price: 380, category: 'Espresso Drinks', image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Brutalist Cortado', description: 'Equal parts espresso and steamed milk, stark and balanced.', price: 420, category: 'Espresso Drinks', image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Glacial Cold Brew', description: 'Steeped for 24 hours, served over a single large ice cube.', price: 500, category: 'Cold Brew', image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Nitro Void', description: 'Our cold brew infused with nitrogen for a creamy, stout-like texture.', price: 540, category: 'Cold Brew', image_url: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Ethiopian Yirgacheffe Pour Over', description: 'Bright, floral, and meticulously hand-poured.', price: 580, category: 'Pour Overs', image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Artisan Sourdough Toast', description: 'Thick-cut sourdough with cultured butter and sea salt.', price: 700, category: 'Food', image_url: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Industrial Tote', description: 'Heavy canvas tote bag featuring the CAFE co. manifesto.', price: 2100, category: 'Merch', image_url: 'https://images.unsplash.com/photo-1597423244036-ef5020e83f3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

const insertMenu = db.prepare(`
  INSERT INTO menu_items (name, description, price, category, image_url)
  VALUES (@name, @description, @price, @category, @image_url)
`);

const checkMenu = db.prepare('SELECT COUNT(*) as count FROM menu_items').get();

if (checkMenu.count === 0) {
  console.log('Seeding menu items...');
  const insertMany = db.transaction((items) => {
    for (const item of items) insertMenu.run(item);
  });
  insertMany(menuItems);
  console.log('Menu seeded successfully.');
} else {
  console.log('Menu already seeded.');
}

// Seed shop products
const shopProducts = [
  { name: 'The Void Blend (Whole Bean)', description: 'Our signature dark roast. Notes of dark chocolate and ash.', price: 1500, stock_quantity: 50, category: 'Beans', badge: 'Bestseller', image_url: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Concrete Espresso Cup', description: 'Hand-poured concrete espresso cup. Raw finish.', price: 1850, stock_quantity: 20, category: 'Merchandise', badge: 'New', image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

const insertShop = db.prepare(`
  INSERT INTO shop_products (name, description, price, stock_quantity, category, badge, image_url)
  VALUES (@name, @description, @price, @stock_quantity, @category, @badge, @image_url)
`);

const checkShop = db.prepare('SELECT COUNT(*) as count FROM shop_products').get();

if (checkShop.count === 0) {
  console.log('Seeding shop products...');
  const insertManyShop = db.transaction((items) => {
    for (const item of items) insertShop.run(item);
  });
  insertManyShop(shopProducts);
  console.log('Shop products seeded successfully.');
} else {
  console.log('Shop products already seeded.');
}
