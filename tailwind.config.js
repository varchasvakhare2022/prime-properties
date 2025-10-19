/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d4af37', // Luxurious gold
        secondary: '#c4941f', // Rich amber
        accent: '#8b7355', // Warm bronze
        gold: {
          50: '#fdf8e8',
          100: '#faedc4',
          200: '#f6e09c',
          300: '#f2d374',
          400: '#eec856',
          500: '#d4af37', // Primary gold
          600: '#c4941f',
          700: '#9d7619',
          800: '#765914',
          900: '#4f3c0d',
        },
        dark: {
          bg: '#000000',
          surface: '#0f0f0f',
          card: '#1a1a1a',
          border: '#2a2a2a',
          lighter: '#242424',
        }
      },
      backgroundColor: {
        'dark-primary': '#000000',
      },
      boxShadow: {
        'gold-sm': '0 2px 8px rgba(212, 175, 55, 0.2)',
        'gold-md': '0 4px 16px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 8px 32px rgba(212, 175, 55, 0.4)',
        'gold-xl': '0 16px 48px rgba(212, 175, 55, 0.5)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
}

