const twcApiKey = ""
let autoPicked = true

export let endingTemp, endingWind, endingDistance, endingMeasurement;


const progressBar = document.getElementById("progress-bar")

const sidebarUpcomingCities = document.getElementById("sidebar-upcoming-cities")

// START OF MAIN

export let userConfig = {
    opLocation: "Edmond Ok",
    unit: "e",

    ident: {
       identGreeting: "Wlecom to meto cjnnale programe la classe de la classe ",
       identBlurb: "Hey guys whats up, its me, SSPWXR here and I will be doing a face reveal at 17PM wednesday 2023",
    }, 

    radar: {
        loops: 5,
        interval_delay: 50,
        interval_between_loops: 1000,
    },

}

if (userConfig.unit == "e") {
    endingTemp = "°F"
    endingWind = "mph"
    endingDistance = "mi"
    endingMeasurement = "in"
} else if(userConfig.unit == "m") {
    endingTemp = "°C"
    endingWind = "km/h"
    endingDistance = "km"
    endingMeasurement = "mm"
}

export let mainVars = {
    misc: {
        titleBar: {
            mainTitleLocations: "main-title-bar-locations",
            mainTitleSlides: "main-title-bar-slides",
        },
    },

    ident: {  
        mainIdentChannel: "main-ident-channel",
        mainIdentOperator: "main-ident-operator",
        mainIdentLocIntro: "main-ident-loc-intro",
        mainIdentBlurb: "main-ident-blurb",
        mainIdentSysLocation: "main-ident-syslocation",
    },
}


export let mainSlides = {
    mainID: "main-identification",
    mainAirqual: "main-airquality",
    mainAlerts: "main-alerts",
    mainCurrent: "main-current",
    mainForecast: "main-forecast",
    mainForecastSlide: "main-forecast-slide",
    mainHourly: "main-hourly",
    mainRadar: "main-radar",
}


export let weatherInfo = {
    main: {
        alerts: {
            alertsContainer: "main-alerts-container"
        },

        radar: {
            radarTimeText: "main-radar-current-time",
        },
        

        currentConditions: {
            temp: "main-current-temp",
            feelslike: "main-current-feelslike",
            condition: "main-current-condition",
            icon: "main-current-icon",
            wind: "main-current-wind",
            dewpoint: "main-current-dewpoint",
            relHumidity: "main-current-humidity",
            pressure: "main-current-pressure",
            precip: "main-current-precip",
            visibility: "main-current-visibility",
        },
    
        forecast: {
            day: "main-forecast-part-",
            icon: "main-forecast-icon-",
            temp: "main-forecast-temp-",
            wind: "main-forecast-wind-",
            low: "main-forecast-low-",
        },

        forecastDaypart: {
            part: "main-forecast-day-forecast-",
            icon: "main-forecast-day-icon-",
            temp: "main-forecast-day-temp-",
            precipC: "main-forecast-day-precipc-",
            text: "main-forecast-day-text-",
        },

        airquality: {
            bar: {
                day: "main-airquality-bar-day",
                countBox: "main-airquality-bar-countBox",
                count: "main-airquality-bar-counter",
            },
            primary: {
                name: "main-airquality-primary-name",
                amount: "main-airquality-primary-amount",
            },
            all: {
                pollutants: {
                    o3: "main-airquality-pollutants-pol-o3",
                    pm10: "main-airquality-pollutants-pol-pm10",
                    "pm2.5": "main-airquality-pollutants-pol-pm2.5",
                    co: "main-airquality-pollutants-pol-co",
                    so2: "main-airquality-pollutants-pol-so2",
                    no2: "main-airquality-pollutants-pol-no2",
                }
            },
            messages: {
                group: "main-airquality-messages-group",
                message: "main-airquality-messages-message",
            }
        },
    
        daypart: {
            
        },
    },

    sidebar: {
        current: {
            icon: "current-icon",
            condition: "current-condition",
            temp: "current-temp",
            wind: "current-wind",
            progressBar: "sidebar-progress-bar",
            box: "current-box",
        },
        
        daypart: {
            icon: "sidebar-daypart-icon-",
            temp: "sidebar-daypart-temp-",
            precipC: "sidebar-daypart-precipc-",
            wind: "sidebar-daypart-wind-",
            narrative: "sidebar-daypart-narrative",
            part: "sidebar-daypart-part",

            sidebar: "sidebar-main-dayparts",
            box: "sidebar-daypart-box-",
            expanded: "sidebar-daypart-expanded",
        }
    },

    bottom: {
        label: "bottom-current-loc-label",

        chart: {
            container: "bottom-proj-chart-container",
        },
        current: {

            wind: "bottom-current-wind",
            dewpoint: "bottom-current-dewpoint",
            humidity: "bottom-current-humidity",
            visibility: "bottom-current-visibility",
            temp: "bottom-current-temp",
            icon: "bottom-current-icon",
            container: "bottom-current-container", 
        },
    },
}

