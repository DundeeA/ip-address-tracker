let map = L.map("map").setView([0,0],2.5);

//Set maps tile (the map appearance/colors)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);


//Create marker icon
let MarkerIcon = L.icon({
  iconUrl: '../images/icon-location.svg',

  iconSize:     [50, 60], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [50, 40], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Spawn marker and focus view on it (Takes an array for the cords)
function updateView(cords = [0, 0]) {
  L.marker(cords, {icon: MarkerIcon}).addTo(map);
  map.setView(cords, 14);
}

//Fetch IP location
let ip = "107.77.198.65"; //get this value from the text input
let api_key = "at_MeEeSaIGcpXCKc2mFqNPgaqDrYQ2e";
function getLocation() {
  $.ajax({
    url: "https://geo.ipify.org/api/v1",
    data: { apiKey: api_key, ipAddress: ip },
    success: function (data) {
      alert("check console");
      console.log(data);
    },
  });
}

//Entering Ip address
let ipform = document.querySelector(".ip-form");
let ipinput = document.querySelector(".ip-input");

ipform.addEventListener("submit", (e) => {
  e.preventDefault();
  let ipformat =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipinput.value.match(ipformat)) {
    ipinput.value = "";
    console.log("Sucess!!!");
  } else {
    if(ipinput.value.trim().length !== 0){
      alert("Invalid ip address!");
    } 
  }
});
