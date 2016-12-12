var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {    //aqui en development
    root: rootPath,
    app: {
      name: 'Laboratorio2'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bancoApp'
  },

  test: {
    root: rootPath,
    app: {
      name: 'Laboratorio2'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/Laboratorio2-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'Laboratorio2'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/Laboratorio2-production'
  }
};

module.exports = config[env];
