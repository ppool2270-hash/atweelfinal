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
  newContent = newContent.replace(/bg-champagne text-white/g, 'bg-champagne text-charcoal');
  newContent = newContent.replace(/hover:bg-champagne hover:text-white/g, 'hover:bg-champagne hover:text-charcoal');
  newContent = newContent.replace(/text-white hover:bg-champagne/g, 'text-charcoal hover:bg-champagne');
  newContent = newContent.replace(/text-white(\s+)hover:text-champagne/g, 'text-charcoal$1hover:text-champagne');
  
  // also check for any low contrast cases
  newContent = newContent.replace(/text-ivory bg-champagne/g, 'text-charcoal bg-champagne');
  newContent = newContent.replace(/bg-champagne text-ivory/g, 'bg-champagne text-charcoal');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
  }
}
