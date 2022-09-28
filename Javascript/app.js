let map = L.map("map").setView([0, 0], 2.5);

//Set maps tile (the map appearance/colors)
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 20,
}).addTo(map);

// Create marker and focus view on it (Takes an array for the cords)
function updateView(cords = [0, 0]) {
  L.marker(cords).addTo(map);
  map.setView(cords, 18);
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
    alert("Invalid ip address!");
  }
});
