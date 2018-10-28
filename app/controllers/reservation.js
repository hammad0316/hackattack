const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "dev";
const dbURI =
  env == "dev"
    ? "mongodb://127.0.0.1:27017/hackathon-project"
    : process.env.MONGODB_URI;

// Create the database connection
const connection = mongoose.createConnection(dbURI);
const Host = connection.model("Host", "hostSchema");
const Reservation = connection.model("Reservation", "reservationSchema");


exports.list_all = function(req, res){
  Reservation.find({}, function(err, reservations){
    if(err) res.send(err);
    else res.send(reservations);
  })
}

exports.create = function(req, res){

  const data = {
    host_id: req.body.host_id,
    client_id: req.body.client_id,
    picked_up: null,
    dropped_off: null,
  }
  var reservation = new Reservation(req.body);

  reservation.save(function(err, reservation){
    if ( !err && reservation ){
        res.redirect('/reservation/success/'+reservation._id);
    } else {
       req.flash('error_message', 'Something went wrong when trying to reserve a spot ');
        res.redirect('/');
    }
  })


}

exports.success = function(req, res){

  Reservation.findOne({_id: req.params.id}, function(err, reservation){
    if(err || !reservation){
      req.flash('error_message', 'Something went wrong when trying to reserve a spot ');
      res.redirect('/');
    }
    else{
        res.render('./reservations/success', {reservation: reservation});
    }
  })

}
