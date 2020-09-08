var MAP_CENTER = [40.694568, -73.949046];
var MAP_ZOOM = 12;

drawMap("map");

var t1, t2;

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


// Draw line
for (var i = 0; i < gLine.length - 1; i++) {
  const sA = gLine[i];
  const sB = gLine[i + 1];
  L.circle([gLine[i][0], gLine[i][1]], {
    color: '#9cb48b',
    fillColor: '#73CCA3',
    fillOpacity: 1,
    radius: 90,
  }).addTo(map);
  //L.polyline([sA, sB], {color: 'limeGreen', weight: 2}).addTo(map);
}


class Station {
  constructor(
    stopId,
    latitude,
    longitude,
    name,
    index
  ) {
    this.stopId = stopId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name
    this.index = index
  }
}

const stationObjects = gLine.map((s, index) => new Station(index, s[0], s[1], index));

const stationsWithOffsets = stationObjects.map(
  (stationB, index, stations) => {
    let stationA = null;
    let stationC = null;
    if (index > 0) {
      stationA = stations[index - 1];
    }
    if (index < stations.length - 1) {
      stationC = stations[index + 1]
    }

    stationB.offsets = findOffsetPoints(stationA, stationB, stationC);
    return stationB;
  }
)


stationsWithOffsets.forEach((i, index) => {
  let prevStation = null;
  if (index > 0) {
    prevStation = stationsWithOffsets[index - 1];
  }
  if (prevStation) {
    drawVectorTracks(prevStation, i, "green");
  }
})

function addTrains() {
  const swol = stationsWithOffsets.length;
  t1 = drawTrain(stationsWithOffsets[0].nOffset[0], stationsWithOffsets[0].nOffset[1]);
  t2 = drawTrain(stationsWithOffsets[swol - 1].sOffset[0], stationsWithOffsets[swol - 1].sOffset[1]);
}

function moveTrains() {
  const swol = stationsWithOffsets.length;
  const t1IntStops = stationsWithOffsets.slice(1, swol).map(i => i.offsets[0]);
  //const t2IntStops = stationsWithOffsets.slice(1, swol).map(i => i.sOffset);
  //console.log({t1IntStops, t2IntStops})
  const t2IntStops = stationsWithOffsets.slice(0, swol - 1).reverse().map(i => i.offsets[1]);
  moveTrain(t1, t1IntStops, 7000);
  moveTrain(t2, t2IntStops, 7000);
}