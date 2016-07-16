// Initialize a map with leaflet
var map = L.map('map').setView([40.740693, -74.004536], 14);
L.tileLayer(
    'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 30,
    }).addTo(map);

// Initialize our helper variables
var myMap = document.getElementById("map");
var markers = new Array();
var spaceDown = false;
var markerClick = false;

// Add some event listeners
window.addEventListener("keydown",keyDown);
window.addEventListener("keyup",keyUp);
myMap.addEventListener("mousedown",mouseDown);

// Keep up with the space bar status.
// Change cursor when it's down
function keyDown(e){
    if(e.keyCode==32 && spaceDown== false ){
        myMap.style.cursor="crosshair";
        spaceDown=true;
    }
}

// Still keeping up with space bar status.
function keyUp(e){
    if(e.keyCode==32 && spaceDown==true ){
        myMap.style.cursor="pointer";
        spaceDown=false;
    }
}

// If we click, with space bar, and the click
// isn't on an existing marker, add a new marker.
function mouseDown(e){
    var i;
    if(spaceDown  && markerClick==false){
        markers.push( new L.marker(map.mouseEventToLatLng(e),
                                    {draggable:true}) );
        i = markers.length-1;
        map.addLayer( markers[i]);
        
        // Subscribe to two event listeners on each new marker
        markers[i].addEventListener("dragend",drawLines,false);
        addRemoveFunction(markers[i]);
        
        // Draw lines when a new marker is added
        drawLines();
    } else {
        markerClick=false;
    }
}

// Adding a "mousedown" event listener to each new marker.
// Adding it withing it's own function so that we can
// access a variable "thisMarker"
function addRemoveFunction(thisMarker){
    thisMarker.addEventListener("mousedown",function(e){
        if(spaceDown){
            // Remove the marker from the map and the array
            map.removeLayer(thisMarker);
            markers.splice(markers.indexOf(thisMarker),1);
            
            drawLines();
            markerClick=true;
        }  
    }, false );
}

var lineLayer = L.layerGroup().addTo(map);
function drawLines(){
    var p0, p1;
    var dist=0;
    lineLayer.clearLayers();
    if(markers.length>1){
        for(var i=1;i<markers.length;i++){
            p0=markers[i].getLatLng();
            p1=markers[i-1].getLatLng();
            
            // Sum the distance between each marker
            dist+=p0.distanceTo(p1);

            // Create a blue line between each marker
            var newLine = L.polyline([p0,p1], {color: 'blue'}).addTo(lineLayer);
        }
        // Convert distance to miles and update text
        distMiles=dist/1609.34;
        document.getElementById("distance").innerHTML=
         "Distance: "+distMiles.toFixed(2)+" miles";
        
    }
}

