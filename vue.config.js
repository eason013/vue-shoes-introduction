module.exports = {
  // 本機開發跨域代理
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://eason.server.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: true
      }
    }
  },
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title = "Eason Shoes 。 Eason TW";
          return args;
        })
  }
}