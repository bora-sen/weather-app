/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "natural-black": "#0a080f",
        "natural-white": "#fdfdfd",
        "primary-accent": "#1c1aff",
        "primary-accent-darker": "#1010a7",
        "primary-accent-darkest": "#080960",
      },
      backgroundImage: {
        "main-light": "url(/media/bg-light.jpg)",
        "main-dark": "url(/media/bg-dark.jpg)",
      },
    },
  },
  plugins: [],
}
