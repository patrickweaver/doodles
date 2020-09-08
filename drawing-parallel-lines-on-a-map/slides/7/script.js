MAP_CENTER = [40.688089, -73.966839];
MAP_ZOOM = 15;

drawMap("map")

const stops = [
  {
    "GTFS Stop ID": "G34",
    "Stop Name": "Classon Av",
    "GTFS Latitude": 40.688873,
    "GTFS Longitude": -73.96007,
  },
  {
    "GTFS Stop ID": "G35",
    "Stop Name": "Clinton - Washington Avs",
    "GTFS Latitude": 40.688089,
    "GTFS Longitude": -73.966839,
  },
  {
    "GTFS Stop ID": "G36",
    "Stop Name": "Fulton St",
    "GTFS Latitude": 40.687119,
    "GTFS Longitude": -73.975375,
  }
]

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

drawStationsAndTracks(stops);
  
function drawStationsAndTracks(stops) {
  
  // Draw all the stations
  let prevStation = null;
  let nextStation = null;
  
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i];
    
    if (stops[i + 1]) {
      const ns = stops[i + 1];
      nextStation = new Station(ns["GTFS Stop ID"], ns["GTFS Latitude"], ns["GTFS Longitude"], ns["Stop Name"], i);
    }
    const station = new Station(s["GTFS Stop ID"], s["GTFS Latitude"], s["GTFS Longitude"], s["Stop Name"], i);

    var stationCircle = drawStation(station, clearMap, drawStationsAndTracks, stops, i);
    
    // Connect new station to previous station:
    if (prevStation) {
      drawTracks(prevStation, station, nextStation);
    }
    prevStation = station;
  }
}

// Remove markers and redraw on drag marker
function clearMap(m, index, lat, lng) {
    for(var i in m._layers) {
        var item = m._layers[i];
        //console.log(item);
        if(item._path != undefined || (item.options && item.options.draggable)) {
            stops[index]["GTFS Latitude"] = lat;
            stops[index]["GTFS Longitude"] = lng;
            try {
                m.removeLayer(m._layers[i]);
            }
            catch(e) {
                console.log("problem with " + e + m._layers[i]);
            }
        }
    }
}