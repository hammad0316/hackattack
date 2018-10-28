const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const  SALT_WORK_FACTOR = 10;


// const Child = mongoose.model('Child', 'childSchema');
// const Event = mongoose.model('Event', 'eventSchema');
const salt = bcrypt.genSaltSync(10);
// const mailchimp = require('../../config/mailchimp.js');
const fs = require('fs');
// grab the things we need
const Schema = mongoose.Schema;
// const GMAP_API_KEY = process.env.HACKAMAP;

const env = process.env.NODE_ENV || 'dev';
const dbURI = (env == 'dev')? "mongodb://127.0.0.1:27017/hackathon-project" : process.env.MONGODB_URI;

// Create the database connection
const connection = mongoose.createConnection(dbURI);
const Host = connection.model('Host', 'hostSchema');
const Client = connection.model('Host', 'clientSchema');




// create a schema
var reservationSchema = new Schema({

  dropped_off: { type: Boolean, default: false},
  picked_up: { type: Boolean, default: false},
  client_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
  host_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Host'},
  
});



// METHODS







// the schema is useless so far
// we need to create a model using it

var Reservation = mongoose.model('Reservation', reservationSchema);

// make this available to our users in our Node applications
module.exports = Reservation;
