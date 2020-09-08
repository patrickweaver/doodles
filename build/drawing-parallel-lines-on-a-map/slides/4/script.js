MAP_CENTER = [40.67358, -73.995959]
MAP_ZOOM = 15;

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

for (var i = 0; i < gLine.length - 1; i++) {
  const sA = gLine[i];
  const sB = gLine[i + 1];
  L.polyline([sA, sB], {color: 'limeGreen', weight: 7}).addTo(map);
}

function parallelStationLines() {
  for (var i = 0; i < gLine.length - 1; i++) {
    const sA = gLine[i];
    const sB = gLine[i + 1];

    const angleT = Math.atan((sA[0] - sB[0]) / (sA[1] - sB[1]));
    const angleA = (Math.PI / 2) - angleT;
    const oLat = Math.cos(angleA) * (50 * METER_LAT_OFFSET);
    const oLng = Math.cos(angleA) * (50 * METER_LNG_OFFSET);

    let oLatA = sA[0] - oLat;
    let oLngA = sA[1] - oLng;
    let oLatB = sB[0] - oLat;
    let oLngB = sB[1] - oLng;
    L.polyline([[oLatA, oLngA], [oLatB, oLngB]], {color: 'red', weight: 5}).addTo(map);

    oLatA = sA[0] + oLat;
    oLngA = sA[1] + oLng;
    oLatB = sB[0] + oLat;
    oLngB = sB[1] + oLng;
    L.polyline([[oLatA, oLngA], [oLatB, oLngB]], {color: 'red', weight: 5}).addTo(map);
  }
}