// Don't wanna use default icons so use our own! (not mine, found them randomly lol)
export const weatherIcons = { // DAY / NIGHT
    "0": ["tornado.svg", "tornado.svg"], // Tornado
    "1": ["hurricane.svg", "hurricane.svg"], // Tropical Storm
    "2": ["hurricane.svg", "hurricane.svg"], // Hurricane
    "3": ["thunderstorms-day-extreme-rain.svg", "thunderstorms-night-extreme-rain.svg"], // Strong Storms
    "4": ["thunderstorms-day.svg", "thunderstorms-night.svg"], // Thunderstorms
    "5": ["overcast-day-sleet.svg", "overcast-night-sleet.svg"], // Rain / Snow
    "6": ["overcast-day-sleet.svg", "overcast-night-sleet.svg"], // Rain / Sleet
    "7": ["overcast-day-sleet.svg", "overcast-night-sleet.svg"], // Wintry Mix
    "8": ["overcast-day-sleet.svg", "overcast-night-sleet.svg"], // Freezing Drizzle
    "9": ["drizzle.svg", "drizzle.svg"], // Drizzle
    "10": ["overcast-day-sleet.svg", "overcast-night-sleet.svg"], // Freezing Rain
    "11": ["overcast-day-rain.svg", "overcast-night-rain.svg"], // Showers
    "12": ["overcast-day-rain.svg", "overcast-night-rain.svg"], // Rain
    "13": ["overcast-day-snow.svg", "overcast-night-snow.svg"], // Flurries
    "14": ["overcast-day-snow.svg", "overcast-night-snow.svg"], // Snow Showers
    "15": ["extreme-day-snow.svg", "extreme-night-snow.svg"], // Blowing / Drifting Snow
    "16": ["overcast-day-snow.svg", "overcast-night-snow.svg"], // Snow
    "17": ["extreme-day-hail.svg", "extreme-night-hail.svg"], // Hail
    "18": ["overcast-day-sleet.svg", "overcast-night-sleet.svg"], // Sleet
    "19": ["dust-wind.svg", "dust-wind.svg"], // Blowing Dust / Sandstorm
    "20": ["overcast-day-fog.svg", "overcast-night-fog.svg"], // Foggy
    "21": ["overcast-day-haze.svg", "overcast-night-haze.svg"], // Haze
    "22": ["overcast-day-smoke.svg", "overcast-night-smoke.svg"], // Smoke
    "23": ["wind.svg", "wind.svg"], // Breezy
    "24": ["wind.svg", "wind.svg"], // Windy
    "25": ["thermometer-colder.svg", "thermometer-colder.svg"], // Frigid / Ice Crystals
    "26": ["cloudy.svg", "cloudy.svg"], // Cloudy
    "27": ["overcast-night.svg", "overcast-night.svg"], // Mostly Cloudy (Night)
    "28": ["overcast-day.svg", "overcast-day.svg"], // Mostly Cloudy (Day)
    "29": ["partly-cloudy-night.svg", "partly-cloudy-night.svg"], // Partly Cloudy (Night)
    "30": ["partly-cloudy-day.svg", "partly-cloudy-day.svg"], // Partly Cloudy (Day)
    "31": ["clear-night.svg", "clear-night.svg"], // Clear (Night)
    "32": ["clear-day.svg", "clear-day.svg"], // Sunny (Day)
    "33": ["clear-night.svg", "clear-night.svg"], // Fair / Mostly Clear (Night)
    "34": ["clear-day.svg", "clear-day.svg"], // Fair / Mostly Sunny (Day)
    "35": ["extreme-hail.svg", "extreme-night-hail.svg"], // Mixed Rain and Hail
    "36": ["thermometer-sun.svg", "thermometer-sun.svg"], // Hot
    "37": ["thunderstorms-day.svg", "thunderstorms-day.svg"], // Isolated Thunderstorms (Day)
    "38": ["thunderstorms-day.svg", "thunderstorms-night.svg"], // Scattered Thunderstorms
    "39": ["overcast-day-rain.svg", "overcast-day-rain.svg"], // Scattered Showers (Day)
    "40": ["extreme-day-rain.svg", "extreme-night-rain.svg"], // Heavy Rain
    "41": ["snowflake.svg", "snowflake.svg"], // Scattered Snow Showers (Day)
    "42": ["extreme-day-snow.svg", "extreme-night-snow.svg"], // Heavy Snow
    "43": ["extreme-day-snow.svg", "extreme-night-snow.svg"], // Blizzard
    "44": ["not-available.svg", "not-available.svg"], // Not Available (N/A)
    "45": ["partly-cloudy-night-rain.svg", "partly-cloudy-night-rain.svg"], // Scattered Showers (Night)
    "46": ["partly-cloudy-night-sleet.svg", "partly-cloudy-night-sleet.svg"], // Scattered Snow Showers (Night)
    "47": ["thunderstorms-night.svg", "thunderstorms-night.svg"] // Scattered Thunderstorms (Night)
};

  const weatherRadarTime = document.getElementById("main-radar-current-time")
