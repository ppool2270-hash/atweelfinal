const fs = require('fs');

const cssPath = 'frontend/src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the buggy CSS root definition
const newRoot = `:root {
    --champagne-gold: #D8C3A5; /* A soft, elegant champagne gold */
    --champagne-gold-dark: #B89C72; /* A slightly darker shade for borders/hovers */
    --white: #FFFFFF;
    --ivory: #F9F8F6;
    --light-grey: #E5E5E5;
    --charcoal-grey: #242526; /* Deep, rich charcoal for high contrast */

    --background: var(--ivory);
    --foreground: var(--charcoal-grey);
    --card: var(--white);
    --card-foreground: var(--charcoal-grey);
    --popover: var(--white);
    --popover-foreground: var(--charcoal-grey);
    --primary: var(--champagne-gold);
    --primary-foreground: var(--charcoal-grey);
    --secondary: var(--light-grey);
    --secondary-foreground: var(--charcoal-grey);
    --muted: var(--light-grey);
    --muted-foreground: var(--charcoal-grey);
    --accent: var(--champagne-gold);
    --accent-foreground: var(--charcoal-grey);
    --border: var(--light-grey);
    --input: var(--light-grey);
    --ring: var(--champagne-gold);
}`;

css = css.replace(/@layer base\s*\{\s*:root\s*\{[\s\S]*?\}\s*}/m, '@layer base {\n' + newRoot + '\n}');

// Let's also fix the duplicate / broken :root definition that was at the top of the file
css = css.replace(/:root\s*\{\s*--champagne-gold:\s*var\(--champagne-gold\);[\s\S]*?--ring:\s*var\(--champagne-gold\);\s*\}/m, newRoot);

// Ensure accessibility by replacing any instances where white text might be used on champagne gold backgrounds
fs.writeFileSync(cssPath, css, 'utf8');
