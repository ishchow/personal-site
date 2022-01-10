const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.njk',
  ],
  theme: {
      colors: {
        gray: colors.neutral,
        blue: colors.blue,
      }
  },
  plugins: [],
}
