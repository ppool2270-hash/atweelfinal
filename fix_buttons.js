const fs = require('fs');

const filepath = 'frontend/src/App.js';
let content = fs.readFileSync(filepath, 'utf8');

// The line is: prod.inStock !== false ? "bg-stone-100/90 text-charcoal border-stone-300" : "bg-red-600/90 text-white border-red-700"
// Actually, earlier it was bg-lightgrey/90 text-charcoal border-lightgrey, now bg-stone-100/90. Let's find out of stock
content = content.replace(/prod\.inStock !== false \? "[^"]+" : "[^"]+"/g, 'prod.inStock !== false ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"');

// Fix 'MOQ Verified' colors
content = content.replace(/calcResult\?\.moqMet \? "MOQ Verified" : "Below MOQ \(Min 100 KG\)"/g, 'calcResult?.moqMet ? "MOQ Verified" : "Below MOQ (Min 100 KG)"');

fs.writeFileSync(filepath, content, 'utf8');
