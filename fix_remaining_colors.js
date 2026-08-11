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

  // Replace reds (typically errors, out of stock, danger) with charcoal or champagne
  // For errors, maybe use charcoal with a specific style, but we must stick to the palette
  newContent = newContent.replace(/bg-red-[0-9]{2,3}/g, 'bg-charcoal text-ivory');
  newContent = newContent.replace(/text-red-[0-9]{2,3}/g, 'text-charcoal');
  newContent = newContent.replace(/border-red-[0-9]{2,3}/g, 'border-charcoal');
  newContent = newContent.replace(/hover:bg-red-[0-9]{2,3}/g, 'hover:bg-charcoal/80');

  // Replace slates (secondary text)
  newContent = newContent.replace(/text-slate-[0-9]{2,3}/g, 'text-lightgrey');
  newContent = newContent.replace(/bg-slate-[0-9]{2,3}/g, 'bg-lightgrey');
  newContent = newContent.replace(/border-slate-[0-9]{2,3}/g, 'border-lightgrey');

  // Replace any other colored tailwind classes to maintain the 5-color strictness
  const colors = ['emerald', 'sky', 'purple', 'amber', 'blue', 'green', 'yellow', 'indigo', 'pink', 'rose', 'fuchsia', 'cyan', 'teal', 'lime', 'orange'];
  for (let c of colors) {
    let regex = new RegExp(`(bg|text|border|from|via|to|hover:bg|hover:text|hover:border)-${c}-[0-9]{2,3}`, 'g');
    newContent = newContent.replace(regex, (match, prefix) => {
      if (prefix.includes('bg')) return prefix + '-lightgrey';
      if (prefix.includes('border')) return prefix + '-lightgrey';
      return prefix + '-charcoal';
    });
  }

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
  }
}

// Now let's update index.css to make Light Grey slightly darker so it's readable as text (Accessibility)
const cssPath = 'frontend/src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');
// Let's change light grey from E5E5E5 to something with at least 4.5:1 against Ivory (F9F8F6)
// A grey with 4.5:1 against F9F8F6 is #757575
css = css.replace(/--light-grey: #E5E5E5;/g, '--light-grey: #757575;');
fs.writeFileSync(cssPath, css, 'utf8');

