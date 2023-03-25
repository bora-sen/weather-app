/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors:{
        "natural-black":"#0a080f",
        "natural-white":"#fdfdfd",
        "primary-accent":"#1c1aff",
        "primary-accent-darker":"#1010a7",
        "primary-accent-darkest":"#080960"
      },
      backgroundImage:{
        "main":"url(https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHdlYXRoZXJ8ZW58MHx8MHx8&w=1920&q=80)"
      }
    },
  },
  plugins: [],
}
