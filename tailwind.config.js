const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.njk',
  ],
  theme: {
      colors: {
        gray: colors.trueGray,
        blue: colors.blue,
      }
  },
  variants: {},
  plugins: [],
}
