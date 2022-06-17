/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: ["Poppins"],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
