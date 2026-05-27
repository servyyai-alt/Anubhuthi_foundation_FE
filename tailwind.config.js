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
          50: '#fff8f0',
          100: '#fef0d9',
          200: '#fcdda5',
          300: '#f9c46b',
          400: '#f5a030',
          500: '#e8821a',
          600: '#cc650f',
          700: '#a84c0e',
          800: '#883d13',
          900: '#703414',
        },
        earth: {
          50: '#faf8f5',
          100: '#f2ede3',
          200: '#e3d7c3',
          300: '#d0bb9a',
          400: '#ba9a72',
          500: '#a67d54',
          600: '#8B5E3C',
          700: '#724a2f',
          800: '#5e3d28',
          900: '#4e3324',
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
        cream: '#faf8f0',
        parchment: '#f5efe0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
        devanagari: ['"Tiro Devanagari Sanskrit"', 'serif'],
      },
      backgroundImage: {
        'radial-saffron': 'radial-gradient(ellipse at center, #f9c46b22, transparent 70%)',
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
        'warm': '0 4px 24px rgba(139, 94, 60, 0.15)',
        'warm-lg': '0 10px 40px rgba(139, 94, 60, 0.2)',
        'saffron': '0 4px 24px rgba(232, 130, 26, 0.25)',
      },
    },
  },
  plugins: [],
};
