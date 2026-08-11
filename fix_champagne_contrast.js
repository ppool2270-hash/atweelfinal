const fs = require('fs');

const filepath = 'frontend/src/App.js';
let content = fs.readFileSync(filepath, 'utf8');

// Instead of regex hacking everything, let's target specific low-contrast uses.
// For instance: text-[10px] uppercase tracking-[0.2em] font-bold text-champagne on a light background.
// We can use a warm, dark color like amber-800 or stone-800.
content = content.replace(/text-champagne/g, 'text-amber-800');
content = content.replace(/border-champagne/g, 'border-amber-800/20');
content = content.replace(/bg-champagne\/10/g, 'bg-amber-50');
content = content.replace(/bg-champagne\/20/g, 'bg-amber-100');
content = content.replace(/bg-champagne\/15/g, 'bg-amber-50');

// Restore white/gold on dark backgrounds (emerald-950, slate-900, charcoal)
// Because replacing EVERYTHING globally broke the dark sections.
content = content.replace(/text-amber-800/g, 'text-stone-800'); // Actually, let's just make it stone-800 for maximum readability and neutrality.

fs.writeFileSync(filepath, content, 'utf8');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        filelist.push(dir + '/' + file);
      }
    }
  });
  return filelist;
};

let files = walkSync('frontend/src/components');
for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/text-champagne/g, 'text-stone-800');
  content = content.replace(/border-champagne/g, 'border-stone-800/20');
  content = content.replace(/bg-champagne\/10/g, 'bg-stone-100');
  content = content.replace(/bg-champagne\/20/g, 'bg-stone-200');
  fs.writeFileSync(file, content, 'utf8');
}

