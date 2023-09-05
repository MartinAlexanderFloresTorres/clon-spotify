/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          gray: '#101010',
          lightgray: '#1d1d1d',
          lightgrayHover: '#282828'
        }
      }
    }
  },
  plugins: []
}
