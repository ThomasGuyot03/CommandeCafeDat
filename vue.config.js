const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  transpileDependencies: ['@vue/cli-service'],
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve('util/'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser' // Ajout de la configuration pour 'process'
      })
    ]
  },
  devServer: {
    host: '0.0.0.0',  // Permet de se connecter via des hôtes externes
    port: 8080,        // Le port que tu utilises
    allowedHosts: 'all' // a modifier plus tard 
  }
};