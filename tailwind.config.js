/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a4bbfd',
          400: '#7c97fa',
          500: '#5b72f5',
          600: '#4150ea',
          700: '#3540d6',
          800: '#2d36ad',
          900: '#2a3388',
          950: '#1c2053',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}