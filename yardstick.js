// Initialize a map with leaflet
var map = L.map('map').setView([40.740693, -74.004536], 11);
L.tileLayer(
    'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 18,
    }).addTo(map);
    
// Put a draggable marker on the map
var marker = new L.marker([40.740693, -74.004536], {draggable:'true'});
map.addLayer(marker);

var markers = new Array();

window.addEventListener("keydown",keyDown);
window.addEventListener("keyup",keyUp);
//window.addEventListener("mousedown",mouseDown);

var myMap = document.getElementById("map");
myMap.addEventListener("mousedown",mouseDown);

var spaceDown = false;
function keyDown(e){
    if(e.keyCode==32 && spaceDown== false ){
        //alert("hi");
        myMap.style.cursor="crosshair";
        console.log("hi");
        spaceDown=true;
    }
}

function keyUp(e){
    if(e.keyCode==32 && spaceDown==true ){
        //alert("hi");
        myMap.style.cursor="pointer";
        console.log("hey");
        spaceDown=false;
    }
}

function mouseDown(e){
    console.log("yo");
    console.log(e.clientX);
    console.log(e.clientY);
    var newMark;
    if(spaceDown){
        console.log(map.mouseEventToLayerPoint(e));
        newMark = new L.marker(map.mouseEventToLatLng(e),{draggable:true});
        map.addLayer(newMark);
    }
}
