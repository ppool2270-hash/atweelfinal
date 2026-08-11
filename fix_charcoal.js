const fs = require('fs');
let css = fs.readFileSync('frontend/src/index.css', 'utf8');

css = css.replace(/--charcoal-grey: #36454F;/g, '--charcoal-grey: #333333;');

fs.writeFileSync('frontend/src/index.css', css, 'utf8');

// replace text-white inside bg-champagne elements to text-charcoal
let files = fs.readdirSync('frontend/src/components');
files.push('../App.js');
for (let file of files) {
  let filepath = file.startsWith('.') ? 'frontend/src/' + file.substring(3) : 'frontend/src/components/' + file;
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    content = content.replace(/bg-champagne text-white/g, 'bg-champagne text-charcoal');
    content = content.replace(/hover:bg-champagne hover:text-white/g, 'hover:bg-champagne hover:text-charcoal');
    content = content.replace(/text-white hover:bg-champagne/g, 'text-charcoal hover:bg-champagne');
    content = content.replace(/text-white(\s+)hover:text-champagne/g, 'text-charcoal$1hover:text-champagne');
    fs.writeFileSync(filepath, content, 'utf8');
  }
}
