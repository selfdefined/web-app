module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage'
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'font-display': 'off',
        'uses-rel-preconnect': 'off',
        'render-blocking-resources': 'off',
        'uses-long-cache-ttl': 'off'
      }
    }
  }
};
