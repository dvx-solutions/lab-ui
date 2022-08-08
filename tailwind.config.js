/** @type {import('tailwindcss').Config} */

module.exports = {
  jit: true,
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: ['Poppins'],
      colors: {
        'brand-primary': 'inherit',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
