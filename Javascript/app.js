let cords = [42.84897787076336, -106.29737773388705];
let map = L.map('map');
updateView();

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map); 

// Create marker and focus view on it
function updateView(){
   L.marker(cords).addTo(map);
   map.setView(cords,18);
}