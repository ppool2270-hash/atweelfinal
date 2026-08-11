const fs = require('fs');
let css = fs.readFileSync('frontend/src/index.css', 'utf8');

css = css.replace(/#F4F7F5/gi, 'var(--ivory)');
css = css.replace(/#1C2320/gi, 'var(--charcoal-grey)');
css = css.replace(/#0F2B1D/gi, 'var(--charcoal-grey)');
css = css.replace(/#FBF9F6/gi, 'var(--ivory)');
css = css.replace(/#D4AF37/gi, 'var(--champagne-gold)');
css = css.replace(/rgba\(197, 168, 128, 0\.2\)/g, 'var(--light-grey)');
css = css.replace(/#ffffff/gi, 'var(--white)');
css = css.replace(/#0F172A/gi, 'var(--charcoal-grey)');
css = css.replace(/#9A7B2C/gi, 'var(--champagne-gold)');
css = css.replace(/#1e293b/gi, 'var(--charcoal-grey)');
css = css.replace(/#FDF9EE/gi, 'var(--ivory)');
css = css.replace(/var\(--cursor-luxury.*?\)/g, 'pointer');

fs.writeFileSync('frontend/src/index.css', css, 'utf8');

// Now we need to fix any remaining issues in App.js or other files where I messed up the backslashes
let files = fs.readdirSync('frontend/src/components');
for (let file of files) {
  if (file.endsWith('.js')) {
    let content = fs.readFileSync('frontend/src/components/' + file, 'utf8');
    
    // Replace standard hardcoded class patterns
    content = content.replace(/text-slate-300/g, 'text-lightgrey');
    content = content.replace(/text-white\/90/g, 'text-ivory');
    content = content.replace(/bg-black\/80/g, 'bg-charcoal');
    
    fs.writeFileSync('frontend/src/components/' + file, content, 'utf8');
  }
}
