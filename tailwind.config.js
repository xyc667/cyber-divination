/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        cyber: {
          dark: '#0d0d1a',
          darker: '#0a0a12',
          purple: '#1a0a2e',
          cyan: '#00fff5',
          pink: '#ff00ff',
          gold: '#ffd700',
          blue: '#00b4d8',
        },
        ancient: {
          paper: '#f5ebdc',
          bg: '#2c1810',
          dark: '#1a0f0a',
          gold: '#b8860b',
          red: '#8b0000',
          orange: '#cd853f',
          brown: '#5d4037',
          gray: '#6b5b4f',
          purple: '#6b4423',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0, 255, 245, 0.3)',
        'cyber-pink': '0 0 20px rgba(255, 0, 255, 0.3)',
      },
    },
  },
  plugins: [],
};