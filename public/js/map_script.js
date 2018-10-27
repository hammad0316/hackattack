window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById("startLat").innerHTML = startPos.coords.latitude;
    document.getElementById("startLon").innerHTML = startPos.coords.longitude;

    var center = new google.maps.LatLng(
      startPos.coords.latitude,
      position.coords.longitude
    );
    map.panTo(center);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
