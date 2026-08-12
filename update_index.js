const fs = require('fs');

let css = fs.readFileSync('frontend/src/index.css', 'utf8');
css = css.replace(/--champagne-gold: #D8C3A5;[^\n]*\n/g, '--tata-blue: #174195;\n');
css = css.replace(/--champagne-gold-dark: #B89C72;[^\n]*\n/g, '--tata-light-blue: #1468b3;\n    --tata-green: #92dd43;\n');
css = css.replace(/--ivory: #F9F8F6;\n/g, '--tata-bg: #f2f2f2;\n');
css = css.replace(/--light-grey: #757575;\n/g, '--tata-light: #e1e1e1;\n');
css = css.replace(/--charcoal-grey: #242526;[^\n]*\n/g, '--tata-dark: #231f20;\n');
css = css.replace(/var\(--champagne-gold\)/g, 'var(--tata-blue)');
css = css.replace(/var\(--ivory\)/g, 'var(--tata-bg)');
css = css.replace(/var\(--charcoal-grey\)/g, 'var(--tata-dark)');
css = css.replace(/var\(--light-grey\)/g, 'var(--tata-light)');
css = css.replace(/bg-champagne/g, 'bg-tata-blue');
css = css.replace(/bg-charcoal/g, 'bg-tata-dark');

// update the cursor SVGs to use Tata Blue instead of Gold
css = css.replace(/%23D4AF37/g, '%23174195');
css = css.replace(/%230F2B1D/g, '%231468B3');

fs.writeFileSync('frontend/src/index.css', css);
console.log('index.css updated');
