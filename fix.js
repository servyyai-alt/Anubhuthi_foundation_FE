const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.jsx')) {
      let c = fs.readFileSync(p, 'utf8');
      let orig = c;
      // Replace corrupted UTF-8 encodings
      // Rupee: â‚¹
      // Em Dash: â€”
      // Star: â…
      c = c.replace(/â‚¹/g, '₹');
      c = c.replace(/â€”/g, '—');
      c = c.replace(/â…/g, '★');
      
      if (c !== orig) {
        fs.writeFileSync(p, c);
        console.log('Fixed ' + p);
      }
    }
  });
}

walk('src');
