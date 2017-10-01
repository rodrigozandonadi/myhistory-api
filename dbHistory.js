var mongoose = require('mongoose');
var dbURI = 'mongodb://myhistory:Seilad12@ds127564.mlab.com:27564/myhistory';
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
  });
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
  });
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });
  
  // When the connection is disconnected
  mongoose.connection.on('open', function () {
    console.log('Mongoose default connection is open');
  });
  
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

var postagensSchema = new mongoose.Schema(
    {
        titulo: String,
        tipo: String,
        categoria: String,
        tags: String,
        texto: String
    }, 
    { 
        collection: 'postagens' 
    }
);

module.exports = { Mongoose: mongoose, PostagensSchema: postagensSchema }