import { cities } from "./weather.js"

import { weatherInfo } from "./weather.js"

import { mainSlides } from "./weather.js"

import { mainVars } from "./weather.js"

import { adjustMapSize } from "./main.js"


import {initRadar, animateRadar, map, radarTimeSlices, maxLoops, total_time_s} from "./radar.js"

let config;


const configReq = fetch("/config.json").then(res => res.json()).then(res => { config = res; })

import {
    // bottom
    natCitiesList,
    bottomCurrentGraphData,
    bottomCurrentDewpoint,
    bottomCurrentHumidity,
    bottomCurrentTemp,
    bottomCurrentVisibility,
    bottomCurrentIcon,
    bottomCurrentWind,
    bottomCurrentDN,
    




    // sidebar

    extraCities,
    extraCitiesCurrentCondition,
    extraCitiesCurrentIcon,
    extraCitiesCurrentWind,
    extraCitiesCurrentTemp,
    extraCitiesCurrentDN,
    extraCitiesDaypartIcon,
    extraCitiesDaypartDN,
    extraCitiesDaypartPart,
    extraCitiesDaypartPrecipC,
    extraCitiesDaypartNarrative,
    extraCitiesDaypartTemp,
    extraCitiesDaypartWind,
    extraCitiesLat,
    extraCitiesLon,



    // main

    citiesLat,
    citiesLon,
    citiesAlerts,
    citiesCurrentTemp,
    citiesCurrentDOrN,
    citiesCurrentIcon,
    citiesCurrentWind,
    citiesCurrentFeelsLike,
    citiesCurrentPrecipC,
    citiesCurrentPressure,
    citiesCurrentVisibility,
    citiesCurrentHumidity,
    citiesCurrentDewpoint,
    citiesCurrentConditionLong,
    citiesCurrentConditionShort,
    citiesDaypartTemp,
    citiesDaypartCondition,
    citiesDaypartWind,
    citiesDaypartPrecipC,
    citiesDaypartPart,
    citiesDaypartIcon,
    citiesDaypartND,
    citiesForecastDay,
    citiesForecastTemp,
    citiesForecastIcon,
    citiesForecastWind,
    citiesForecastLowTemp,
    citiesForecastND,
    citiesForecastDaypartName,
    citiesForecastDaypartND,
    citiesForecastDaypartNarrative,
    citiesForecastDaypartPrecipChance,
    citiesForecastDaypartTemp,
    citiesForecastDaypartIcon,
    citiesAirQualityCatIndex,
    citiesAirQualityDay,
    citiesAirQualityIndex,
    citiesAirQualityMessages,
    citiesAirQualityPrimaryAmount,
    citiesAirQualityPrimaryName,
    citiesAirQualityPrimaryPollutants,
    weatherIcons,

    endingDistance,
    endingMeasurement,
    endingTemp,
    endingWind,
    userConfig,
    
} from "./weather.js"

export let currentCityIndex = 0;

export let currentNatCityIndex = 0;

export let currentExtraCityIndex = 0;

Chart.register(ChartDataLabels);

let alerts;

let isWeatherGood; // determine the background image category

// SIDEBAR 

// check to see if we have fetched the data from api 



