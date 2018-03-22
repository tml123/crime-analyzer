const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://localhost:27099/sfCrimeDB', {useMongoClient: true});
  mongoose.Promise = global.Promise;
};
