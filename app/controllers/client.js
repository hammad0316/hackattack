
const mongoose = require( 'mongoose' );

var env = process.env.NODE_ENV || 'dev';
var dbURI = (env == 'dev')? "mongodb://127.0.0.1:27017/hackathon-project" : process.env.MONGODB_URI;

// Create the database connection
const connection = mongoose.createConnection(dbURI);
const Client = connection.model('Client', 'clientSchema');


exports.delete_all = function(req, res){
  Client.remove({}, function(err){
    if(err) res.send(err);
    else res.send("deleeted all clients");
  })
}

exports.list_all = function(req, res){
  Client.find({}, function(err, clients){
    if(err) res.send(err);
    else res.send(clients);
  })
}

exports.signup = function(req, res){
  res.render('./clients/signup', {error: ''});
}

exports.login = function(req, res){
  res.render('./clients/login');
}

exports.signin = function(req, res){
  // req.flash('message', 'You are logged in!');
  res.redirect('/');
}

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
}

exports.create = function(req, res){
  console.log("trying to craete an account");
  req.body.email = req.body.email.toLowerCase();
  // req.body.address = req.body.address +" " +req.body.city+", NY";

  var client = new Client(req.body);

  client.save(function(err, client){
    console.log("hereee");
    if(err) {
      req.flash('error_message', err.message);
      res.redirect('/');
    }
    else {
      req.login(client, function (err) {
               if ( ! err ){
                 console.log(client);
                   req.flash('success_message', 'Successfully registered');
                   res.redirect('/');
               } else {
                  req.flash('error_message', 'Something went wrong when trying to register. Please enter your information again. Please make sure to fill out all fields. ');
                   res.redirect('/');
               }
           })
      //
    }
  });
}
