exports.home = function(req, res) {
  //message = req.flash('message');
  GMAP_API_KEY = process.env.HACKAMAP;
  res.render("./map/map", { GMAP_API_KEY: GMAP_API_KEY });
};

exports.test = function(req, res) {
  //message = req.flash('message');
  var message = { hello: "world" };
  res.send(message);
};
