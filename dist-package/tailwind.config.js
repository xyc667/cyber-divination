/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ancient-red': {
          DEFAULT: '#8B0000',
          50: '#fdf2f2',
          500: '#8B0000',
          900: '#5a0000',
        },
        'ancient-orange': '#D2691E',
        'ancient-gold': '#DAA520',
        'ancient-brown': '#5D4037',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'ancient-gradient': 'linear-gradient(135deg, #8B0000 0%, #D2691E 50%, #DAA520 100%)',
      },
    },
  },
  plugins: [],
};