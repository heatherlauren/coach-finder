// Generate map and markers
function initMap() {
  var map;
  var stationMarkers = [];
  var centre;

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.525325, lng: -0.080969},
    zoom: 14,
    styles: [
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#C6E2FF"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#C5E3BF"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#D1D1B8"
              }
          ]
      }
    ]
  });

  var precedentMarker = new google.maps.Marker({
    position: {lat: 51.525325, lng: -0.080969},
    map: map,
    icon: "images/pin.png"
  });

  $.getJSON('//data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?postcode=EC2A 3LT&distance=3', function (data) {

    var stations = data.result;

    $.each(stations, function (index, value) {
      var coords = value.latlong.coordinates;
      var latLng = new google.maps.LatLng(coords[1], coords[0])
      stationMarkers[index] = new google.maps.Marker({
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP
      });
    });

    generateList(stations);
    highlightMarkers(stations, stationMarkers)
  });

// Make map responsive

  function calculateCentre() {
    centre = map.getCenter();
  }

  google.maps.event.addDomListener(map, 'idle', function() {
    calculateCentre();
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(centre);
  });

}

// Generate list

function generateList(stations) {
  $.each(stations, function (index, value) {
    $("#stationList").append(`<h4> <li> <a href="" class="stationList${index}"> ${value.name} </a> </li> </h4>`)
  });
}

// Highlight markers

function highlightMarkers(stations, stationMarkers) {
  $.each(stationMarkers, function (index) {

    $(`.stationList${index}`).click(function() {
      event.preventDefault();
      stationMarkers[index].setAnimation(google.maps.Animation.BOUNCE);

      setTimeout(function(){
        stationMarkers[index].setAnimation(null)
      }, 1400);

    })
  })
}