// END OF MAIN


// A BUNCH OF VARIABLES (In the wall, behind you, and above you (EE 1.5/10))

export let nationalCities = { // Nat = Only locations within that country | Border = Locations within that country + the locations within the neighboring country near the border.
    US_Nat: [
    "New York, NY",
    "San Francisco, CA",
    "Las Vegas, NV",
    "Los Angeles, CA",
    "Miami, FL",
    "Dallas, TX",
    "Oklahoma City, OK",
    "Cincinnati, OH",
    "Washington, DC",
    "Atlanta, GA",
    "Seattle, WA",
    ],
    US_Border_North: [
    "New York, NY",
    "Toronto, ON",
    "Chicago, IL",
    "Seattle, WA",
    "Vancouver, BC",
    "Minneapolis, MN",
    "Winnipeg, MB",
    "Miami, FL",
    "Dallas, TX",
    "Detroit, MI",
    ],
    US_Border_South: [
    "Miami, FL",
    "Havana, CU",
    "New Orleans, LA",
    "San Antonio, TX",
    "Monterry, NL",
    "Albuquerque, NM",
    "Tucson, AZ",
    "Los Angeles, CA",
    "Tijuana, MX-BCN",
    "San Diego, CA",
    ],
    CA_Nat: [
    "Ottawa, ON",
    "Montreal, QC",
    "St. John's, NL",
    "Toronto, ON",
    "Winnipeg, MB",
    "Saskatoon, SK",
    "Edmonton, AB",
    "Calgary, AB",
    "Vancouver, BC",
    "Quebec City, QC",
    "Yellowknife, NT",
    ],
    CA_Border_South: [
    "Toronto, ON",
    "Detroit, MI",
    "New York, NY",
    "Ottawa, ON",
    "Montreal, QC",
    "Winnipeg, MB",
    "Minneapolis, MN",
    "Calgary, AB",
    "Vancouver, BC",
    "Seattle, WA",
    ],
    CA_Border_North: [
    "Whitehorse, YT",
    "Anchorage, AK",
    "Fairbanks, AK",
    "Yellowknife, NT",
    "Rankin Inlet, NU",
    "Resolute, NU",
    "Nuuk, GL",
    "Iqaluit, NU",
    ],
}

export let identIntroLists = {
    topText: [
    "Here is your weather, ",
    "Hello, ",
    "Greetings, ",
    "hi",
    ],
    bottomText: [
    "this a meteochanel",
    "Wlecom to meto cjnnale programe la classe de la classe",
    ],
}

export let natCitiesList = []


export let cities = [

]

export let extraCities = [
    "Saskatoon",
    "Regina",
    "Calgary",
    "FUCK",
    "Minneapolis",
    "Winnipeg",
    "Toronto",
    "Oklahoma City",
    "Edmonton",
    "Prince Albert",
]


export let citiesLat = []

export let citiesLon = []

export let extraCitiesLat = []

export let extraCitiesLon = []

export let natCitiesLat = []

export let natCitiesLon = []


// bottom bar 
export let bottomCurrentTemp = []

export let bottomCurrentWind = []

export let bottomCurrentIcon = []

export let bottomCurrentDewpoint = []

export let bottomCurrentHumidity = []

export let bottomCurrentVisibility = []

export let bottomCurrentDN = []

export let bottomCurrentGraphData = {}




// sidebar

export let extraCitiesCurrentTemp = []

export let extraCitiesCurrentCondition = []

export let extraCitiesCurrentIcon = []

export let extraCitiesCurrentDN = []

export let extraCitiesCurrentWind = []



export let extraCitiesDaypartTemp = []

export let extraCitiesDaypartPart = []

export let extraCitiesDaypartPrecipC = []

export let extraCitiesDaypartIcon = []

export let extraCitiesDaypartDN = []

export let extraCitiesDaypartWind = []

export let extraCitiesDaypartNarrative = []


// main

export let citiesAlmanacMoonPhases = []


export let citiesAlerts = []


export let citiesCurrentTemp = []

export let citiesCurrentDOrN = []

export let citiesCurrentFeelsLike = []

export let citiesCurrentPressure = []

export let citiesCurrentPrecipC = []

export let citiesCurrentVisibility = []

export let citiesCurrentIcon = []

export let citiesCurrentWind = []

export let citiesCurrentHumidity = []

export let citiesCurrentDewpoint = []

export let citiesCurrentConditionLong = []

export let citiesCurrentConditionShort = []



export let citiesDaypartTemp = []

export let citiesDaypartCondition = []

export let citiesDaypartWind = []

export let citiesDaypartPrecipC = []

export let citiesDaypartPart = []

export let citiesDaypartIcon = []

export let citiesDaypartND = []


export let citiesForecastDay = []

export let citiesForecastTemp = []

