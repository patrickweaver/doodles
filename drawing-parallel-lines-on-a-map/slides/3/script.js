MAP_CENTER = [40.71543,-73.9686581]
MAP_ZOOM = 12;

const seattle = [47.6,-122.3];
const miami = [25.7,-80.2];

var t1, t2;

colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

drawMap("map")

const gLine = [
  [40.746554, -73.943832],
  [40.744065, -73.949724],
  [40.731352, -73.954449],
  [40.724635, -73.951277],
  [40.712792, -73.951418],
  [40.706092, -73.950308],
  [40.700377, -73.950234],
  [40.694568, -73.949046],
  [40.689627, -73.953522],
  [40.688873, -73.96007],
  [40.688089, -73.966839],
  [40.687119, -73.975375],
  [40.688484, -73.985001],
  [40.686145, -73.990862],
  [40.680303, -73.995048],
  [40.67358, -73.995959],
  [40.670272, -73.989779],
  [40.666271, -73.980305],
  [40.660365, -73.979493],
  [40.650782, -73.975776],
  [40.644041, -73.979678],
]

function subwayTracks() {
  for (var i = 0; i < gLine.length - 1; i++) {
    L.polyline([gLine[i], gLine[i + 1]], {color: 'limeGreen', weight: 7}).addTo(map);
  }
}

function addTrains() {
  t1 = drawTrain(gLine[0][0], gLine[0][1]);
  t2 = drawTrain(gLine[gLine.length - 1][0], gLine[gLine.length - 1][1]);
}

function moveTrains() {
  moveTrain(t1, gLine.slice(1, gLine.length), 7000);
  moveTrain(t2, gLine.slice(0, gLine.length - 1).reverse(), 7000);
}