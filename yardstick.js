// Initialize a map with leaflet
var map = L.map('map').setView([40.740693, -74.004536], 11);
L.tileLayer(
    'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 18,
    }).addTo(map);

var myMap = document.getElementById("map");
var markers = new Array();
var spaceDown = false;
var markerClick = false;

window.addEventListener("keydown",keyDown);
window.addEventListener("keyup",keyUp);
myMap.addEventListener("mousedown",mouseDown);

function keyDown(e){
    if(e.keyCode==32 && spaceDown== false ){
        myMap.style.cursor="crosshair";
        //console.log("hi");
        spaceDown=true;
    }
}

function keyUp(e){
    if(e.keyCode==32 && spaceDown==true ){
        myMap.style.cursor="pointer";
        //console.log("hey");
        spaceDown=false;
    }
}

function mouseDown(e){
    var i;
    if(spaceDown  && markerClick==false){
        markers.push( new L.marker(map.mouseEventToLatLng(e),
                                    {draggable:true}) );
        i = markers.length-1;
        map.addLayer( markers[i]);
        markers[i].addEventListener("dragend",drawLines,false);
        addMoveFunction(markers[i],i);
        drawLines();
    } else {
        markerClick=false;
    }
}

function onDragEnd(){
    alert("draggg");
}

function addMoveFunction(thisMarker,thisIndex){
    thisMarker.addEventListener("mousedown",function(e){
        if(spaceDown){
            map.removeLayer(thisMarker);
            markers.splice(markers.indexOf(thisMarker),1);
            console.log( markers.indexOf(thisMarker) );
            console.log(markers);
            drawLines();
            markerClick=true;
        }  
    }, false );
}

var lineLayer = L.layerGroup().addTo(map);

function drawLines(){
    var p0, p1;
    lineLayer.clearLayers();
    if(markers.length>1){
        for(var i=1;i<markers.length;i++){
            p0=markers[i].getLatLng();
            p1=markers[i-1].getLatLng();

            // create a red polyline from an array of LatLng points
            var newLine = L.polyline([p0,p1], {color: 'blue'}).addTo(lineLayer);
        }
        
    }
}

