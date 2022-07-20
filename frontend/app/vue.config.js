const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '^/api': {
          // target: `http://backend:3030`,
          target: `http://localhost:3030`,
          changeOrigin: true,
          logLevel: 'debug',
          pathRewrite: { '^/api': '/'},
          ws: true
        }
      },
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }
})