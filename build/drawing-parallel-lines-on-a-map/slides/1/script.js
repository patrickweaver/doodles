MAP_CENTER = [40.659137,-99.6406718];
MAP_ZOOM = 4;

const seattle = [47.6,-122.3];
const miami = [25.7,-80.2];

drawMap("map")



function seattleToMiami() {
  L.polyline([seattle, miami], {color: 'red'}).addTo(map);
}