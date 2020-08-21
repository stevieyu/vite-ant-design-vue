module.exports = {
  purge:{
    enabled: true,
    content: [
      './views/**/*.vue',
      './components/**/*.vue',
    ]
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
}