function bottomBarLoop() {

    let perCityLoopTime = 10000



    const chart = $("#bottom-proj-chart")

    function findMinTemp(object){
        let n = 12

        let max = -100

        for (let i = 0; i < n; i++) {
            if (object[i].y > max) {
                max = object[i].y
            }
        }
        return max - 1
    }

    const weatherChart = new Chart(chart, {
        type: "line",
        data: {
            datasets: [{
                pointRadius: 0,
                showLine: true,
                fill: "start",
                
                data: bottomCurrentGraphData[currentCityIndex],
                datalabels: {
                    color: "#fff",
                    align: "top",
                    clamp: true,
                    formatter: function(value, context) {
                        return `${value.y}${endingTemp}`
                    },
                },
            }]
        },
        options: {
            layout: {
            },
            scales: {
                x: {
                    type: "time",
                    grid: {
                        display: false,
                    },
                    ticks: {
                        stepSize: 3,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: findMinTemp(bottomCurrentGraphData[currentCityIndex]),
                        display: false,
                    },
                    grid: {
                        display: false,
                    },
                }
            },
            maintainAspectRatio: false,
            resposive: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
                font: {
                    family: "Inter",

                },
                zoom: {
                    wheel: {
                        enabled: false,
                    },
                    pinch: {
                        enabled: false,
                    },
                    mode: "xy",
                },
                pan: {
                    enabled: false,
                }
            }
        },
    })

    function bottomCycle() {
        function appendWeatherInfo() {
            $(`#${weatherInfo.bottom.label}`).html(`${natCitiesList[currentNatCityIndex]}`)
            $(`#${weatherInfo.bottom.current.temp}`).html(`${bottomCurrentTemp[currentNatCityIndex]}`)
            $(`#${weatherInfo.bottom.current.dewpoint}`).html(`${bottomCurrentDewpoint[currentNatCityIndex]}`)
            $(`#${weatherInfo.bottom.current.humidity}`).html(`${bottomCurrentHumidity[currentNatCityIndex]}`)
            $(`#${weatherInfo.bottom.current.visibility}`).html(`${bottomCurrentVisibility[currentNatCityIndex]}`)
            $(`#${weatherInfo.bottom.current.wind}`).html(`${bottomCurrentWind[currentNatCityIndex]}`)
            $(`#${weatherInfo.bottom.current.icon}`).attr("src", `images/design/fill/final/${weatherIcons[bottomCurrentIcon[currentNatCityIndex]][bottomCurrentDN[currentNatCityIndex]]}`)

            weatherChart.data.datasets[0].data = bottomCurrentGraphData[currentNatCityIndex]

            weatherChart.options.scales.y.ticks.stepSize = findMinTemp(bottomCurrentGraphData[currentNatCityIndex])

            console.log(`Step Size: ${weatherChart.options.scales.y.ticks.stepSize}`)

            weatherChart.update()
    
        }
    
        function fullBottomSlide() {
            appendWeatherInfo()
    
            $(`#${weatherInfo.bottom.label}`).fadeIn(500)
            $(`#${weatherInfo.bottom.current.container}`).fadeIn(500)
            //$(`#${weatherInfo.bottom.chart.container}`).fadeIn(500)
    
    
            setTimeout(() => {
                $(`#${weatherInfo.bottom.current.container}`).fadeOut(500)
                $(`#${weatherInfo.bottom.label}`).fadeOut(500)
                //$(`#${weatherInfo.bottom.chart.container}`).fadeOut(500)

                currentNatCityIndex++;
            }, perCityLoopTime - 500)
        }

        fullBottomSlide()
    
        const bottomSlideInterval = setInterval(() => {
            if (currentNatCityIndex < natCitiesList.length) {
                fullBottomSlide()
                appendWeatherInfo()
            } else {
                currentNatCityIndex = 0;
                clearInterval(bottomSlideInterval)
                bottomCycle()
            }
        }, perCityLoopTime)
    }

    bottomCycle()
}



