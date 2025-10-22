/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'maginf-orange': '#e35300',
        'maginf-orange-light': '#ff6b1a',
        'maginf-orange-dark': '#b84200',
        'maginf-gray': '#2C3E50',
        'maginf-gray-light': '#34495E',
        'maginf-gray-dark': '#1A252F'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
