// Generate map and markers

function initMap() {
  var map;

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.525325, lng: -0.080969},
    zoom: 14
  });

  var precedentMarker = new google.maps.Marker({
    position: {lat: 51.525325, lng: -0.080969},
    map: map
  });

  $.getJSON('//data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?postcode=EC2A 3LT&distance=3', function (data) {

    var stations = data.result;

    $.each(stations, function (index, value) {
      var coords = value.latlong.coordinates;
      var latLng = new google.maps.LatLng(coords[1], coords[0])
      var stationMarker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    });
  });
}
