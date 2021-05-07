const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  productionSourceMap: false,
  publicPath: process.env.VUE_APP_ASSETS_PREFIX || '/',
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    proxy: {
      '/cqabi': {
        target: process.env.VUE_APP_API_PROXY,
        changeOrigin: true
      },
    }
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '航站楼运行总览'
        return args
      });

    if (process.env.NODE_ENV === 'production') {
      !isDev && config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.output = {comments: false};
        args[0].terserOptions.compress.drop_console = true;
        // args[0].terserOptions.compress.pure_funcs = ['console.log'];
        return args
      });
    }
  }
}
