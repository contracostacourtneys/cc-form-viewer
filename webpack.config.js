const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './client/assets/js/main.js',
  output: { 
    path: __dirname, 
    filename: './client/assets/js/dist/bundle.js' 
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'stage-1', 'react', 'es2015-ie']
        }
      },

      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      },
    ]
  },

  resolve: {
    alias: {
      common: path.resolve(__dirname, './common/js/'),

      Root: path.resolve(__dirname, './client/assets/js/'),
      Utility: path.resolve(__dirname, './client/assets/js/utility'),

      App: path.resolve(__dirname, './client/assets/js/App'),
    }
  }
};