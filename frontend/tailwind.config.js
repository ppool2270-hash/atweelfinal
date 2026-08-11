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
        champagne: 'var(--champagne-gold)',
        white: 'var(--white)',
        ivory: 'var(--ivory)',
        lightgrey: 'var(--light-grey)',
        charcoal: 'var(--charcoal-grey)',
        
        background: 'var(--white)',
        foreground: 'var(--charcoal-grey)',
        card: {
          DEFAULT: 'var(--white)',
          foreground: 'var(--charcoal-grey)'
        },
        popover: {
          DEFAULT: 'var(--white)',
          foreground: 'var(--charcoal-grey)'
        },
        primary: {
          DEFAULT: 'var(--champagne-gold)',
          foreground: 'var(--charcoal-grey)'
        },
        secondary: {
          DEFAULT: 'var(--light-grey)',
          foreground: 'var(--charcoal-grey)'
        },
        muted: {
          DEFAULT: 'var(--ivory)',
          foreground: 'var(--light-grey)'
        },
        accent: {
          DEFAULT: 'var(--champagne-gold)',
          foreground: 'var(--charcoal-grey)'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'var(--light-grey)',
        input: 'var(--light-grey)',
        ring: 'var(--champagne-gold)',
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
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
