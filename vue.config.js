const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  productionSourceMap: false,
  publicPath: process.env.VUE_APP_ASSETS_PREFIX || '/',
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  chainWebpack: (config) => {
    !isDev && config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = !isDev;
      // args[0].terserOptions.compress.pure_funcs = ['console.log'];
      return args
    });
  }
}
