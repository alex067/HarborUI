const LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path')


module.exports = {
    mode: 'development',
   // devtool: 'inline-source-map',
    entry: ['babel-polyfill', './frontend/src/index.js'],
    output: {
      path: path.resolve(__dirname,  'build/static/dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      /* 
      ContentBase tells webpack from which directory to serve files, relative to the root.
      Since our React files are in the frontend folder, we specify it as such.

      Since contentBase now points to frontend as its new root directory, we have to tell the publicPath where to serve the bundled files.
      Devserver stores the bundle.js in memory, so now publicPath is set to frontend/dist, where bundle.js will be served from memory.
      */
      publicPath: "/dist",
      contentBase: 'frontend',
      historyApiFallback: true,
      watchContentBase: true,
      compress:true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    plugins: [
        new LiveReloadPlugin()
    ],
    devtool: false
  };