MAP_CENTER = [40.659137,-99.6406718];
MAP_ZOOM = 4;

const seattle = [47.6,-122.3];
const miami = [25.7,-80.2];

colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

drawMap("map")



function seattleToMiami() {
  L.polyline([seattle, miami], {color: 'red'}).addTo(map);
  for (var i = 0, s = seattle, m = miami; i < 7; i++, s[0] += 1, m[0] += 1) {
    L.polyline([s, m], {color: colors[i]}).addTo(map);
  }
}