function sideBarLoop() {
    // init the cities in the sidebar
    $("#sidebar-upcoming-cities").html('')
    let fullHTML = ""
    for (let i = 0; i < extraCities.length; i++) {
        fullHTML += `<h3 class="sidebar-current-upcoming-city" id="sidebar-upcoming-city-${i}">${extraCities[i]}</h3>`
    }   
    $("#sidebar-upcoming-cities").html(fullHTML)

    let currentCity;

    let perCityLoopTime = 40000



    let dayparts = 4

    let daypartIntervalTime = perCityLoopTime / dayparts

    function fullDaypartSlide() {

        let selectedDaypart = 0;
        function interval() {
            $(`#${weatherInfo.sidebar.daypart.expanded}`).fadeIn(500)
    
           
    
            document.getElementById(weatherInfo.sidebar.daypart.box + (selectedDaypart + 1)).classList.add("sidebar-main-dayparts-box-active")
    
            // append extra weather data
    
            document.getElementById(weatherInfo.sidebar.daypart.part).innerHTML = extraCitiesDaypartPart[currentExtraCityIndex][selectedDaypart]
    
            document.getElementById(weatherInfo.sidebar.daypart.narrative).innerHTML = extraCitiesDaypartNarrative[currentExtraCityIndex][selectedDaypart]
            
            setTimeout(() => {
    
                setTimeout(() => {
                    $(`#${weatherInfo.sidebar.daypart.uvDesc}`).fadeIn(500)
                }, 1500)
            }, 2500)
    
    
            setTimeout(() => {
                $(`#${weatherInfo.sidebar.daypart.uvDesc}`).fadeOut(500)
    
                $(`#${weatherInfo.sidebar.daypart.expanded}`).fadeOut(500)
    
                document.getElementById(weatherInfo.sidebar.daypart.box + (selectedDaypart + 1)).classList.remove("sidebar-main-dayparts-box-active")
    
    
                if (selectedDaypart < dayparts - 1) {
                    selectedDaypart ++;
                } else {
                    clearInterval(daypartSlideInterval)
                }
            }, (daypartIntervalTime - 500))
        }

        
        const daypartSlideInterval = setInterval(() => {
            if (selectedDaypart < dayparts) {
                interval()
            } else {
                clearInterval(daypartSlideInterval)
            }
            
        }, daypartIntervalTime)

        interval()
    }

    


    function fullSidepartSlide() {
        // append current weather data
        appendWeatherInfo()
        fullDaypartSlide()
        $(`#${weatherInfo.sidebar.current.box}`).fadeIn(500)
        $(`#${weatherInfo.sidebar.daypart.sidebar}`).fadeIn(500)  

        document.getElementById(`sidebar-upcoming-city-${currentExtraCityIndex}`).classList.add("sidebar-current-upcoming-city-active")

        document.getElementById(weatherInfo.sidebar.current.progressBar).style.animationDuration = (`${perCityLoopTime / 1000}s`)
    
        document.getElementById(weatherInfo.sidebar.current.progressBar).classList.add("progress-bar-animation")
    
        setTimeout(() => {

            document.getElementById(weatherInfo.sidebar.current.progressBar).classList.remove("progress-bar-animation")

            document.getElementById(`sidebar-upcoming-city-${currentExtraCityIndex}`).classList.remove("sidebar-current-upcoming-city-active")

            $(`#sidebar-upcoming-city-${currentExtraCityIndex}`).fadeOut(500)

            $(`#${weatherInfo.sidebar.daypart.sidebar}`).fadeOut(500);

            $(`#${weatherInfo.sidebar.current.box}`).fadeOut(500)

            currentExtraCityIndex++;
        
        }, (perCityLoopTime - 500))
    }

    fullSidepartSlide();
    
    const fullSlideInterval = setInterval(() => {
        if (currentExtraCityIndex < extraCities.length) {
            fullSidepartSlide()

        } else {
            currentExtraCityIndex = 0;
            clearInterval(fullSlideInterval)
            sideBarLoop()
        }

    }, perCityLoopTime)


    function appendWeatherInfo() {
        let dayparts = 4
        document.getElementById(weatherInfo.sidebar.current.condition).innerHTML = extraCitiesCurrentCondition[currentExtraCityIndex]
        document.getElementById(weatherInfo.sidebar.current.temp).innerHTML = extraCitiesCurrentTemp[currentExtraCityIndex]
        document.getElementById(weatherInfo.sidebar.current.icon).src = `images/design/fill/final/${weatherIcons[extraCitiesCurrentIcon[currentExtraCityIndex]][extraCitiesCurrentDN[currentExtraCityIndex]]}`;
        document.getElementById(weatherInfo.sidebar.current.wind).innerHTML = extraCitiesCurrentWind[currentExtraCityIndex]

        for (let i = 1 ; i < dayparts + 1; i++) {
            document.getElementById(weatherInfo.sidebar.daypart.precipC + i).innerHTML = (extraCitiesDaypartPrecipC[currentExtraCityIndex][i - 1]);
            document.getElementById(weatherInfo.sidebar.daypart.temp + i).innerHTML = (extraCitiesDaypartTemp[currentExtraCityIndex][i - 1]);
            document.getElementById(weatherInfo.sidebar.daypart.wind + i).innerHTML = (extraCitiesDaypartWind[currentExtraCityIndex][i - 1]);
            document.getElementById(weatherInfo.sidebar.daypart.icon + i).src = `images/design/fill/final/${weatherIcons[extraCitiesDaypartIcon[currentExtraCityIndex][i - 1]][extraCitiesDaypartDN[currentExtraCityIndex][i - 1]]}`;
        }
    }



}




