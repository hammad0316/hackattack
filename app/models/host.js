const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const  SALT_WORK_FACTOR = 10;
const GoogleMapsAPI = require('googlemaps');

// const Child = mongoose.model('Child', 'childSchema');
// const Event = mongoose.model('Event', 'eventSchema');
const salt = bcrypt.genSaltSync(10);
// const mailchimp = require('../../config/mailchimp.js');
const fs = require('fs');
// grab the things we need
const Schema = mongoose.Schema;
// const GMAP_API_KEY = process.env.HACKAMAP;
const GMAP_API_KEY='AIzaSyCRbTrmeEaEQpAuRyG9YmwBLiJwmPjrulU';
const googleConfig = {
  key: GMAP_API_KEY,
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
};

const gmAPI = new GoogleMapsAPI(googleConfig);


// create a schema
var hostSchema = new Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  user_type: {type: String, required: true, unique: true},
  location: {
    line1: { type: String, required: true, unique: false },
    line2: {type: String, required: false},
    state: {type: String, required: false},
    city: {type: String, required: false},
    zip_code: {type: String, required: false},
  },
  geo_location: {
    type: { type: String },
    coordinates: [Number],
  },
  password: {type: String, required: true},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  spots: { type: Number, required: false, unique: false },
  spots_available: { type: Number, required: false, unique: false },
  created_at: Date,
  updated_at: Date,
});


// on every save, add the date
hostSchema.pre('save', true, function(next, done) {
  var host = this;
  // console.log(host);
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


  // var phone_regex =/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
  // if(!phone_regex.test(this.phone_number)){
  //   var err = new Error('Incorrect Phone Number');
  //   next(err);
  // };

// only hash password if it has been modified.
// since done() is called here, make sure only the bycrpt hash is below this
  if (!this.isModified('password')) done();
    // hash the password along with our new salt

    bcrypt.hash(host.password, salt, function(err, hash) {
      console.log(err);
      console.log(hash);
        if (err) return next(err);

        host.password = hash;
        next();
    });
    done();
});



hostSchema.post('save', function(doc) {

  var host = doc;
  const location = doc.location;
  const full_address = location.line1  + " "+ (location.line2 || "") + " " + (location.city || "") + "," +" " +(location.state || "") +" "+ (location.zip_code || "");

  const zip_code = doc.location && doc.location.zip_code? ',postal_code:'+doc.location.zip_code : '';
  var geocodeParams = {
    "address":    full_address,
    "components": "components=country:US",
  };

  gmAPI.geocode(geocodeParams, function(err, data){
    if(data && data.results && data.results[0] && data.results[0].geometry && data.results[0].geometry.location ){
      const geo = data.results[0].geometry.location ;
      if(!doc.geo_location.coordinates || doc.geo_location.coordinates.length == 0  ){
        doc.geo_location = {
          coordinates: [geo.lng, geo.lat],
          type: "Point",
        }
        doc.save();
      }
    }

  });
});


hostSchema.methods.updateGeoLocation = function(doc){

}







// METHODS


// hostSchema.methods.full_address = function(){
//   return this.address +" "+ this.city +" NY, "+ this.zip_code;
// }

// hostSchema.methods.needsToBeUpdatedForFall = function(){
//   if(new Date("9-1-2018") > this.updated_at){
//     return true;
//   }
//   else return false;
// }

// hostSchema.methods.is_admin = function(){
//   return this.status == 'admin'
// }
// hostSchema.methods.is_super_admin = function(){
//   return this.email == 'tylergaugler16@gmail.com'
// }
// hostSchema.methods.get_profile_picture = function(){
//   if (fs.existsSync('public/user_images/'+this._id+'/profile_pic.png')) {
//       return '/user_images/'+this._id+'/profile_pic.png';
//   }
//   else{
//       return '/images/user-placeholder.jpg'
//   }
// }
hostSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}
hostSchema.methods.updatePassword = function(new_password, next){
  // this.password = bcrypt.hashSync(new_password , 10);
  // this.save(function(err){
  //   if(err) console.log(err);
  //   else next();
  // })

  // bcrypt.hash(new_password, salt, function(err, hash) {
  //     if (err) return next(err);
  //     user.password = hash;
  //     next();
  // });
}

// hostSchema.methods.getChildren = function(){
//   return Child.find( { legal_guardian_id: this._id });
// }
// hostSchema.methods.getEvents = function(){
//   return Event.find({_id: { $in: this.eventsRegisteredFor} });
// }

// Statics

// hostSchema.statics.getUser = function(user_id){
//   return User.find( { _id: user_id });
// }
//
// hostSchema.statics.removeChildren = function(children_ids){
//   Child.deleteMany({_id: {$in: children_ids} }, function(err){
//     if(err)console.log(err);
//     else{
//       console.log("deleted children: ",children_ids);
//     }
//   })
// }


// the schema is useless so far
// we need to create a model using it

var Host = mongoose.model('Host', hostSchema);

// make this available to our users in our Node applications
module.exports = Host;
