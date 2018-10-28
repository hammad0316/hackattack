const LocalStrategy  = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

const mongoose = require( 'mongoose' );

var env = process.env.NODE_ENV || 'dev';
var dbURI = (env == 'dev')? "mongodb://127.0.0.1:27017/hackathon-project" : process.env.MONGODB_URI;

// Create the database connection
const connection = mongoose.createConnection(dbURI);
const Host = connection.model('Host', 'hostSchema');
const Client = connection.model('Client', 'clientSchema');



module.exports = function(passport){

	passport.use('login', new LocalStrategy({
						usernameField: 'email',
            passReqToCallback : true
        },
        function(req, email, password, done) {
          console.log("TRYING TO LOG IN!");
          // console.log(req.user);
          // console.log(req.host)
          email = email.toLowerCase();
          console.log(email);
            // check in mongo if a user with username exists or not
            Host.findOne({ 'email' :  email },
                function(err, host) {

                  // console.log(host);
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!host){
                      console.log("NO HOST!");
                        Client.findOne({'email': email}, function(err, client){
                          if(err){
                            return done(err);
                          }
                          if(!client){
                            return done(null, false, req.flash('error_message', 'User Not found.'));
                          }
                          if (!isValidPassword(client, password)){
                              console.log('Invalid Password');
                              return done(null, false, req.flash('error_message', 'Invalid Password')); // redirect back to login page
                          }
                          return done(null, client, req.flash('success_message', 'Successfully Signed In'));

                        });

                    }
                    else{
                      console.log("host",host);
                      // User exists but wrong password, log the error
                      if (!isValidPassword(host, password)){
                          console.log('Invalid Password');
                          return done(null, false, req.flash('error_message', 'Invalid Password')); // redirect back to login page
                      }
                      // User and password both match, return user from done method
                      // which will be treated like success
                      console.log("found host!");
                      return done(null, host, req.flash('success_message', 'Successfully Signed In'));
                    }

                }
            );

        })
    );


    var isValidPassword = function(host, password){
      if(!host || !host.password){
        return false;
      }
      console.log(host.password, password);
      return host.password == password;
      // if(bcrypt.compareSync(password, host.password)) {
      //  // Passwords match
      //  return true;
      // } else {
      //  // Passwords don't match
      //  return false;
      // }


    }

}
