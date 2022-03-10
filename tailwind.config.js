const forms = require('@tailwindcss/forms');
const ratio = require('@tailwindcss/aspect-ratio');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [forms, ratio],
};
