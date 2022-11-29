let map = L.map("map").setView([0, 0],2.5);


//Set maps tile (the map appearance/colors)
let lightmode = true;
toggleLight();

function toggleLight(){
if(lightmode === true){
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);
}else{
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);
}
}
//Switch between lightmode and dark mode
$('.light-switch').click(function(){
    lightmode = !lightmode;
    toggleLight();
});


//Create marker icon
let MarkerIcon = L.icon({
  iconUrl: './images/icon-location.svg',

  iconSize:     [50, 60], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [50, 40], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Spawn marker and focus view on it (Takes an array for the cords)
function updateView(cords = [0, 0]) {
  L.marker(cords, {icon: MarkerIcon}).addTo(map);
  map.setView(cords, 17);
  console.log('set new view to ' + cords);
}

//Fetch IP location
let api_key = "at_MeEeSaIGcpXCKc2mFqNPgaqDrYQ2e";
function getLocation(ip) {
  $.ajax({
    url: "https://geo.ipify.org/api/v1",
    data: { apiKey: api_key, ipAddress: ip },
    success: function (data) {
      console.log(data);
      updateView([data.location.lat, data.location.lng]);

      let fullLocation = data.location.city + ', ' + data.location.region + ', ' + data.location.postalCode;
      updateInfo(data.ip,fullLocation.toString(), data.location.timezone, data.isp);
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
    getLocation(ipinput.value);
    ipinput.value = "";
  } else {
    if(ipinput.value.trim().length !== 0){
      alert("Invalid ip address!");
    } 
  }
});


//Manipulate the DOM to display the ip information
function updateInfo(ip,loc,tz,isp){
$('.ip').text(ip);
$('.location').text(loc);
$('.timez').text('UTC ' + tz);
$('.isp').text(isp);
}


updateView([43.73148633493864, 7.415333727409318]);


