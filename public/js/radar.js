import { currentCityIndex } from './loops.js'

import { citiesLat, citiesLon, userConfig } from './weather.js';


let cityLngLat;


export let map, radarTimeSlices, maxLoops, interval_between_loops;
export let i = 0;
export let loops = 0
maxLoops = userConfig.radar.loops
interval_between_loops = userConfig.radar.interval_between_loops
let mapKey = "pk.eyJ1IjoicGV5dG9ud2R5bSIsImEiOiJjbGx0NHpmMHYwenJtM2tsaXRmaHF3ZHBsIn0.TlyGx6b0mqYSbzZUFjIQmg"
let twcApiKey = "e1f10a1e78da46f5b10a1e78da96f525"



// max is 48
let total_frames = 48

let interval_delay = 50

export let total_time_s = (total_frames * interval_delay) / 1000


let radar_frame_rate = total_frames / total_time_s;

console.log(radar_frame_rate);
// init map
mapboxgl.accessToken = mapKey;
map = new mapboxgl.Map({
    container: "map", // container id // style URL
    center: cityLngLat, // starting position [lng, lat]
    style:'mapbox://styles/peytonwdym/clov0gd3u00mj01pe1wmhb2j5',
    zoom: 1,
    interactive: false,
    fullscreenControl: false,
    zoomSnap: 0.1,
    zoomDelta: 0.1,
    dragging: false,
});

export async function initRadar(){
    i = 0
    loops = 0
    cityLngLat = [[citiesLon[currentCityIndex]], [citiesLat[currentCityIndex]]]
    map.jumpTo({
        zoom: 7.0,
        center: cityLngLat,
    });
    const res = await fetch(
        "https://api.weather.com/v3/TileServer/series/productSet/PPAcore?apiKey=" +
        twcApiKey
    ).then(response => response.json());

    radarTimeSlices = res.seriesInfo.radar.series;


    radarTimeSlices.reverse()
    radarTimeSlices.forEach(timestamp => {
        if (radarTimeSlices.indexOf(timestamp) <= total_frames) {
            map.addLayer({
                id: `radarlayer_${timestamp.ts}`,
                type: "raster",
                source: {
                    type: "raster",
                    tiles: [
                        `https://api.weather.com/v3/TileServer/tile/twcRadarMosaic?ts=${timestamp.ts}&xyz={x}:{y}:{z}&apiKey=` + twcApiKey,
                    ],
                    // tileSize is the res of the raster tile. I believe the max is 512 but we could be wrong
                    tileSize: 512,
                }
            })
            map.moveLayer(`radarlayer_${timestamp.ts}`, "road-motorway-trunk-navigation");
        }
    });
}

const weatherRadarTime = document.getElementById("main-radar-current-time");
export function animateRadar() {
    console.log(radarTimeSlices.length);
    if (loops < maxLoops) {
        let interval = setInterval(() => {
            if (i > radarTimeSlices.length - 1) {
                clearInterval(interval);
                setTimeout(() => {
                    i = 0
                    animateRadar();
                
                    return;
                }, interval_between_loops);
            } else {
                const timestamp = radarTimeSlices[i];
                const epochTimestamp = timestamp.ts;
                
                // Create a Date object using the epoch timestamp
                const localDate = new Date(epochTimestamp * 1000); // Convert seconds to milliseconds
                const timeString = localDate.toLocaleTimeString();
                
                // Update weatherRadarTime outside the loop
                weatherRadarTime.innerHTML = `Time: ${timeString}`;
                radarTimeSlices.forEach((timestamp, index) => {
                    weatherRadarTime.innerHTML = `Time: ${timeString}`;
                    map.setLayoutProperty(
                        `radarlayer_${timestamp.ts}`,
                        "visibility",
                        index === i ? "visible" : "none"
                    );
                });
                i++;
            }
        }, interval_delay);
        loops += 1;
    } else {
        console.log("done with radar loops");
    }
}
