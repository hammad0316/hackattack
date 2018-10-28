const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "dev";
const dbURI =
  env == "dev"
    ? "mongodb://127.0.0.1:27017/hackathon-project"
    : process.env.MONGODB_URI;

// Create the database connection
const connection = mongoose.createConnection(dbURI);
const Host = connection.model("Host", "hostSchema");

exports.home = function(req, res) {
  //message = req.flash('message');

  GMAP_API_KEY = process.env.HACKAMAP;
  res.render("./map/map", { GMAP_API_KEY: GMAP_API_KEY });
};

exports.find_hosts = function(req, res) {
  const current_user_location = req.body.location;
  Host.find({}, { name: 1, _id: 1, "geo_location.coordinates": 1 }, function(
    err,
    hosts
  ) {
    res.send(hosts);
    // res.send({hosts: hosts});
  });
};
