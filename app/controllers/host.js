const mongoose = require("mongoose");

var env = process.env.NODE_ENV || "dev";
var dbURI =
  env == "dev"
    ? "mongodb://127.0.0.1:27017/hackathon-project"
    : process.env.MONGODB_URI;

// Create the database connection
const connection = mongoose.createConnection(dbURI);
const Host = connection.model("Host", "hostSchema");

function waitForIndex() {
  return new Promise((resolve, reject) => {
    Host.on("index", error => (error ? reject(error) : resolve()));
    console.log("INFOSS");
  });
}

exports.delete_all = function(req, res) {
  Host.remove({}, function(err) {
    if (err) res.send(err);
    else res.send("deleeted all hosts");
  });
};
exports.list_all = function(req, res) {
  Host.find({}, function(err, hosts) {
    if (err) res.send(err);
    else res.send(hosts);
  });
};
exports.signup = function(req, res) {
  res.render("./hosts/signup", { error: "" });
};

exports.login = function(req, res) {
  res.render("./hosts/login");
};

exports.signin = function(req, res) {
  console.log(req.user);
  // req.flash('message', 'You are logged in!');
  if (req.user && req.user.user_type && req.user.user_type == "host") {
    res.redirect("/hosts/" + req.user._id);
  } else {
    res.redirect("/map");
  }
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect("/");
};

exports.create = function(req, res) {
  req.body.email = req.body.email.toLowerCase();
  // req.body.address = req.body.address +" " +req.body.city+", NY";

  var host = new Host(req.body);

  host.save(function(err, host) {
    console.log("hereee");
    if (err) {
      req.flash("error_message", err.message);
      res.redirect("/");
    } else {
      req.login(host, function(err) {
        if (!err) {
          req.flash("success_message", "Successfully registered");
          res.redirect("/");
        } else {
          req.flash(
            "error_message",
            "Something went wrong when trying to register. Please enter your information again. Please make sure to fill out all fields. "
          );
          res.redirect("/");
        }
      });
      //
    }
  });
};

exports.show = function(req, res) {
  console.log("show pag", req.params.id);
  // req.flash('message', 'You are logged in!');
  Host.findOne({ _id: req.params.id }, function(err, host) {
    if (err || !host) {
      req.flash("error_message", "Something went wrong ");
      res.redirect("/");
    } else {
      console.log("yoyoy");
      res.render("./hosts/show", { host: host });
    }
  });
};

exports.update = function(req, res) {
  var new_data = {
    spots: req.body.spots
  };
  // if(res.locals.current_user.is_admin && req.body.email != null){
  //   new_data["email"] = req.body.email;
  // }
  Host.findOneAndUpdate({ _id: req.params.id }, { $set: new_data }, function(
    err,
    host
  ) {
    if (err || !host) {
      req.flash("error_message", "Something went wrong ");
      res.redirect("/");
    } else {
      req.flash("success_message", "Account has been updated.");
      res.redirect("/hosts/" + host._id);
    }
  });
};