function mainLoop() {


    let currentCity;
    let length = 0;
    let slideOrder = []
    let currentSlide = 0


    // get the total time for the radar slide
    let radarSlideTime = ((total_time_s * userConfig.radar.loops) * 1000) + userConfig.radar.interval_between_loops * userConfig.radar.loops
    console.log(`Radar slide time: ${radarSlideTime}`)
    
    let slideToFuncName = {
        ident: [slideIdent, 10000, 0],
        alerts: [slideAlerts, 15000, 0],
        current: [slideCurrent, 15000, 0],
        radar: [slideRadar, radarSlideTime, 0],
        hourly: [slideHourly, 15000, 0],
        forecast: [slideForecast, 25000, 0],
        airquality: [slideAirquality, 20000, 0],
    }

    if (citiesAlerts[currentCityIndex].length > 0) {
        alerts = true;
        console.log("ALERTS SLIDE APPENDED TO BROADCAST CYCLE!")
        isWeatherGood = 0;
        console.log('is weather good?', isWeatherGood)
    } else {
        alerts = false;
        console.log("The alerts slide has not been appended to the broadcast cycle.")
        isWeatherGood = 1;
        console.log('is weather good?', isWeatherGood)
    }


    slideOrder.push("ident", "current", "radar", "forecast")


    
    if (alerts) {
        slideOrder.splice(1,0,"alerts")  
    }


    function slideIn(type) {
        $(type).css("transform", "translateX(0)");
    }
    
    function slideOut(type) {
        $(type).css("transform", "translateX(-200%)");
    }

    function slideIdent(){
        $(`#${mainVars.misc.titleBar.mainTitleSlides}`).text(
            `Welcome`
        )
        $(`#${mainVars.misc.titleBar.mainTitleLocations}`).text(`
            ${cities[currentCityIndex]}
        `)

        setTimeout(() => {
            slideIn(".main-title-bar-upcoming-text-animated-slides")
            slideIn(".main-title-bar-upcoming-text-animated-locations")
        }, 1000)
        
        $(`#${mainSlides.mainID}`)
        .css("display", "flex")
        .hide()
        .fadeIn(500)

        setTimeout(() => {
            $(`#${mainSlides.mainID}`).fadeOut(500)
           slideOut(".main-title-bar-upcoming-text-animated-slides")
        }, slideToFuncName.ident[1] - 500)
    }

    function slideAlerts(){
        $(`#${mainVars.misc.titleBar.mainTitleSlides}`).text( `Alerts`)

        setTimeout(() => {
            slideIn(".main-title-bar-upcoming-text-animated-slides")
        }, 1250)

        $(`#${mainSlides.mainAlerts}`).fadeIn(500)

        setTimeout(() => {
            slideOut(".main-title-bar-upcoming-text-animated-slides")
            $(`#${mainSlides.mainAlerts}`).fadeOut(500)
        }, slideToFuncName.alerts[1] - 500)
        
    }

    function slideCurrent(){
        $(`#${mainVars.misc.titleBar.mainTitleSlides}`).text( `Current Conditions`)
        setTimeout(() => {
            slideIn(".main-title-bar-upcoming-text-animated-slides")
        }, 250)

    

        // initRadar on previous slide so that its seamless

        setTimeout(() => {
            $(`#${mainSlides.mainRadar}`).css("display", "block")
            $(`#${mainSlides.mainRadar}`).css("opacity", "0.0")
            $(`#${mainSlides.mainRadar}`).css("visibility", "hidden")
            adjustMapSize()
            map.resize()
            initRadar()
        }, 5000)

        $(`#${mainSlides.mainCurrent}`).fadeIn(500)

        setTimeout(() => {
            slideOut(".main-title-bar-upcoming-text-animated-slides")
            $(`#${mainSlides.mainCurrent}`).fadeOut(500)
        }, slideToFuncName.current[1] - 500)
    }   

    function slideRadar(){
        $(`#${mainVars.misc.titleBar.mainTitleSlides}`).text( `Local Doppler Radar - Past 3 Hours`)
        setTimeout(() => {
            slideIn(".main-title-bar-upcoming-text-animated-slides")
        }, 250)

        $(`#${mainSlides.mainRadar}`).fadeIn(500)

        animateRadar()

        $(`#${mainSlides.mainRadar}`).css("visibility", "visible").animate({opacity: 1.0}, 500)

        $("#map").css("visibility", "visible").animate({opacity: 1.0}, 500)

        setTimeout(() => {
            slideOut(".main-title-bar-upcoming-text-animated-slides")
            $(`#${mainSlides.mainRadar}`).fadeOut(500)
            $("#map").animate({opacity: 0.0}, 500, invis) 
            

            function invis(){
                $("#map").css("visibility", "hidden")
                $(`#${mainSlides.mainRadar}`).css("visibility", "hidden")
            }
        }, slideToFuncName.radar[1] - 500)

    }

    function slideHourly(){
        $(`#${mainVars.misc.titleBar.mainTitleSlides}`).text( `Daypart Forecast`)
        setTimeout(() => {
            slideIn(".main-title-bar-upcoming-text-animated-slides")
        }, 250)

        $(`#${mainSlides.mainHourly}`).fadeIn(500)

        setTimeout(() => {
            $(`#${mainSlides.mainHourly}`).fadeOut(500)
            slideOut(".main-title-bar-upcoming-text-animated-slides")
        }, slideToFuncName.hourly[1] - 500)

    }

    function slideForecast(){
        let subSlides = 3
        let currentSubSlide = 1

        $(`#${mainVars.misc.titleBar.mainTitleSlides}`).text( `Forecast`)

        setTimeout(() => {
            slideIn(".main-title-bar-upcoming-text-animated-slides")
        }, 250)

        $(`#${mainSlides.mainForecast}`).fadeIn(500)

        $(`#${mainSlides.mainForecastSlide}${currentSubSlide}`)
        .css("display", "flex")
        .hide()
        .fadeIn(500)



        const forecastSlideInterval = setInterval(() => {
            if (currentSubSlide < subSlides) {
                $(`#${mainSlides.mainForecastSlide}${currentSubSlide}`).fadeOut(500)

                currentSubSlide++;

                setTimeout(() => {
                    $(`#${mainSlides.mainForecastSlide}${currentSubSlide}`)
                    .css("display", "flex")
                    .hide()
                    .fadeIn(500)
                }, 500)

            } else {
                clearInterval(forecastSlideInterval)
            }
        }, slideToFuncName.forecast[1] / subSlides)

        setTimeout(() => {
            $(`#${mainSlides.mainForecastSlide}${currentSubSlide}`).fadeOut(500)

            $(`#${mainSlides.mainForecast}`).fadeOut(500)

            slideOut(".main-title-bar-upcoming-text-animated-slides")
        }, slideToFuncName.forecast[1] - 500)

    }


    function slideAirquality(){
        $(`#${mainVars.misc.titleBar.mainTitleSlides}`).text( `Air Quality`)
        setTimeout(() => {
            slideIn(".main-title-bar-upcoming-text-animated-slides")
        }, 250)
       

        $(`#${mainSlides.mainAirqual}`).fadeIn(500)

        setTimeout(() => {
       slideOut(".main-title-bar-upcoming-text-animated-slides")
        $(`#${mainSlides.mainAirqual}`).fadeOut(500)
        }, slideToFuncName.airquality[1] - 500)

    }

    function totalSlideLength(){
        slideOrder.forEach((slide, i) => {
            length = length + slideToFuncName[slideOrder[i]][1]
        })
    }

    function slideEndTime() {
        let time = 0
        slideOrder.forEach((slide, i) => {
            slideToFuncName[slide][2] = (time)
            time = time + slideToFuncName[slide][1]
        })
    }


    function slides() {
        totalSlideLength()
        slideEndTime()
        let slideIndex = 0

        function addTimeouts() {
            let funcList = []
            let funcName;
            let func;
            let slideLength = 0
            slideOrder.forEach((slide, index) => {
                func = slideToFuncName[slide][0]
                funcList.push(func)
                slideLength = slideToFuncName[slide][2]
                setTimeout(() => {
                    funcName = funcList[slideIndex]
                    funcName()
                    slideIndex++;
                }, slideLength)
            })
        }

        addTimeouts()
        appendWeatherInfo()
    }

    slides()

    const mainInterval = setInterval(() => {
        slides();

        currentCityIndex++;
        if (currentCityIndex >= cities.length) {
            currentCityIndex = 0;
        }
    }, length)


    function appendWeatherInfo(){
        // first we clear any containers containing added elements
        $(`#${weatherInfo.main.alerts.alertsContainer}`).html('')
        

        if (currentCityIndex > 0) {
            console.log("Removing radar layers and currentCityIndex is greater than 0")

            radarTimeSlices.forEach((timestamp, index) => {
                const layerId = `radarlayer_${timestamp.ts}`;
                
                if (map.getLayer(layerId)) {
                    map.removeLayer(layerId);
                    map.removeSource(layerId);
                }
                
            });
        }


        if (alerts) {
            citiesAlerts[currentCityIndex].forEach((alert, i) => {
                let mainContainer = document.getElementById(weatherInfo.main.alerts.alertsContainer)
                let alertBox = document.createElement("div")
                let alertBoxContainer = document.createElement("div")
                let alertName = document.createElement("h3")
                let alertDesc = document.createElement("h4")
                let alertSource = document.createElement("img")
    
                alertBox.classList.add("main-slide-alerts-alert")
                alertBoxContainer.classList.add("alert-container")
    
    
                alertName.innerHTML = citiesAlerts[currentCityIndex][i][0]
                alertDesc.innerHTML = citiesAlerts[currentCityIndex][i][1]
    
                let sources = {
                    "National Weather Service": "images/hds2_nws.png",
                    "Environment and Climate Change Canada": "images/hds2_eccc.png",
                }
    
                alertBox.appendChild(alertBoxContainer)
    
                alertSource.src = sources[citiesAlerts[currentCityIndex][i][2]]
    
                alertSource.classList.add("alert-source")
    
                
    
                alertBox.classList.add("main-slide-alerts-alert")
    
                alertBoxContainer.appendChild(alertName)
                alertBoxContainer.appendChild(alertDesc)
                alertBox.appendChild(alertSource)
    
                mainContainer.appendChild(alertBox)
            })
        }

        // Ident info
        $(`#${mainVars.ident.mainIdentSysLocation}`).html(userConfig.opLocation)
        $(`#${mainVars.ident.mainIdentLocIntro}`).html(userConfig.ident.identGreeting)
        $(`#${mainVars.ident.mainIdentBlurb}`).html(userConfig.ident.identBlurb)
        
        // Current Weather
        document.getElementById(weatherInfo.main.currentConditions.icon).src = `images/design/fill/final/${weatherIcons[citiesCurrentIcon[currentCityIndex]][citiesCurrentDOrN[currentCityIndex]]}`;
        document.getElementById(weatherInfo.main.currentConditions.temp).innerHTML = citiesCurrentTemp[currentCityIndex]
        document.getElementById(weatherInfo.main.currentConditions.feelslike).innerHTML = citiesCurrentFeelsLike[currentCityIndex]
        document.getElementById(weatherInfo.main.currentConditions.condition).innerHTML = citiesCurrentConditionLong[currentCityIndex]
        document.getElementById(weatherInfo.main.currentConditions.wind).innerHTML = citiesCurrentWind[currentCityIndex]
        document.getElementById(weatherInfo.main.currentConditions.relHumidity).innerHTML = citiesCurrentHumidity[currentCityIndex]
        document.getElementById(weatherInfo.main.currentConditions.dewpoint).innerHTML = citiesCurrentDewpoint[currentCityIndex]
        document.getElementById(weatherInfo.main.currentConditions.pressure).innerHTML = citiesCurrentPressure[currentCityIndex]
        document.getElementById(weatherInfo.main.currentConditions.visibility).innerHTML = citiesCurrentVisibility[currentCityIndex]
        document.getElementById(weatherInfo.main.currentConditions.precip).innerHTML = citiesCurrentPrecipC[currentCityIndex]

        // Day part forecast

        // TODO: day part

        // Daily Forecast
        // TODO: code will be refactored to jquery
        for (let i = 0; i < citiesForecastDay[currentCityIndex].length; i++) {
            $(`#${weatherInfo.main.forecast.day}${i}`).html(citiesForecastDay[currentCityIndex][i])
            $(`#${weatherInfo.main.forecast.temp}${i}`).html(citiesForecastTemp[currentCityIndex][i])
            $(`#${weatherInfo.main.forecast.icon}${i}`).attr("src", `images/design/fill/final/${weatherIcons[citiesForecastIcon[currentCityIndex][i]][citiesForecastND[currentCityIndex][i]]}`)
            $(`#${weatherInfo.main.forecast.wind}${i}`).html(citiesForecastWind[currentCityIndex][i])

            if (i < 6) {
                $(`#${weatherInfo.main.forecast.low}${i}`).html(citiesForecastLowTemp[currentCityIndex][i])
            }
        }

        for (let i = 0; i < citiesForecastDaypartName[currentCityIndex].length; i++) {
            $(`#${weatherInfo.main.forecastDaypart.part}${i + 1}`).html(citiesForecastDaypartName[currentCityIndex][i])
            $(`#${weatherInfo.main.forecastDaypart.text}${i + 1}`).html(citiesForecastDaypartNarrative[currentCityIndex][i])
            $(`#${weatherInfo.main.forecastDaypart.precipC}${i + 1}`).html(citiesForecastDaypartPrecipChance[currentCityIndex][i])
            $(`#${weatherInfo.main.forecastDaypart.temp}${i + 1}`).html(citiesForecastDaypartTemp[currentCityIndex][i])
            $(`#${weatherInfo.main.forecastDaypart.icon}${i + 1}`).attr("src", `images/design/fill/final/${weatherIcons[citiesForecastDaypartIcon[currentCityIndex][i]][citiesForecastDaypartND[currentCityIndex][i]]}`)

        
        }

        $(`#${weatherInfo.main.airquality.bar.day}`).html(citiesAirQualityDay[currentCityIndex])
        $(`#${weatherInfo.main.airquality.bar.count}`).html("0")

        $(`#${weatherInfo.main.airquality.primary.name}`).html(citiesAirQualityPrimaryName[currentCityIndex])
        $(`#${weatherInfo.main.airquality.primary.amount}`).html(`${citiesAirQualityPrimaryAmount[currentCityIndex]} µg/m3`)

        Object.keys(citiesAirQualityPrimaryPollutants).forEach((pollutant, i) => {
            $(`#${weatherInfo.main.airquality.all.pollutants[pollutant]}`).html(`${citiesAirQualityPrimaryPollutants[pollutant][currentCityIndex]} µg/m3`)
        })

        function getMonthName(monthNumber) {
            const date = new Date()
            date.setMonth(monthNumber - 1)

            return date.toLocaleString('en-US', {month: 'short'})
        }

        

        // TODO: use more forEach (just makes it easier to read and understand)
        // not a MAJOR issue, but it's a good practice to use forEach when you can
    }


}

