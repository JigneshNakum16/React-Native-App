module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: ['NODE_ENV'],
        whitelist: ['API_BASE_URL', 'API_TIMEOUT', 'API_RETRY_ATTEMPTS', 'ENABLE_ANALYTICS', 'ENABLE_CRASH_REPORTING', 'ENABLE_DEBUG_MODE', 'APP_NAME', 'APP_VERSION', 'ENV'],
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
