exports.home = function(req, res) {
  //message = req.flash('message');
  GMAP_API_KEY = process.env.HACKAMAP;
  res.render("./map/map", { GMAP_API_KEY: GMAP_API_KEY });
};

exports.test = function(req, res) {
  //message = req.flash('message');
  var message = [
    { id: 1, latitude: 40.708184, longitude: -73.827116 },
    { id: 2, latitude: 40.708716, longitude: -73.827652 },
    { id: 3, latitude: 40.708211, longitude: -73.826721 }
  ];
  res.send(message);
};
