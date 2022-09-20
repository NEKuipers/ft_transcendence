const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
		allowedHosts: "all",
    	proxy: {
        	'^/api': {
				target: `http://${process.env.BACKEND_HOST}:${process.env.NESTJS_PORT}`,
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