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
    map.setZoom(16);
    getHosts(position);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};

var getHosts = function(position) {
  $.ajax({
    url: "map/test",
    method: "GET",
    data: {
      name: "blank"
    },
    success: function(data) {
      // console.log(data.length);
      // console.log(data.children.length);
      console.log(data);
    }
  });
};
