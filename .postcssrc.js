module.exports = {
  "plugins": {
    'postcss-preset-env': {},
    // 'postcss-aspect-ratio-mini': {},
    // 'postcss-px-to-viewport': {
    //   viewportWidth: 750,
    //   viewportHeight: 1368,
		// 	unitPrecision: 6,
		// 	mediaQuery: true,
    //   // exclude: [/node_modules/i],
    //   selectorBlackList: ['.ignore', '.hairlines', /\.van-loading__text/, /\.van-(?!loading)/]
    // },
    'postcss-pxtorem': {
      rootValue: 75,
			unitPrecision: 6,
			mediaQuery: true,
      propList: [
        '*',
        // '!box-shadow',
        // '!filter*',
        // '!border-b*',
        // '!border-ri*',
        // '!border-t*',
        // '!border-le*'
      ],
      // exclude: [/node_modules/i],
      selectorBlackList: ['.ignore']
    },
  }
}
