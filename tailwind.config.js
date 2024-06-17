/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#121118',
        bgDark2: '#1C1B22',
        color:'#02ff9a'
      },
    },
  },
  plugins: [],
}