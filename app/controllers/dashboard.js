exports.home = function(req, res){
  console.log("yo");
  message = req.flash('message');
  res.render('./dashboard/dashboard', {message: message});
}

exports.choose = function(req, res){
  res.render('./dashboard/choose');
}
