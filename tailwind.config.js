/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      borderWidth: {
        0.5: '0.5px',
      },
      screens: {
        '3xl': '1800px',
      },
      colors: {
        'gray-bg': '#F3F5FF',
        'gray-bg2': '#F8FAFD',
        'primary-text': '#000000',
        'secondary-text': '#606885',
        'primary-green': '#3BDC96',
        'primary-gray': '#ACB1C1',
        'primary-blue': '#3052FF',
        // dark theme Colors
        'gray-bg-dark': '#181A21',
        'gray-bg2-dark': '#262934',
        'primary-text-dark': '#ffffff',
        'secondary-text-dark': '#888EA3',
      },

      backgroundImage: {
        'login-bg': "url('/images/loginBg.png')",
        'qr-scan-icon': "url('/images/qrScanIcon.png')",
      },
      boxShadow: {
        'shadow-primary': '0px 4px 80px rgba(0, 0, 0, 0.06)',
        'shadow-secondary': '1px 0px 4px rgba(0, 0, 0, 0.08)',
        'shadow-tertiary': '0px 0px 4px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [],
}
