/** @type {import('tailwindcss').Config} */
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
};