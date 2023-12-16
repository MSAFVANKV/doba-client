/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily:{
        comforter:['Comforter Brush', 'cursive'],
        comforter2:['Edu TAS Beginner', 'cursive']
      },
      colors:{
        "dark-purple":"#081a51",
        "light-white":"rgba(255,255,255,0.17)"
      }
    },
  },
  plugins: [
    require('tailwindcss-no-scrollbar'),
    require('tailwind-scrollbar'),
  ],
}