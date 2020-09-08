MAP_CENTER = [40.666271, -73.980305]
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

// Draw line
for (var i = 0; i < gLine.length - 1; i++) {
  const sA = gLine[i];
  const sB = gLine[i + 1];
  L.polyline([sA, sB], {color: 'limeGreen', weight: 7}).addTo(map);
}

function drawBisectors() {
  for (var i = 1; i < gLine.length - 1; i++) {
    const s1C = gLine[i - 1];
    const s2C = gLine[i];
    const s3C = gLine[i + 1];

    const s1 = {
      latitude: s1C[0],
      longitude: s1C[1]
    }

    const s2 = {
      latitude: s2C[0],
      longitude: s2C[1]
    }

    const s3 = {
      latitude: s3C[0],
      longitude: s3C[1]
    }

    drawBisector(s1, s2, s3);
  }
}


function drawBisector(station1, station2, station3) {
  // Position of the 3 stations:
  const aPos = [station1.latitude, station1.longitude];
  const bPos = [station2.latitude, station2.longitude];
  const cPos = [station3.latitude, station3.longitude];

  const dLatLng = (s1, s2) => {
    return [
      // ignore error, METER_LAT_OFFSET is process.env.METER_LAT_OFFSET
      Math.abs(s1.latitude - s2.latitude) / METER_LAT_OFFSET, 
      Math.abs(s1.longitude - s2.longitude) / METER_LNG_OFFSET
    ];
  }

  let dLatAB, dLngAB, dLatBC, dLngBC;
  [dLatAB, dLngAB] = dLatLng(station2, station1);
  [dLatBC, dLngBC] = dLatLng(station2, station3);

  const e = Math.atan(dLatBC / dLngBC);
  const f = Math.atan(dLngBC / dLatBC);
  const g = Math.atan(dLngAB / dLatAB);
  const h = Math.atan(dLatAB / dLngAB);
  
  const fullAngle1 = h + f + (Math.PI / 2);
  const fullAngle2 = e + h;

  const offsetAngle1 = (f - h + (Math.PI / 2)) / 2; // angle a
  const offsetAngle3 = -((f - h + (Math.PI / 2)) / 2); // negative angle a
  
  const offsetAngle4 = (e - h) / 2;
  const offsetAngle5 = -((e - h) / 2);

  const dLatOB1 = Math.sin(offsetAngle1) * (150 * METER_LAT_OFFSET);
  const dLngOB1 = Math.cos(offsetAngle1) * (150 * METER_LNG_OFFSET);

  const dLatOB3 = Math.sin(offsetAngle3) * (150 * METER_LAT_OFFSET);
  const dLngOB3 = Math.cos(offsetAngle3) * (150 * METER_LNG_OFFSET);
  
  const dLatOB4 = Math.sin(offsetAngle4) * (150 * METER_LAT_OFFSET);
  const dLngOB4 = Math.cos(offsetAngle4) * (150 * METER_LNG_OFFSET);
  
  const dLatOB5 = Math.sin(offsetAngle5) * (150 * METER_LAT_OFFSET);
  const dLngOB5 = Math.cos(offsetAngle5) * (150 * METER_LNG_OFFSET);

  const s2 = station2;
  
  // Draw a circle to represent the station:
  L.circle(bPos, markers.stationCircle).addTo(map);

  // Draw the two offset lines:
  const oNegPos1 = [ s2.latitude - dLatOB1, s2.longitude - dLngOB1 ];
  const oPosPos1 = [ s2.latitude + dLatOB1, s2.longitude + dLngOB1 ];
  L.polyline([oNegPos1, bPos], { color: "#FFFF00" }).addTo(map);
  L.polyline([oPosPos1, bPos], { color: "#FFFF4F" }).addTo(map);

  const oNegPos3 = [ s2.latitude - dLatOB3, s2.longitude - dLngOB3 ];
  const oPosPos3 = [ s2.latitude + dLatOB3, s2.longitude + dLngOB3 ];
  L.polyline([oNegPos3, bPos], { color: "#FFE700" }).addTo(map);
  L.polyline([oPosPos3, bPos], { color: "#FFE74F" }).addTo(map);
  
  const oNegPos4 = [ s2.latitude - dLatOB4, s2.longitude - dLngOB4 ];
  const oPosPos4 = [ s2.latitude + dLatOB4, s2.longitude + dLngOB4 ];
  L.polyline([oNegPos4, bPos], { color: "#FFB700" }).addTo(map);
  L.polyline([oPosPos4, bPos], { color: "#FFB74F" }).addTo(map);
  
  const oNegPos5 = [ s2.latitude - dLatOB5, s2.longitude - dLngOB5 ];
  const oPosPos5 = [ s2.latitude + dLatOB5, s2.longitude + dLngOB5 ];
  L.polyline([oNegPos5, bPos], { color: "#FF8700" }).addTo(map);
  L.polyline([oPosPos5, bPos], { color: "#FF874F" }).addTo(map);
}