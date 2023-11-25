const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    assetExts: ['ttf', 'png', 'jpg', 'jpeg'],
  },
});
