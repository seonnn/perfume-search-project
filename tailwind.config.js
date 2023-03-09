/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-kr)'],
      },
      width: {
        69: '17.25rem',
      },
      padding: {
        22.5: '5.625rem',
      },
      margin: {
        '-1': '-1px',
        22.5: '5.625rem',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
