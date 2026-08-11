const fs = require('fs');
let css = fs.readFileSync('frontend/src/index.css', 'utf8');

css = css.replace(/@layer base \{\s+:root \{[\s\S]*?\}\s*\}/m, `@layer base {
    :root {
        --champagne-gold: #D4AF37;
        --white: #FFFFFF;
        --ivory: #FFFFF0;
        --light-grey: #D3D3D3;
        --charcoal-grey: #36454F;

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
        --muted: var(--ivory);
        --muted-foreground: var(--light-grey);
        --accent: var(--champagne-gold);
        --accent-foreground: var(--charcoal-grey);
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: var(--light-grey);
        --input: var(--light-grey);
        --ring: var(--champagne-gold);
        --radius: 0.5rem;
    }
}`);
// Remove the dark class rule entirely since the instructions specified this EXACT five-color scheme.
css = css.replace(/\.dark\s*\{[\s\S]*?\}/m, '');

// Also remove .bg-forest-deep etc. since we mapped them directly or using update_colors
fs.writeFileSync('frontend/src/index.css', css, 'utf8');
