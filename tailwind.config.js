/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: ['./src/**/*.tsx', './src/App.tsx'],
  theme: {
    extend: {
      fontFamily: ['Poppins'],
      colors: {
        brand: {
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        },
      },
    },
  },
  important: true,
};