let isSeason = '';

async function backgroundCycle() {
    const backgroundElement = document.querySelector('.wallpaper')
    
    const seasons = [
        "winter",
        "spring",
        "summer",
        "autumn"
    ]

    // calculate the day of the year as a number
    var now = new Date();
    var currentDate = new Date(now.toUTCString());
    var start = new Date(currentDate.getFullYear(), 0, 0);
    var diff = currentDate - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    // determin tge seasno
    if (day <= 78) {
        isSeason = seasons[0]; // winter
    } else if (day >= 78 && day <= 171) {
        isSeason = seasons[1]; // spring
    } else if (day >= 171 && day <= 265) {
        isSeason = seasons[2]; // summer
    } else if (day >= 265 && day <= 355) {
        isSeason = seasons[3]; // autumn
    } else if (day >= 355 && day <= 365) {
        isSeason = seasons[0]; // winter
    }

    const response = await fetch('./imageIndex.json')
    const imageIndex = await response.json();

    const seasonBG = imageIndex[`bg_${isSeason}`]
    console.log(isSeason)
    const { wxbad, wxgood } = seasonBG;

    const bgCategory = isWeatherGood ? 'wxgood' : 'wxbad';
    console.log('isWeatherGood equals: ', isWeatherGood)
    const images = seasonBG[bgCategory];
    console.log('Background image category: ', bgCategory)
    const randomize = images[Math.floor(Math.random() * images.length)];

    console.log('Chosen image:', randomize)

    backgroundElement.style.backgroundImage = `url('${randomize}')`;
}

