module.exports = {
  "plugins": {
    'postcss-preset-env': {},
    // 'postcss-aspect-ratio-mini': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      viewportHeight: 1368,
			unitPrecision: 6,
			mediaQuery: true,
      // exclude: [/node_modules/i],
      selectorBlackList: ['.ignore', '.hairlines', /\.van-loading__text/, /\.van-(?!loading)/]
    },
    // 'postcss-write-svg': {utf8: false},
    // 'postcss-viewport-units': {
    //   filterRule: rule => !/.*?:{1,2}(before|after).*?\s?/i.test(rule.selector)
    // }
  }
}
