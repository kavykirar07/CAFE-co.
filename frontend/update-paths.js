const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\"\.\.\/css\/main\.css\"/g, '"./scss/main.scss"');
  content = content.replace(/\"\.\.\/js\//g, '"./js/');
  fs.writeFileSync(file, content);
  console.log(`Updated paths in ${file}`);
});
