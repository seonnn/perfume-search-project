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
      height: {
        125: '31.25rem',
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
      colors: {
        beige: {
          400: '#C8BDBA',
          500: '#B0A6A4',
        },

        green: {
          naver: '#03C75A',
        },
      },
      screens: {
        xs: '481px',
      },
    },
  },
  plugins: [],
};
