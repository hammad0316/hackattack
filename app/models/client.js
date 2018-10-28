const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const  SALT_WORK_FACTOR = 10;

const salt = bcrypt.genSaltSync(10);
// const mailchimp = require('../../config/mailchimp.js');
const fs = require('fs');
// grab the things we need
const Schema = mongoose.Schema;
// const GMAP_API_KEY = process.env.HACKAMAP;


// create a schema
var clientSchema = new Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  user_type: {type: String, required: true, default: "client"},
  geo_location: {
    type: { type: String },
    coordinates: [Number],
  },
  password: {type: String, required: true},
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  created_at: Date,
  updated_at: Date,
});


// on every save, add the date
clientSchema.pre('save', true, function(next, done) {
  var client = this;
  // console.log(client);
  var currentDate = new Date();
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

//VALIDATE EMAIL
  var email_regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(!email_regex.test(this.email)){
    var err = new Error('Incorrect Email Format');
    next(err);

  }

// only hash password if it has been modified.
// since done() is called here, make sure only the bycrpt hash is below this
next();
done();
  // if (!this.isModified('password')) done();
  //   // hash the password along with our new salt
  //
  //   bcrypt.hash(client.password, salt, function(err, hash) {
  //     console.log(err);
  //     console.log(hash);
  //       if (err) return next(err);
  //
  //       client.password = hash;
  //       next();
  //   });
  //   done();
});








// METHODS


clientSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}




// the schema is useless so far
// we need to create a model using it

var Client = mongoose.model('Client', clientSchema);

// make this available to our users in our Node applications
module.exports = Client;
