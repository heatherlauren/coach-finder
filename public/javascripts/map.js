let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.522647, lng: -0.080758},
    zoom: 15
  });
}
