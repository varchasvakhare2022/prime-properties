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
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          border: '#2a2a2a',
        }
      },
      backgroundColor: {
        'dark-primary': '#0a0a0a',
      }
    },
  },
  plugins: [],
}