let scrollAmount = -1
let currentTextIndex = 0;

function scrollTicker() {
    if(config) {
        const scrollTextIndex = config.scrollText
    const scrollTextElement = document.getElementById('scroll')

    if(scrollAmount == -1) {
        for(const scroll in scrollTextIndex) {
            scrollAmount++;
        }
    } 
    scrollTextElement.innerText = scrollTextIndex[currentTextIndex].textContent
    if (typeof $.fn.marquee === 'function') {
        if(scrollTextIndex[currentTextIndex].scroll) {
            $(scrollTextElement).marquee({
                speed: 170,
            });
        } else {
            $(scrollTextElement).marquee('destroy')
        }
    } else {
        console.log('no marquee?!?!??!!?!');
    }
    if(currentTextIndex + 1 > scrollAmount) {
        currentTextIndex = 0
    } else {
        currentTextIndex++
    }
    } else {
        setTimeout(() => {
            scrollTicker()
        }, 18000);
    }
}

setInterval(() => {
    scrollTicker()
}, 18000);

const checkForDataInterval = setInterval(() => {
    if (Object.keys(bottomCurrentGraphData).length > 0) {
        clearInterval(checkForDataInterval)
        bottomBarLoop()
        sideBarLoop()
        mainLoop()
        backgroundCycle()
        console.log("Running Loops...")
    }
}, 5000)


