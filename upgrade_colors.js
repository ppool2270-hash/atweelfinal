const fs = require('fs');

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
files.push('frontend/src/App.js');

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // 1. Base Text & Borders
  newContent = newContent.replace(/text-lightgrey/g, 'text-stone-600');
  newContent = newContent.replace(/border-lightgrey/g, 'border-stone-300');
  newContent = newContent.replace(/bg-lightgrey/g, 'bg-stone-100');
  newContent = newContent.replace(/bg-ivory\/60/g, 'bg-stone-50');
  
  newContent = newContent.replace(/text-charcoal\/80/g, 'text-stone-700');
  newContent = newContent.replace(/text-charcoal\/70/g, 'text-stone-600');
  newContent = newContent.replace(/text-charcoal\/40/g, 'text-stone-400');
  
  // 2. Specific Semantic Re-injections
  
  // A. Destructive / Red actions (Out of Stock, Delete)
  newContent = newContent.replace(/bg-charcoal text-ivory border-charcoal/g, 'bg-red-50 text-red-700 border-red-200');
  newContent = newContent.replace(/hover:bg-charcoal\/80/g, 'hover:bg-stone-800'); // General hover fix for buttons
  newContent = newContent.replace(/bg-red-50 text-red-700 border-red-200 hover:bg-stone-800/g, 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'); 
  
  // The 'Out of Stock' specific span
  newContent = newContent.replace(/bg-charcoal text-white border-charcoal/g, 'bg-red-600 text-white border-red-700');

  // B. Success / Emerald actions (Organic, Verified, In Stock)
  // Let's replace India Organic and USDA Organic badges
  newContent = newContent.replace(/USDA Organic<\/button>/g, 'USDA Organic</button>'); // Noop, but we'll manually fix the cert ribbons
  
  // C. Dark theme panels -> Emerald-950 instead of Charcoal
  newContent = newContent.replace(/bg-charcoal rounded-3xl p-8 sm:p-12 text-white/g, 'bg-emerald-950 rounded-3xl p-8 sm:p-12 text-white');
  newContent = newContent.replace(/bg-charcoal border-2 border-champagne rounded-3xl/g, 'bg-emerald-950 border-2 border-emerald-800/50 rounded-3xl');

  // D. Information / Logistics -> Sky
  newContent = newContent.replace(/bg-gradient-to-br from-charcoal via-charcoal to-charcoal/g, 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900');
  
  // Write back
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
  }
}
