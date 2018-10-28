const hosts = require("../controllers/host.js");
const clients = require("../controllers/client.js");
// const events = require('../controllers/event.js');
const dashboard = require("../controllers/dashboard.js");
const map = require("../controllers/map.js");
// const open_gym = require('../controllers/open_gym.js');
// const spreadsheets = require('../controllers/spreadsheets.js');
// const admin = require('../controllers/admin.js');

const express = require("express");
const Router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.session.passport.user) return next();
  else res.redirect("/users/login");
}
//only for login. will log users out who try and go to login.
function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) return next();
  else res.redirect("/users/logout");
}
var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};
var isAdmin = function(req, res, next) {
  if (req.isAuthenticated() && req.user.status == "admin") return next();
  res.redirect("/");
};

module.exports = function(passport, upload) {
  Router.route('/hosts/delete_all').get(hosts.delete_all);

  Router.route("/hosts/signup").get(isNotLoggedIn, hosts.signup);
  Router.route("/hosts/signup").post(isNotLoggedIn, hosts.create);

  Router.route("/signup/choose").get(isNotLoggedIn, dashboard.choose);

  Router.route("/hosts/login").get(isNotLoggedIn, hosts.login);
  Router.route("/hosts/login").post(
    isNotLoggedIn,
    passport.authenticate("login", {
      failureRedirect: "/hosts/login",
      failureFlash: true
    }),
    hosts.signin
  );
  Router.route("/hosts/logout").get(hosts.logout);

  Router.route("/clients/signup").get(isNotLoggedIn, clients.signup);
  Router.route("/clients/signup").post(isNotLoggedIn, clients.create);

  Router.route("/clients/login").get(isNotLoggedIn, clients.login);
  Router.route("/clients/login").post(
    isNotLoggedIn,
    passport.authenticate("login", {
      failureRedirect: "/hosts/login",
      failureFlash: true
    }),
    hosts.signin
  );
    Router.route("/clients/logout").get(clients.logout);



  Router.route("/").get(dashboard.home);
  // add wildcard Route to page_not_found

  Router.route("/map").get(map.home);
  Router.route("/map/find_hosts").get(map.find_hosts);


  return Router;
};

// module.exports = Router;
