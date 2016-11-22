// Retrieve coach station data

$.getJSON('//data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?postcode=EC2A 3LT&distance=3', function (data) {
  var stationNames = [];
  $.each(data.result, function (index) {
    stationNames.push(data.result[index].name);
  })
  console.log(stationNames)
})


// Initialise map


function initMap() {
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.522647, lng: -0.080758},
    zoom: 15
  });
}
