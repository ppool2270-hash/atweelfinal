const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.html')) {
        filelist.push(dir + '/' + file);
      }
    }
  });
  return filelist;
};

const colorMap = {
  // Champagne Gold
  '\\[#D4AF37\\]': 'champagne',
  '\\[#E5C158\\]': 'champagne',
  '\\[#C5A233\\]': 'champagne',
  '\\[#B89428\\]': 'champagne',
  '\\[#9A7B2C\\]': 'champagne',
  '\\[#C5A880\\]': 'champagne',
  '\\[#C59B27\\]': 'champagne',
  '\\[#F4EEDD\\]': 'champagne',
  'gold-champagne': 'champagne',
  'gold-veil': 'champagne/20',

  // White / Ivory
  '\\[#FFFFFF\\]': 'white',
  '\\[#FBF9F6\\]': 'ivory',
  '\\[#FDFBF7\\]': 'ivory',
  '\\[#FDF9EE\\]': 'ivory',
  '\\[#F4F7F5\\]': 'ivory',
  '\\[#FFFDF7\\]': 'ivory',
  'alabaster': 'ivory',
  'mint-cream': 'ivory',
  '\\[#E8EFEB\\]': 'ivory',

  // Charcoal Grey
  '\\[#0F2B1D\\]': 'charcoal',
  '\\[#1A3A2B\\]': 'charcoal',
  '\\[#091C13\\]': 'charcoal',
  '\\[#0F291E\\]': 'charcoal',
  '\\[#0F241A\\]': 'charcoal',
  '\\[#08170F\\]': 'charcoal',
  '\\[#132C20\\]': 'charcoal',
  '\\[#0F172A\\]': 'charcoal',
  '\\[#1C2320\\]': 'charcoal',
  '\\[#0B2117\\]': 'charcoal',
  '\\[#1E293B\\]': 'charcoal',
  '\\[#0B192C\\]': 'charcoal',
  '\\[#0C2A4A\\]': 'charcoal',
  '\\[#1A4D33\\]': 'charcoal',
  '\\[#264D3E\\]': 'charcoal',
  '\\[#153e2a\\]': 'charcoal',
  '\\[#244E3A\\]': 'charcoal',
  '\\[#2A0C4A\\]': 'charcoal',
  '\\[#2A200B\\]': 'charcoal',
  '\\[#0B1E14\\]': 'charcoal',
  'forest-deep': 'charcoal',
  'charcoal-deep': 'charcoal',
  'slate-900': 'charcoal',
  'slate-800': 'charcoal',
  'slate-700': 'charcoal',
  'sky-950': 'charcoal',
  'purple-950': 'charcoal',
  'emerald-950': 'charcoal',
  'blue-950': 'charcoal',
  'amber-950': 'charcoal',
  'sky-900': 'charcoal',
  'purple-900': 'charcoal',
  'emerald-900': 'charcoal',

  // Light Grey
  'slate-500': 'lightgrey',
  'slate-400': 'lightgrey',
  'slate-300': 'lightgrey',
  'slate-200': 'lightgrey',
  'slate-100': 'lightgrey',
  'slate-50': 'lightgrey',
  'emerald-800': 'lightgrey',
  'emerald-700': 'lightgrey',
  'emerald-600': 'lightgrey',
  'emerald-500': 'lightgrey',
  'emerald-400': 'lightgrey',
  'emerald-300': 'lightgrey',
  'emerald-200': 'lightgrey',
  'emerald-100': 'lightgrey',
  'emerald-50': 'lightgrey',
  'sky-800': 'lightgrey',
  'sky-700': 'lightgrey',
  'sky-500': 'lightgrey',
  'sky-400': 'lightgrey',
  'sky-300': 'lightgrey',
  'sky-200': 'lightgrey',
  'sky-100': 'lightgrey',
  'sky-50': 'lightgrey',
  'purple-800': 'lightgrey',
  'purple-600': 'lightgrey',
  'purple-500': 'lightgrey',
  'purple-300': 'lightgrey',
  'purple-200': 'lightgrey',
  'purple-100': 'lightgrey',
  'purple-50': 'lightgrey',
  'amber-800': 'lightgrey',
  'amber-700': 'lightgrey',
  'amber-600': 'lightgrey',
  'amber-300': 'lightgrey',
  'amber-200': 'lightgrey',
  'amber-100': 'lightgrey',
  'amber-50': 'lightgrey',
  'blue-600': 'lightgrey',
  '\\[#60A5FA\\]': 'lightgrey',
  '\\[#38BDF8\\]': 'lightgrey',
  '\\[#C084FC\\]': 'lightgrey',
};

const prefixes = ['text', 'bg', 'border', 'from', 'via', 'to', 'fill', 'stroke'];

let files = walkSync('./frontend/src');
files.push('./frontend/public/index.html');
files.push('./frontend/index.html');

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Manual fixes for custom classes
  content = content.replace(/bg-forest-deep/g, 'bg-charcoal');
  content = content.replace(/bg-mint-cream/g, 'bg-ivory');
  content = content.replace(/text-alabaster/g, 'text-ivory');
  content = content.replace(/text-charcoal-deep/g, 'text-charcoal');
  content = content.replace(/text-gold-champagne/g, 'text-champagne');
  content = content.replace(/border-gold-champagne/g, 'border-champagne');
  content = content.replace(/border-gold-veil/g, 'border-lightgrey');

  for (let [oldColor, newColor] of Object.entries(colorMap)) {
    for (let prefix of prefixes) {
      let regex = new RegExp(prefix + '-' + oldColor, 'g');
      content = content.replace(regex, prefix + '-' + newColor);
    }
  }

  // Also replace direct hex values in html style attributes
  for (let [oldColor, newColor] of Object.entries(colorMap)) {
    let rawOld = oldColor.replace(/\\[/g, '').replace(/\\]/g, ''); // e.g. #D4AF37
    if (rawOld.startsWith('#')) {
      let cssVar = `var(--${newColor.split('/')[0] === 'champagne' ? 'champagne-gold' : newColor.split('/')[0] === 'charcoal' ? 'charcoal-grey' : newColor.split('/')[0] === 'lightgrey' ? 'light-grey' : newColor})`;
      let regex = new RegExp(rawOld, 'gi');
      content = content.replace(regex, cssVar);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
}
