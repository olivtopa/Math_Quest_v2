/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#030712',
          glass: 'rgba(15, 23, 42, 0.75)',
        }
      }
    },
  },
  plugins: [],
};
