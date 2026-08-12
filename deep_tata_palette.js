const fs = require('fs');
const path = require('path');

// 1. Update tailwind.config.js
const twConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'tata-blue': {
          dark: 'var(--tata-blue-dark)',
          light: 'var(--tata-blue-light)',
        },
        'tata-cyan': 'var(--tata-cyan)',
        'tata-green': 'var(--tata-green)',
        'tata-dark': 'var(--tata-dark)',
        'tata-grey': {
          DEFAULT: 'var(--tata-grey)',
          light: 'var(--tata-grey-light)'
        },
        'tata-bg': {
          light: 'var(--tata-bg-light)',
          lighter: 'var(--tata-bg-lighter)'
        },
        'white': '#ffffff',
        'black': '#000000',
        
        background: 'var(--tata-bg-lighter)',
        foreground: 'var(--tata-dark)',
        card: {
          DEFAULT: '#ffffff',
          foreground: 'var(--tata-dark)'
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: 'var(--tata-dark)'
        },
        primary: {
          DEFAULT: 'var(--tata-blue-dark)',
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: 'var(--tata-bg-light)',
          foreground: 'var(--tata-dark)'
        },
        muted: {
          DEFAULT: 'var(--tata-bg-light)',
          foreground: 'var(--tata-grey)'
        },
        accent: {
          DEFAULT: 'var(--tata-blue-light)',
          foreground: '#ffffff'
        },
        border: 'var(--tata-grey-light)',
        input: 'var(--tata-grey-light)',
        ring: 'var(--tata-blue-light)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      spacing: {
        '20': '5rem', '24': '6rem', '28': '7rem', '30': '7.5rem', '32': '8rem',
        'section-sm': '5rem', 'section-md': '6rem', 'section-lg': '7.5rem',
      },
      borderRadius: {
        lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'float': { '0%, 100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-15px) rotate(3deg)' } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 8s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};`;
fs.writeFileSync('frontend/tailwind.config.js', twConfig);

// 2. Update index.css variables
let css = fs.readFileSync('frontend/src/index.css', 'utf8');

css = css.replace(/--tata-blue:[^;]*;/g, '--tata-blue-dark: #174195;');
css = css.replace(/--tata-light-blue:[^;]*;/g, '--tata-blue-light: #1468b3;');
css = css.replace(/--tata-bg:[^;]*;/g, '--tata-bg-light: #f2f2f2;\n    --tata-bg-lighter: #fafafa;');
css = css.replace(/--tata-light:[^;]*;/g, '--tata-grey-light: #e1e1e1;\n    --tata-grey: #6e6e6e;\n    --tata-cyan: #007fad;');

// Update var usages in css
css = css.replace(/var\(--tata-light-blue\)/g, "var(--tata-blue-light)");
css = css.replace(/var\(--tata-blue\)/g, "var(--tata-blue-dark)");
css = css.replace(/var\(--tata-bg\)/g, "var(--tata-bg-light)");
css = css.replace(/var\(--tata-light\)/g, "var(--tata-grey-light)");

// Update direct class references in css
css = css.replace(/\.bg-tata-blue\b/g, ".bg-tata-blue-dark");
css = css.replace(/\.bg-tata-dark\b/g, ".bg-tata-dark");
css = css.replace(/\.text-champagne\b/g, ".text-tata-blue-dark");
css = css.replace(/\.border-champagne\b/g, ".border-tata-blue-dark");
css = css.replace(/\.bg-ivory\b/g, ".bg-tata-bg-light");
css = css.replace(/\.text-ivory\b/g, ".text-tata-bg-light");

fs.writeFileSync('frontend/src/index.css', css);


// 3. Deep JS Replacement
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        if (fs.statSync(file).isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('frontend/src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // First, isolate exact matches for existing intermediate classes
    content = content.replace(/\btata-light-blue\b/g, "TATA_LBLUE");
    content = content.replace(/\btata-blue\b/g, "TATA_BLUE");
    content = content.replace(/\btata-bg\b/g, "TATA_BG");
    content = content.replace(/\btata-light\b/g, "TATA_LIGHT");

    // Then replace with final proper structural names
    content = content.replace(/TATA_LBLUE/g, "tata-blue-light");
    content = content.replace(/TATA_BLUE/g, "tata-blue-dark");
    content = content.replace(/TATA_BG/g, "tata-bg-light");
    content = content.replace(/TATA_LIGHT/g, "tata-grey-light");
    
    // Eradicate all `stone`, `amber`, `gray` placeholders still remaining
    content = content.replace(/\bstone-900\b/g, "tata-dark");
    content = content.replace(/\bstone-800\b/g, "tata-dark");
    content = content.replace(/\bstone-700\b/g, "tata-grey");
    content = content.replace(/\bstone-600\b/g, "tata-grey");
    content = content.replace(/\bstone-500\b/g, "tata-grey");
    content = content.replace(/\bstone-400\b/g, "tata-grey-light");
    content = content.replace(/\bstone-300\b/g, "tata-grey-light");
    content = content.replace(/\bstone-200\b/g, "tata-grey-light");
    content = content.replace(/\bstone-100\b/g, "tata-bg-light");
    content = content.replace(/\bstone-50\b/g, "tata-bg-lighter");
    
    content = content.replace(/\bamber-[0-9]+\/20\b/g, "tata-blue-light/20");
    content = content.replace(/\bamber-[0-9]+\b/g, "tata-blue-light");

    // Ensure white text stays on tata-blue-dark bg
    content = content.replace(/text-tata-dark bg-tata-blue-dark/g, "text-white bg-tata-blue-dark");
    content = content.replace(/bg-tata-blue-dark text-tata-dark/g, "bg-tata-blue-dark text-white");

    fs.writeFileSync(file, content);
});

console.log('Deep Tata palette applied!');
