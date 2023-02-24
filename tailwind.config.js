/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1800px",
      },
      colors: {
        "primary-blue": "#3052FF",
        "gray-bg": "#F3F5FF",
        "primary-text": "#000000",
        "secondary-text": "#606885",
        "primary-green": "#3BDC96",
        "primary-gray": "#ACB1C1",
      },
      boxShadow: {
        'shadow-primary': '0px 4px 80px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
