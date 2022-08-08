/** @type {import('tailwindcss').Config} */

module.exports = {
  jit: true,
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: ['Poppins'],
      colors: {
        brand: {
          primary: 'inherit',
          secondary: 'inherit',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
