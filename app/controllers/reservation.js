const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "dev";
const dbURI =
  env == "dev"
    ? "mongodb://127.0.0.1:27017/hackathon-project"
    : process.env.MONGODB_URI;

// Create the database connection
const connection = mongoose.createConnection(dbURI);
const Host = connection.model("Host", "hostSchema");



exports.create = function(req, res){

  const data = {
    host_id: req.body.host_id,
    client_id: req.body.client_id,
  }
}
