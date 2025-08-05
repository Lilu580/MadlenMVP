/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ligth100": "#FFF",
        "primary-gray": "#495057",
        "border-input": "#CED4DA",
        "placeholder-gray": "#868E96"
      }
    },
  },
  plugins: [],
};
