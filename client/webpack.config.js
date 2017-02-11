const webpack = require('webpack');

module.exports = {
  entry: {
    'app': './src/js/app.js',
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue'}
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ]
};
