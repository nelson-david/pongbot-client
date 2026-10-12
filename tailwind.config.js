/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f2f7f3',
          100: '#e1ede4',
          200: '#c5dbc9',
          300: '#9ec0a4',
          400: '#739e7b',
          500: '#4A7C59', // Primary Light Accent
          600: '#3c6447',
          700: '#31513a',
          800: '#2a4231',
          900: '#233729',
          light: '#4A7C59',
          dark: '#50A168',
        },
        brand: {
          dark: '#0d0d0d',
          surface: '#141414',
          panel: '#1a1a1a',
          border: '#2a2a2a',
          lightBg: '#f8f9fa',
          lightSurface: '#ffffff',
          lightPanel: '#f1f3f5',
          lightBorder: '#e0e0e0',
        }
      },
      fontFamily: {
        mono: ['DM Mono', 'Space Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
