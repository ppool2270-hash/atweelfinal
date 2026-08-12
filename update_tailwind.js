const fs = require('fs');

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
        'tata-blue': 'var(--tata-blue)',
        'tata-light-blue': 'var(--tata-light-blue)',
        'tata-green': 'var(--tata-green)',
        'white': 'var(--white)',
        'tata-bg': 'var(--tata-bg)',
        'tata-light': 'var(--tata-light)',
        'tata-dark': 'var(--tata-dark)',
        
        background: 'var(--white)',
        foreground: 'var(--tata-dark)',
        card: {
          DEFAULT: 'var(--white)',
          foreground: 'var(--tata-dark)'
        },
        popover: {
          DEFAULT: 'var(--white)',
          foreground: 'var(--tata-dark)'
        },
        primary: {
          DEFAULT: 'var(--tata-blue)',
          foreground: 'var(--white)'
        },
        secondary: {
          DEFAULT: 'var(--tata-light)',
          foreground: 'var(--tata-dark)'
        },
        muted: {
          DEFAULT: 'var(--tata-bg)',
          foreground: 'var(--tata-light)'
        },
        accent: {
          DEFAULT: 'var(--tata-blue)',
          foreground: 'var(--white)'
        },
        border: 'var(--tata-light)',
        input: 'var(--tata-light)',
        ring: 'var(--tata-blue)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      spacing: {
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '30': '7.5rem',
        '32': '8rem',
        'section-sm': '5rem',
        'section-md': '6rem',
        'section-lg': '7.5rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 8s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
`;

fs.writeFileSync('frontend/tailwind.config.js', twConfig);
console.log('tailwind updated');
