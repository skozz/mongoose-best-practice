/**
 * MongoDB connection
 * @desc Open and control the MongoDB connection.
 * @use connect() disconnect()
 */

var mongoose = require('mongoose'),
  uri = 'mongodb://localhost:27017/awesomeapp';

var connect = function(debug, database) {
    debug = typeof debug === 'undefined' ? false : true;

    mongoose.connect(uri);
    mongoose.connection.on('connected', function() {
      console.log('Mongoose conecte on ' + uri);
    });

    mongoose.connection.on('error', function() {
      if (debug) {
        console.log('Mongoose has failed connecting to ' + uri);
      }
    });

    mongoose.connection.on('disconnecting', function() {
      if (debug) {
        console.log('Mongoose disconnecting ...');
      }
    });
    mongoose.connection.on('disconnected', function() {
      if (debug) {
        console.log('Mongoose disconnected from DB.');
      }
    });

    mongoose.connection.on('close', function() {
      if (debug) {
        console.log('Mongoose closed.');
      }
    });

    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        process.exit(0);
      });
    });

  },
  disconnect = function() {
    mongoose.disconnect();
  };

module.exports = {
  disconnect: disconnect,
  connect: connect
};