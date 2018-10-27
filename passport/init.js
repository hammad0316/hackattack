var login = require('./login');
const mongoose = require( 'mongoose' );
//     Host = mongoose.model('Host', 'hostSchema');

const env = process.env.NODE_ENV || 'dev';
const dbURI = (env == 'dev')? "mongodb://127.0.0.1:27017/hackathon-project" : process.env.MONGODB_URI;

// Create the database connection
const connection = mongoose.createConnection(dbURI);
const Host = connection.model('Host', 'hostSchema');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize host uses to support persistent login sessions
    passport.serializeUser(function(host, done) {
        console.log('serializing user: ', host);

        done(null, host._id);
    });

    passport.deserializeUser(function(id, done) {
        Host.findById(id, function(err, host) {
            console.log('deserializing host:', host);
            done(err, host);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);

}
