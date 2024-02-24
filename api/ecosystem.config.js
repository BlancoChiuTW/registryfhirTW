module.exports = {
  'apps': [{
    'name': 'igreg-api',
    'script': 'app.js',
    'watch': ['api', 'app.js', 'config'],
    'env': {
      'NODE_ENV': 'development',
      'PORT': '1337'
    },
    'instances': '2',
    'exec_mode': 'cluster'
  }]
}