export let citiesForecastIcon = []

export let citiesForecastWind = []

export let citiesForecastLowTemp = []

export let citiesForecastND = []



export let citiesForecastDaypartName = []

export let citiesForecastDaypartND = []

export let citiesForecastDaypartNarrative = []

export let citiesForecastDaypartPrecipChance = []

export let citiesForecastDaypartTemp = []

export let citiesForecastDaypartIcon = []



export let citiesAirQualityDay = []

export let citiesAirQualityIndex = []

export let citiesAirQualityCatIndex = []

export let citiesAirQualityPrimaryName = []

export let citiesAirQualityPrimaryAmount = []

export let citiesAirQualityPrimaryPollutants = {
    o3: [],
    pm10: [],
    "pm2.5": [],
    co: [],
    so2: [],
    no2: [],
}

export let citiesAirQualityMessages = []

export let radarTimeSlices;


// MASS DATA FETCH GOOGLE BIG QUERY MOMENT NVIDA RTX 5090 ENCODING TRANSCODING MOMENT
// what the fuck is this peyton
// GOOGLE BIG QUERY

// I've gyyatt to see that data in ohio. BOI, we are literally rizzing up the data.
// peyton what the hell are you even saying
// get geolocation from cities list


function roundToNearest(num, multiple) {
    return Math.round(num / multiple) * multiple;
}


