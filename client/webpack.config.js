const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates the index.html file and injects the script tags automatically
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'My PWA App',
      }),

      // Generates the service worker using the InjectManifest plugin
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your custom service worker
        swDest: 'service-worker.js',
      }),

      // Generates a manifest.json file
      new WebpackPwaManifest({
        name: 'My PWA App',
        short_name: 'PWA App',
        description: 'My Progressive Web App!',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/icon.png'), // Path to your app icon
            sizes: [96, 128, 192, 256, 384, 512], // Multiple sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS Loader - enables importing CSS files in JavaScript
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

        // Babel Loader - transpiles modern JavaScript to ES5
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
