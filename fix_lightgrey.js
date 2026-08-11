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
  
  // fix bg-lightgrey text-lightgrey to bg-lightgrey text-charcoal
  newContent = newContent.replace(/bg-lightgrey text-lightgrey/g, 'bg-lightgrey text-charcoal');
  // fix text-lightgrey bg-lightgrey to bg-lightgrey text-charcoal
  newContent = newContent.replace(/text-lightgrey bg-lightgrey/g, 'bg-lightgrey text-charcoal');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
  }
}
