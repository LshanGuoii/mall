module.exports = {
	publicPath: './',
	// devServer: {
	// 	    proxy: {
	// 	      '/api': {
	// 	        target: 'http://152.136.185.210:8000/api/n3',
	// 	        changeOrigin: true,
	// 	        ws: true,
	// 	        pathRewrite: {
	// 	          '^/api': '/static/mock'
	// 	        }
	// 	      }
	// 	    }
	// 	  },
	devServer: {
	    proxy: {
	      '/api': {
	              target: 'http://152.136.185.210:8000',
	              ws: true,
	              changeOrigin: true,
				  pathRewrite: {
				            '^/api': ''
				          }
	            }
	    }
	  },
	configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }

}

