/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: 'var(--color-saffron-50)',
          100: 'var(--color-saffron-100)',
          200: 'var(--color-saffron-200)',
          300: 'var(--color-saffron-300)',
          400: 'var(--color-saffron-400)',
          500: 'var(--color-saffron-500)',
          600: 'var(--color-saffron-600)',
          700: 'var(--color-saffron-700)',
          800: 'var(--color-saffron-800)',
          900: 'var(--color-saffron-900)',
        },
        earth: {
          50: 'var(--color-earth-50)',
          100: 'var(--color-earth-100)',
          200: 'var(--color-earth-200)',
          300: 'var(--color-earth-300)',
          400: 'var(--color-earth-400)',
          500: 'var(--color-earth-500)',
          600: 'var(--color-earth-600)',
          700: 'var(--color-earth-700)',
          800: 'var(--color-earth-800)',
          900: 'var(--color-earth-900)',
        },
        forest: {
          500: '#4a7c59',
          600: '#3d6849',
          700: '#2f5238',
        },
        gold: {
          400: '#f0b429',
          500: '#d99e1a',
          600: '#b8820d',
        },
        cream: 'var(--color-cream)',
        parchment: 'var(--color-parchment)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
        devanagari: ['"Tiro Devanagari Sanskrit"', 'serif'],
      },
      backgroundImage: {
        'radial-saffron': 'radial-gradient(ellipse at center, var(--mandala-saffron), transparent 70%)',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cc650f' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
      },
      boxShadow: {
        'warm': '0 4px 24px var(--color-earth-shadow)',
        'warm-lg': '0 10px 40px var(--color-earth-shadow-lg)',
        'saffron': '0 4px 24px var(--color-saffron-shadow)',
      },
    },
  },
  plugins: [],
};
