/* eslint-disable global-require */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: require('./aliases.config').webpack,
      extensions: ['*', '.js', '.vue', '.json'],
    },
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
};
