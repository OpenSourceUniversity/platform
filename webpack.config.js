const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const webpack = require('webpack');

const analyze = !!process.env.ANALYZE_ENV;
const env = process.env.NODE_ENV || 'development';

const webpackConfig = {
  name: 'client',
  target: 'web',
  mode: env,

  entry: {
    app: [
      'react-hot-loader/patch',
      path.resolve('src/index.js'),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp3)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve('public'),
    publicPath: '/',
  },

  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
};

if (analyze) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

if (env === 'production') {
  webpackConfig.optimization = {
    minimize: true,
  };
}

module.exports = webpackConfig;
