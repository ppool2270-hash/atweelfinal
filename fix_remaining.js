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
  
  // Look for className="..." and if it contains bg-charcoal AND text-stone-800, replace text-stone-800 with text-amber-50
  // OR just hover:text-stone-800 -> hover:text-amber-50 if it has hover:bg-charcoal
  content = content.replace(/hover:bg-charcoal hover:text-stone-800/g, 'hover:bg-charcoal hover:text-amber-50');
  content = content.replace(/bg-charcoal border border-white\/20 text-stone-800/g, 'bg-charcoal border border-white/20 text-amber-50');
  content = content.replace(/bg-charcoal border border-stone-800\/20 flex items-center justify-center text-stone-800/g, 'bg-charcoal border border-stone-800/20 flex items-center justify-center text-amber-50');

  fs.writeFileSync(file, content, 'utf8');
}
