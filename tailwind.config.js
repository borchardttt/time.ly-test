/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primaryTimely: '#8dc360',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
