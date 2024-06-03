module.exports = {
  'apps': [{
    'name': 'igreg-frontend',
    'script': 'quasar',
    'args': 'dev',
    'watch': ['src'],
    'env': {
      'NODE_ENV': 'development',
      'PORT': '9000'
    },
    'instances': '1',
    'exec_mode': 'cluster'
  }]
}
