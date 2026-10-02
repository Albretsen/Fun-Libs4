const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

config.resolver.blockList = exclusionList([
    /node_modules\/ws\/.*/,
    /node_modules\/stream\/.*/,
]);

// Native-only SDKs that can't be bundled for the browser. On web they
// resolve to no-op stand-ins in ./web-stubs instead.
const webStubs = {
    'react-native-google-mobile-ads': 'react-native-google-mobile-ads.js',
    'react-native-purchases': 'react-native-purchases.js',
    'react-native-tracking-transparency': 'react-native-tracking-transparency.js',
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (platform === 'web' && webStubs[moduleName]) {
        return {
            type: 'sourceFile',
            filePath: path.resolve(__dirname, 'web-stubs', webStubs[moduleName]),
        };
    }
    return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