function getWeatherData(){
    function getLatLon() {
        let fetchPromises = [];
        let opLat;
        let opLon;
        cities.push(userConfig.opLocation)
        
        function getRandomItems(arr, num){
            let result = new Array(num),
                len = arr.length,
                taken = new Array(len);
            if (num > len)
                throw new RangeError("Error");
            while (num--) {
                let x = Math.floor(Math.random() * len);
                result[num] = arr[x in taken ? taken[x] : x];
                taken[x] = --len in taken ? taken[len] : len;
            }
            return result;
        }

        function pickRandomCities(country, borderBool, latBool) {
            natCitiesList = [];  
            // latBool = true for north, false for south
            // borderBool = true for border, false for nat
            if (borderBool == true) {
                if (latBool == true) {
                    const natCities = getRandomItems(nationalCities[`${country}_Border_North`], 5);
                    natCitiesList.push(...natCities);
                    console.log("north")
                } else {
                    const natCities = getRandomItems(nationalCities[`${country}_Border_South`], 5);
                    natCitiesList.push(...natCities);
                    console.log("south")
                }
            } else {
                const natCities = getRandomItems(nationalCities[`${country}_Nat`], 5);
                natCitiesList.push(...natCities);
                console.log("center")
            }
        
            /*
            US_Nat
            US_Border_North
            */
       
            return natCitiesList; 
        }

        // gets operater's location and then gets a list of cities to fetch data from based on their cords. Welcome to 2B2T, the oldest anarchy server in Minecraft. 



        const fetchPromise = fetch(`https://api.weather.com/v3/location/search?query=${userConfig.opLocation}&language=en-US&format=json&apiKey=${twcApiKey}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        })
        .then(data => {
            opLat = data.location.latitude[0]
            opLon = data.location.longitude[0]
            if (data.location.countryCode[0] == "US") {
                if (data.location.latitude[0] >= 37 && data.location.latitude[0] <= 40 && data.location.longitude[0] >= -105 && data.location.longitude[0] <= -94) {
                    pickRandomCities("US", false, false);
                    console.log("US City is in the center");
                } else if (data.location.latitude[0] >= 40) {
                    pickRandomCities("US", true, true);
                    console.log("US City is in the North");
                } else {
                    pickRandomCities("US", true, false);
                    console.log("US City is in the South");
                }
            } else if (data.location.countryCode[0] == "CA") {
                if (data.location.latitude[0] >= 56 && data.location.latitude[0] <= 60 && data.location.longitude[0] >= -116 && data.location.longitude[0] <= -100) {
                    pickRandomCities("CA", false, false);
                    console.log("CA City is in the center");
                } else if (data.location.latitude[0] >= 60) {
                    pickRandomCities("CA", true, true);
                    console.log("CA City is in the North");
                } else {
                    pickRandomCities("CA", true, false);
                    console.log("CA City is in the South");
                }
            } else {
                // for now, we just pick random cities in the US if the operator is not in the US or CA
                // TODO: support for more countries
                natCitiesList = pickRandomCities("US", false, false);0
            } 
        })
        .then(() => {
            fetch(`https://api.weather.com/v3/location/near?geocode=${opLat},${opLon}&product=observation&format=json&apiKey=${twcApiKey}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            })
            .then(data => {
                data.location.stationName.forEach((city, index) => {
                    cities.push(`${city}, ${data.location.adminDistrictCode[index]}`)
                    citiesLat.push(data.location.latitude[index])
                    citiesLon.push(data.location.longitude[index])
                
                })
            })
            .then(() => {
                fetchPromises.push(fetchPromise)

                cities.forEach((city, index) => {
                    const fetchPromise = fetch(`https://api.weather.com/v3/location/search?query=${city}&language=en-US&format=json&apiKey=${twcApiKey}`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        }  
                    })
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error(response.statusText)
                        }
                    })
                    .then(data => {
                        citiesLat[index] = data.location.latitude[0]
                        citiesLon[index] = data.location.longitude[0]
                    })
                    fetchPromises.push(fetchPromise)
                })

                natCitiesList.forEach((city, index) => {
                    const fetchPromise = fetch(`https://api.weather.com/v3/location/search?query=${city}&language=en-US&format=json&apiKey=${twcApiKey}`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        }  
                    })
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error(response.statusText)
                        }
                    })
                    .then(data => {
                        natCitiesLon[index] = data.location.latitude[0]
                        natCitiesLon[index] = data.location.longitude[0]
                    })
                    fetchPromises.push(fetchPromise)
                })

                extraCities.forEach((city, index) => {
                    const fetchPromise = fetch(`https://api.weather.com/v3/location/search?query=${city}&language=en-US&format=json&apiKey=${twcApiKey}`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        }  
                    })
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error(response.statusText)
                        }
                    })
                    .then(data => {
                        extraCitiesLat[index] = data.location.latitude[0]
                        extraCitiesLon[index] = data.location.longitude[0]
                    })
                    fetchPromises.push(fetchPromise)  
                })

                Promise.all(fetchPromises)
                .then(() => {
                   massDataFetch()
                })
            })
        })

    }
    



    function massDataFetch(){
        let currentDayNum = new Date().getDate();

        let currentMonthNum = (new Date().getMonth() + 1);

        let currentYearNum = (new Date().getFullYear());

        function getFetchLink(){
            let fetchPromises = []


            let fetchLink = "https://api.weather.com/v3/aggcommon/v3alertsHeadlines;v3-wx-forecast-daily-7day;v3-wx-observations-current;v3-wx-forecast-hourly-2day;v2fcstintraday3;v3-wx-almanac-daily-5day;v3-wx-globalAirQuality?geocodes="

            let extraFetchLink = "https://api.weather.com/v3/aggcommon/v3-wx-forecast-daily-7day;v3-wx-observations-current;v3-wx-forecast-hourly-2day;v3-wx-globalAirQuality?geocodes="

            let natFetchLink = "https://api.weather.com/v3/aggcommon/v3-wx-observations-current;v3-wx-forecast-hourly-2day?geocodes="


            let fetchLinkList = []

            let extraFetchLinkList = []

            let natFetchLinkList = []

            cities.forEach((city, index) => {
                
                const fetchPromise = fetchLinkList.push(`${citiesLat[index]},${citiesLon[index]};`);
                
                fetchPromises.push(fetchPromise)
            })
            
            extraCities.forEach((city, index) => {
                const fetchPromise = extraFetchLinkList.push(`${extraCitiesLat[index]},${extraCitiesLon[index]};`);
                
                fetchPromises.push(fetchPromise)
            })

            natCitiesList.forEach((city, index) => {
                const fetchPromise = natFetchLinkList.push(`${natCitiesLat[index]},${natCitiesLon[index]};`);

                fetchPromises.push(fetchPromise)
            })



            fetchLink = fetchLink.concat(fetchLinkList.join("") + `&language=en-US&scale=EPA&units=${userConfig.unit}&format=json&startDay=${currentDayNum}&startMonth=${currentMonthNum}&apiKey=${twcApiKey}`)
        
            extraFetchLink = extraFetchLink.concat(extraFetchLinkList.join("") + `&language=en-US&scale=EPA&units=${userConfig.unit}&format=json&apiKey=${twcApiKey}`)

            natFetchLink = natFetchLink.concat(extraFetchLinkList.join("") + `&language=en-US&units=${userConfig.unit}&format=json&apiKey=${twcApiKey}`)

            Promise.all(fetchPromises)
            .then(() => {
                fetchWeather(fetchLink, extraFetchLink, natFetchLink)
            })
        }


        getFetchLink()

        function fetchWeather(fetchLink, extraFetchLink, natFetchLink) {
            console.log(natFetchLink)
            fetch(natFetchLink, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            })
            .then(data => {
                natCitiesList.forEach((city, index) => {
                    bottomCurrentDewpoint.push(data[index]["v3-wx-observations-current"].temperatureDewPoint + endingTemp)
                    bottomCurrentHumidity.push(roundToNearest(data[index]["v3-wx-observations-current"].relativeHumidity, 10) + "%")
                    bottomCurrentTemp.push(data[index]["v3-wx-observations-current"].temperature + endingTemp) 
                    bottomCurrentVisibility.push(data[index]["v3-wx-observations-current"].visibility + endingDistance)
                    bottomCurrentIcon.push(data[index]["v3-wx-observations-current"].iconCode)
                    bottomCurrentWind.push(data[index]["v3-wx-observations-current"].windDirectionCardinal + ", " + data[index]["v3-wx-observations-current"].windSpeed + endingWind)
                    
                    if (data[index]["v3-wx-observations-current"].dayOrNight == "D") {
                        bottomCurrentDN.push(0)
                    } else {
                        bottomCurrentDN.push(1)
                    }

                    let hours = 12
                    
                    bottomCurrentGraphData[index] = []

                    for (let i = 0; i < hours; i++){
                         bottomCurrentGraphData[index].push({
                            x: (data[index]["v3-wx-forecast-hourly-2day"].validTimeUtc[i] * 1000),
                            y: data[index]["v3-wx-forecast-hourly-2day"].temperature[i],
                         })
                    }

                })
            })
            


            console.log(extraFetchLink)
            fetch(extraFetchLink, {
                method: 'GET',
                "Content-Type": "application/json",
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            })
            .then(data => {
                extraCities.forEach((city, index) => {
                    // not 5, but 4 because there is a null at index 0 in the api
                    let dayParts = 5


                    extraCitiesCurrentTemp.push(data[index]["v3-wx-observations-current"].temperature + endingTemp)
                    extraCitiesCurrentCondition.push(data[index]["v3-wx-observations-current"].wxPhraseLong)
                    extraCitiesCurrentIcon.push(data[index]["v3-wx-observations-current"].iconCode)
                    extraCitiesCurrentWind.push((data[index]["v3-wx-observations-current"].windDirectionCardinal) + ", " + (data[index]["v3-wx-observations-current"].windSpeed) + endingWind)

                    if (data[index]["v3-wx-observations-current"].dayOrNight == "D") {
                        extraCitiesCurrentDN.push(0)
                    } else {
                        extraCitiesCurrentDN.push(1)
                    }


                    // do dayparts

                    extraCitiesDaypartTemp.push([])
                    extraCitiesDaypartPart.push([])
                    extraCitiesDaypartPrecipC.push([])
                    extraCitiesDaypartIcon.push([])
                    extraCitiesDaypartDN.push([])
                    extraCitiesDaypartWind.push([])
                    extraCitiesDaypartNarrative.push([])

                    for (let i = 1; i < dayParts; i++){
                        extraCitiesDaypartTemp[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].temperature[i] + endingTemp)
                        extraCitiesDaypartPart[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].daypartName[i])
                        extraCitiesDaypartPrecipC[index].push(roundToNearest(data[index]["v3-wx-forecast-daily-7day"].daypart[0].precipChance[i], 10) + "%")
                        extraCitiesDaypartIcon[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].iconCode[i])
                        extraCitiesDaypartWind[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].windDirectionCardinal[i] + ", " + data[index]["v3-wx-forecast-daily-7day"].daypart[0].windSpeed[i] + endingWind)
                        extraCitiesDaypartNarrative[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].narrative[i])

                        if (data[index]["v3-wx-forecast-daily-7day"].daypart[0].dayOrNight[i] == "D") {
                            extraCitiesDaypartDN[index].push(0)
                        } else {
                            extraCitiesDaypartDN[index].push(1)
                        }
                    }
                })
            })

            console.log(fetchLink)
            fetch(fetchLink, {
                method: 'GET',
               "Content-Type": "application/json",
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            })
            .then(data => {
                // main
                cities.forEach((city, index) => {
                    // variables 
                    let dayParts = 6 
                    let forecastDays = 15
                    let forecastDayparts = 2
                    let alerts;
                    if (data[index]["v3alertsHeadlines"] !== null){
                        alerts = data[index]["v3alertsHeadlines"].alerts.length
                    } else {
                        alerts = "None"
                    }
                    
                    citiesAlerts.push([])

 

                    citiesCurrentTemp.push(data[index]["v3-wx-observations-current"].temperature + endingTemp)
                    citiesCurrentFeelsLike.push(data[index]["v3-wx-observations-current"].temperatureFeelsLike + endingTemp)
                    citiesCurrentPressure.push(data[index]["v3-wx-observations-current"].pressureMeanSeaLevel + "mb") 
                    citiesCurrentVisibility.push(data[index]["v3-wx-observations-current"].visibility + endingDistance)
                    citiesCurrentIcon.push(data[index]["v3-wx-observations-current"].iconCode)
                    citiesCurrentPrecipC.push(data[index]["v3-wx-observations-current"].precip1Hour + endingMeasurement)
                    citiesCurrentConditionLong.push(data[index]["v3-wx-observations-current"].wxPhraseLong)
                    citiesCurrentConditionShort.push(data[index]["v3-wx-observations-current"].wxPhraseShort)
                    citiesCurrentDewpoint.push((data[index]["v3-wx-observations-current"].temperatureDewPoint) + endingTemp)
                    citiesCurrentWind.push((data[index]["v3-wx-observations-current"].windSpeed) + endingWind)
                    citiesCurrentHumidity.push(data[index]["v3-wx-observations-current"].relativeHumidity + "%")

                    if (data[index]["v3-wx-observations-current"].dayOrNight == "D") {
                        citiesCurrentDOrN.push(0)
                    } else if (data[index]["v3-wx-observations-current"].dayOrNight == "N") {
                        citiesCurrentDOrN.push(1)
                    } else {
                        citiesCurrentDOrN.push("IDK")
                    }
                    // start of forecast stuffs
                    // do daypart arrays
                    citiesDaypartTemp.push([])
                    citiesDaypartCondition.push([])
                    citiesDaypartWind.push([])
                    citiesDaypartPrecipC.push([])
                    citiesDaypartPart.push([])
                    citiesDaypartIcon.push([])
                    citiesDaypartND.push([]);

                    // do forecast arrays

                    citiesForecastWind.push([])
                    citiesForecastIcon.push([])
                    citiesForecastLowTemp.push([])
                    citiesForecastTemp.push([])
                    citiesForecastDay.push([])
                    citiesForecastND.push([])

                    // forecastdaypart arrays

                    citiesForecastDaypartND.push([])
                    citiesForecastDaypartName.push([])
                    citiesForecastDaypartNarrative.push([])
                    citiesForecastDaypartPrecipChance.push([])
                    citiesForecastDaypartTemp.push([])
                    citiesForecastDaypartIcon.push([])

                    if (alerts !== "None"){
                        for (let i = 0; i < alerts; i++){
                            let alertId = data[index]["v3alertsHeadlines"].alerts[i].detailKey
                            citiesAlerts[index].push([]);
                            fetch(`https://api.weather.com/v3/alerts/detail?alertId=${alertId}&format=json&language=en-US&apiKey=${twcApiKey}`,{
                                method: 'GET',
                                "Content-Type": "application/json",
                            })
                            .then(response => {
                                if (response.ok) {
                                    return response.json()
                                } else {
                                    throw new Error(response.statusText)
                                }
                            })
                            .then(aData => {
                                citiesAlerts[index][i].push(aData.alertDetail.eventDescription)
                                citiesAlerts[index][i].push(aData.alertDetail.headlineText)
                                citiesAlerts[index][i].push(aData.alertDetail.source)
                                citiesAlerts[index][i].push(aData.alertDetail.texts[0].description)
                            })
                        }
                    } else {
                        // do something idk
                    }



                    for (let i = 0; i < dayParts; i++){
                        citiesDaypartTemp[index].push(data[index]["v2fcstintraday3"].forecasts[i].temp + endingTemp)
                        citiesDaypartCondition[index].push(data[index]["v2fcstintraday3"].forecasts[i].phrase_12char)
                        citiesDaypartWind[index].push(data[index]["v2fcstintraday3"].forecasts[i].wdir_cardinal + " " + (data[index]["v2fcstintraday3"].forecasts[i].wspd + endingWind))
                        citiesDaypartPrecipC[index].push(roundToNearest(data[index]["v2fcstintraday3"].forecasts[i].pop, 10) + "%")
                        citiesDaypartPart[index].push((data[index]["v2fcstintraday3"].forecasts[i].dow + " " + data[index]["v2fcstintraday3"].forecasts[i].daypart_name))
                        citiesDaypartIcon[index].push(data[index]["v2fcstintraday3"].forecasts[i].icon_code);
                        
                        if (data[index]["v2fcstintraday3"].forecasts[i].daypart_name == "Morning" || "Afternoon"){
                            citiesDaypartND[index].push(0)
                        } else {
                            citiesDaypartND[index].push(1)
                        }
                    }
                    
                    for (let i = 0; i < forecastDayparts; i++) {
                        if (data[index]["v3-wx-forecast-daily-7day"].daypart[0].dayOrNight[i + 1] == "D"){
                            citiesForecastDaypartND[index].push(0)
                        } else {
                            citiesForecastDaypartND[index].push(1)
                        }
                        citiesForecastDaypartName[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].daypartName[i + 1])
                        citiesForecastDaypartNarrative[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].narrative[i + 1])
                        citiesForecastDaypartPrecipChance[index].push(`${roundToNearest(data[index]["v3-wx-forecast-daily-7day"].daypart[0].precipChance[i + 1], 10)} % Chance of Precip`);
                        citiesForecastDaypartTemp[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].temperature[i + 1] + endingTemp)
                        citiesForecastDaypartIcon[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].iconCode[i + 1])

                    }


                    // ^^^^^^^^^ THIS IS THE ACTUAL DAYPARTS ^^^^^^^^^

                    // api is weird and forces me to use dayparts 
                    for (let i = 0; i < forecastDays; i++) {
                        if (i > 0) {
                            if(i % 2 === 0 || i == 1) {
                                if (data[index]["v3-wx-forecast-daily-7day"].daypart[0].daypartName[i] == "Tommorrow"){
                                    citiesForecastDay[index].push("Tmw")
                                }
                                citiesForecastDay[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].daypartName[i].substring(0, 3))
                                citiesForecastIcon[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].iconCode[i])
                                citiesForecastWind[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].windSpeed[i] + endingWind)
                                citiesForecastTemp[index].push(data[index]["v3-wx-forecast-daily-7day"].daypart[0].temperature[i] + endingTemp)
                                // we will still check for day and night because the first few boxes are populated with dayparts
                                if (data[index]["v3-wx-forecast-daily-7day"].daypart[0].dayOrNight[i] == "D") {
                                    citiesForecastND[index].push(0)
                                } else {
                                    citiesForecastND[index].push(1)
                                }
                            }

                        }
                        

                        if (i < 6) {
                            citiesForecastLowTemp[index].push(data[index]["v3-wx-forecast-daily-7day"].temperatureMin[i] + endingTemp)
                        }


                    }


                    // do air quality stuffs 

                    let dateValid = new Date(data[index]["v3-wx-globalAirQuality"].expireTimeUtc * 1000)

                    citiesAirQualityDay.push(dateValid.toDateString())

                    citiesAirQualityIndex.push(data[index]["v3-wx-globalAirQuality"].globalairquality.airQualityIndex)
                    citiesAirQualityCatIndex.push(data[index]["v3-wx-globalAirQuality"].globalairquality.airQualityCategoryIndex)

                    citiesAirQualityPrimaryName.push(data[index]["v3-wx-globalAirQuality"].primaryPollutant)

                    Object.keys(citiesAirQualityPrimaryPollutants).forEach((pollutant) => {
                        const pol = pollutant.toUpperCase()



                        citiesAirQualityPrimaryPollutants[pollutant].push(data[index]["v3-wx-globalAirQuality"].globalairquality.pollutants[pol].amount)

                        if (pol == citiesAirQualityPrimaryName[index]){
                            citiesAirQualityPrimaryAmount.push(data[index]["v3-wx-globalAirQuality"].globalairquality.pollutants[pol].amount)
                        }
                    })

                    Object.keys(data[index]["v3-wx-globalAirQuality"].globalairquality.messages).forEach((message) => {
                        citiesAirQualityMessages.push(data[index]["v3-wx-globalAirQuality"].globalairquality.messages[message].text)
                    })






                })
            })

            // MOON PHASE STUFF BELOW


            // moonPhase data DOESNT need to be fetched x times based on the num of cities, so, we fetch here
            fetch(`https://www.icalendar37.net/lunar/api/?lang=en&month=${currentMonthNum}&year=${currentYearNum}`,{
                method: 'GET',
                "Content-Type": "application/json",
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            })
            .then(aData => {
                function daysInMonth(year, month) {
                    return new Date(year, month, 0).getDate()
                }
                const daysInMonthNum = daysInMonth(currentYearNum, currentMonthNum)
                let tempMoonPhase = []
                let tempFullMoonPhase = []
                for (let i = currentDayNum; i <= daysInMonthNum; i++) {
                    tempFullMoonPhase.push([aData.phase[i].phaseName, i, currentMonthNum])
                }
                tempFullMoonPhase.forEach((i) => {
                    if (i[0] == "Full moon" || i[0]  == "Last quarter" || i[0]  == "First quarter" || i == "New moon" ){
                        citiesAlmanacMoonPhases.push(i)
                    }
                })
                if (tempMoonPhase.length < 4) {
                    tempFullMoonPhase = []
                    let currentMonthNumb, currentYearNumb; 

                    if (currentMonthNum == 12){
                        currentMonthNumb = 1
                        currentYearNumb = currentYearNum + 1

                    } else {
                        currentMonthNumb = currentMonthNum + 1
                        currentYearNumb = currentYearNum
                    }

                    // overlapping stuffs
                    fetch(`https://www.icalendar37.net/lunar/api/?lang=en&month=${currentMonthNumb}&year=${currentYearNumb}`,{
                        method: 'GET',
                        "Content-Type": "application/json",
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else { 
                            throw new Error(response.statusText)
                        }
                    })
                    .then(aData => {
                        for (let i = 1; i <= daysInMonth(currentYearNumb, currentMonthNumb); i++) {
                            tempFullMoonPhase.push([aData.phase[i].phaseName, i, currentMonthNumb])
                            
                        }
                        tempFullMoonPhase.forEach((i) => {
                            if (i[0] == "Full moon" || i[0] == "Last quarter" || i[0] == "First quarter" || i[0] == "New Moon" ){
                                if (tempMoonPhase.length < 4){
                                    citiesAlmanacMoonPhases.push(i)
                                }
                            }
                        })
                    })
                }
            })

        }
    }
    getLatLon()

} getWeatherData()

// END OF fetches TO GET THE WEATHER DATA FROM THE API
// END OF fetches TO GET THE WEATHER DATA FROM THE API
// END OF fetches TO GET THE WEATHER DATA FROM THE API

   

