window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    var LngLatPair = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };

    document.getElementById("startLat").innerHTML = position.coords.latitude;
    document.getElementById("startLon").innerHTML = position.coords.longitude;

    var center = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    map.panTo(center);
    map.setZoom(16);
    getHosts(LngLatPair);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};

var getHosts = function(LngLatPair) {
  $.ajax({
    url: "map/find_hosts",
    method: "GET",
    data: {
      position: LngLatPair
    },
    success: function(data) {
      // console.log(data.length);
      // console.log(data.children.length);
      console.log(data);
      displayCoords(data);
    }
  });
};

var displayCoords = function(hosts) {
  for (var h = 0; h < hosts.length; h++) {
    var host = hosts[h];
    var coords = host.geo_location.coordinates;
    var latLng = new google.maps.LatLng(coords[1], coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    marker.addListener("click", function() {
      var contentString =
        '<div id="content">' +
        '<div id="hostName">' +
        `<a href="localhost:3000/host?id=1">${host.name}</a>` +
        "</div>" +
        "</div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      infowindow.open(map, marker);
    });
  }
};

var showInfo = function(marker, host) {};
