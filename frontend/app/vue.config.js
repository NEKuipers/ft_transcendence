const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        // target: `http://backend:3030`,
        target: `http://localhost:3030`,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/'},
      }
    }
  }
})
