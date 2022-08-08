/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  jit: true,
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: ['Poppins'],
      colors: {
        brand: {
          primary: colors.blue['500'],
          secondary: colors.blue['300'],
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
