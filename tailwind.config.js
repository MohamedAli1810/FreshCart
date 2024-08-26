/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    colors:{
      redColor:'#A4161A',
      greenColor:'#22B600',
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}