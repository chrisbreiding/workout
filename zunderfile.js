require('zunder').setConfig({
  appCache: true,
  appCacheTransform (files) {
    return files.map((file) => {
      if (/fontawesome/.test(file)) {
        return `${file}?v=4.7.0`
      }
      if (/CNAME/.test(file)) {
        return null
      }
      return file
    })
  },
  staticGlobs: {
    'static/**': '',
    'node_modules/font-awesome/fonts/**': '/fonts',
  },
})
