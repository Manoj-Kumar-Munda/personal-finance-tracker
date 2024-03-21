/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": '#6C63FF'

      },
      fontFamily:{
        "Poppins": ["Poppins", "sans-serif"],
        "Maven-Pro": ["Maven Pro", "sans-serif"]
      }
    },
  },
  plugins: [],
}

