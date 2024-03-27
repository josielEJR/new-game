/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '700': '700px', "6": "60px"
      },
      height: {
        '700': '700px', "6": "60px"
      },
    },
  },
  variants: {},
  plugins: [],
};

