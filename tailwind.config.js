/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
        }
      },
      backgroundColor: {
        'dark-primary': '#0f172a',
      }
    },
  },
  plugins: [],
}

