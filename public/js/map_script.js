var infoWindow;

window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    var LngLatPair = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    };

    document.getElementById("startLat").innerHTML = position.coords.latitude;
    document.getElementById("startLon").innerHTML = position.coords.longitude;
    infoWindow = new google.maps.InfoWindow();
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

    (function(marker, host) {
      const host_name = host.name;
      var contentString =
        '<div id="content">' +
        '<div id="hostName">' +
        `<a href="#" target="_self" data-id=${host._id} data-name=${host_name} class="reserve-trigger">${host_name}</a>` +
        "</div>" +
        "</div>";
      google.maps.event.addListener(marker, "click", function(e) {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      });
    })(marker, host);
  }
};

$(document).on('click', '.reserve-trigger', function(e){
  e.preventDefault();
  const current_user_id = $('#current_user_id').val();
  const current_user_type = $('#current_user_type').val();
  const host_id = $(this).attr('data-id');
  const host_name = $(this).attr('data-name');

  // console.log(this);
  if(current_user_id !== '' && current_user_type == 'client'){
    createModal(host_id, host_name, current_user_id)
  }
  // console.log($(this).attr('data-id'));


});

const createModal = function(host_id, host_name, client_id ){
  alert(host_id);
  $('#overlay').css('display','block');
  $('#modal').css('display','block');
  $('span#host_name').val(host_name);
  $('input#client_id').val(client_id);
  $('input#host_id').val(host_id);

}

$(document).on('click', '#overlay', function(){
  $('#overlay').css('display','none');
  $('#modal').css('display','none');
});
