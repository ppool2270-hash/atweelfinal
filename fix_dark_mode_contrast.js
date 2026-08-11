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
  
  // Fix the broken double-slashes from border-amber-800/20/50 etc.
  content = content.replace(/border-[a-z]+-800\/20\/[0-9]+/g, 'border-white/20');
  
  // Fix dark-on-dark contrast: bg-charcoal text-stone-800 -> bg-charcoal text-amber-100
  content = content.replace(/bg-charcoal text-stone-800/g, 'bg-charcoal text-amber-50');
  content = content.replace(/bg-charcoal hover:bg-charcoal text-stone-800/g, 'bg-charcoal hover:bg-charcoal text-amber-50');
  content = content.replace(/bg-charcoal\/80 text-stone-800/g, 'bg-charcoal/80 text-amber-50');
  content = content.replace(/bg-charcoal\/80 hover:bg-charcoal text-stone-800/g, 'bg-charcoal/80 hover:bg-charcoal text-amber-50');
  content = content.replace(/bg-charcoal\/80 backdrop-blur-[a-z]+ px-3 py-1 rounded-[a-z]+ text-\[10px\] (uppercase )?font-[a-z]+ text-stone-800/g, (match) => {
      return match.replace('text-stone-800', 'text-amber-50');
  });

  fs.writeFileSync(file, content, 'utf8');
}
