const container =  document.getElementById('container');


let h1TextSize = "3vw"
let h2TextSize = "2.2vw"
let h3TextSize = "1.5vw"
let h4TextSize = "1.2vw"
let h5TextSize = "0.8vw"
let disclaimerTextSize = "0.5vw"

let customTextSizeSidebarPrimary = "0.9vw"
let customTextSizeSidebarSecondary = "1.2vw"

let borderRadius1 = "0.6vw"
let borderRadius2 = "0.8vw"
let borderRadius3 = "1vw"
let borderRadius4 = "1.2vw"

let customIdentLineHeight = "2.5vw"

let windowWidth, windowHeight;


function findMaxHeightWidth() {
    const aspectRatio = 16 / 9
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight


    let maxWidth = windowWidth;
    let maxHeight = windowHeight;
    let scaleFactor;


    if (windowWidth / windowHeight >= aspectRatio) {
        // code for when the window is wider than the aspect ratio
        maxWidth = windowHeight * aspectRatio

        h1TextSize = 0.030 * maxWidth + "px"
        h2TextSize = 0.022 * maxWidth + "px"
        h3TextSize = 0.015 * maxWidth + "px"
        h4TextSize = 0.012 * maxWidth + "px"
        h5TextSize = 0.010 * maxWidth + "px"
        disclaimerTextSize = 0.005 * maxWidth + "px"

        customTextSizeSidebarPrimary = 0.009 * maxWidth + "px"
        customTextSizeSidebarSecondary = 0.012 * maxWidth + "px"

        borderRadius1 = 0.006 * maxWidth + "px"
        borderRadius2 = 0.008 * maxWidth + "px"
        borderRadius3 = 0.010 * maxWidth + "px"
        borderRadius4 = 0.012 * maxWidth + "px"

        customIdentLineHeight = 0.025 * maxWidth + "px"

    } else {
        // code for when the window is taller than the aspect ratio
        maxHeight = windowWidth / aspectRatio

        h1TextSize = "3vw"
        h2TextSize = "2.2vw"
        h3TextSize = "1.5vw"
        h4TextSize = "1.2vw"
        h5TextSize = "1vw"
        disclaimerTextSize = "0.5vw"

        customTextSizeSidebarPrimary = "0.9vw"
        customTextSizeSidebarSecondary = "1.2vw"

        borderRadius1 = "0.6vw"
        borderRadius2 = "0.8vw"
        borderRadius3 = "1vw"
        borderRadius4 = "1.2vw"

        customIdentLineHeight = "2.5vw"

    }
    document.documentElement.style.setProperty('--borderRadius1', borderRadius1);
    document.documentElement.style.setProperty('--borderRadius2', borderRadius2);
    document.documentElement.style.setProperty('--borderRadius3', borderRadius3);
    document.documentElement.style.setProperty('--borderRadius4', borderRadius4);

    document.documentElement.style.setProperty('--customIdentLineHeight', customIdentLineHeight);

    document.documentElement.style.setProperty('--h1TextSize', h1TextSize);
    document.documentElement.style.setProperty('--h2TextSize', h2TextSize);
    document.documentElement.style.setProperty('--h3TextSize', h3TextSize);
    document.documentElement.style.setProperty('--h4TextSize', h4TextSize);
    document.documentElement.style.setProperty('--h5TextSize', h5TextSize);
    document.documentElement.style.setProperty('--disclaimerTextSize', disclaimerTextSize);

    document.documentElement.style.setProperty('--customTextSizeSidebarPrimary', customTextSizeSidebarPrimary);
    document.documentElement.style.setProperty('--customTextSizeSidebarSecondary', customTextSizeSidebarSecondary);
    
    container.style.maxWidth = `${maxWidth}px`
    container.style.maxHeight = `${maxHeight}px`

}
findMaxHeightWidth();

window.addEventListener('resize', findMaxHeightWidth)


export function adjustMapSize() {
    const mainRadarContainer = document.getElementById('main-radar');
    const map = document.getElementById('map');

    const chart = document.getElementById("bottom-proj-chart-1")
    const chartContainer = document.getElementById("bottom-proj-chart-container")


    let radarWidth = mainRadarContainer.clientWidth;
    let radarHeight = mainRadarContainer.clientHeight;
    let mapWidth = map.clientWidth;
    let mapHeight = map.clientHeight;

    let chartWidth = chart.clientWidth;
    let chartHeight = chart.clientHeight;

    let chartContainerWidth = chartContainer.clientWidth
    let chartContainerHeight = chartContainer.clientHeight

    let scaleFactorWidth = radarWidth / mapWidth;
    let scaleFactorHeight = radarHeight / mapHeight;
    let scaleFactor = Math.min(scaleFactorWidth, scaleFactorHeight);

    let chartScaleFactorWidth = chartContainerWidth / chartWidth;
    let chartScaleFactorHeight = chartContainerHeight / chartHeight;
    let chartScaleFactor = Math.min(chartScaleFactorWidth, chartScaleFactorHeight);

    map.style.transform = `scale(${scaleFactor})`;
    map.style.transformOrigin = 'top left';
    map.style.imageRendering = `high-quality`;

    chart.style.transform = `scale(${chartScaleFactor})`;
    chart.style.transformOrigin = 'top left';
    chart.style.imageRendering = `high-quality`;
}

adjustMapSize();

window.addEventListener('resize', adjustMapSize);


/* this is the same exact code used in early-2023 METEOchannel 
and we haven't bothered to rewrite the stupid thing since. */
// nvm we changed it. (update 2023.09.05)
function initDateTime() {
    let datetime = document.getElementById("datetime");
    let datetimeDay = document.getElementById("datetime-day");

    let timezones = ["America/Regina", "America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York", "Atlantic/Reykjavik"];
    let currentTimezoneIndex = 0;

    function updateDatetime() {
        const now = new Date();
        const utcDate = new Date(now.toUTCString());

        const currentTimezone = timezones[currentTimezoneIndex];
        const options = {
            timeZone: currentTimezone,
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };

        const dateFormatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = dateFormatter.format(utcDate);

        datetime.innerHTML = formattedDate;
    }
    
    function getDay(){
        const day = new Date()
        const options = {
            year: 'numeric',
            month: 'long', 
            day: 'numeric', 
        }
        
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(day);
        datetimeDay.innerHTML = formattedDate
    }
    setInterval(getDay, 1000)

    setInterval(updateDatetime, 1000);

    setInterval(() => {
        setTimeout(() => {
            currentTimezoneIndex = (currentTimezoneIndex + 1) % timezones.length;
            updateDatetime();
            $(datetime).fadeIn()
        }, 500)

        setTimeout(() => {
            $(datetime).fadeOut()
            console.log("fading out")
        }, 9500)
    },  10000);


    // Initial update
    updateDatetime();
    getDay()
}

function extraText() {
    const seasonMsg = document.getElementById('seasonmsg');
    var now = new Date();
    var currentDate = new Date(now.toUTCString());
    var start = new Date(currentDate.getFullYear(), 0, 0);
    var diff = currentDate - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    const textList = {
        spring: "spring",
        summer: "sumter",
        autumn: "fall",
        winter: "Omg its so cold bru",
        newYear: "Happy Crawford Year 2025!",
        christmas: "chsrtams",
        easter: "egg season",
        thanksgivingUSA: "thnanks giving",
        thanksgivingCanada: "thnanks giving",
    }

    let textValue = ''
    if (day <= 78) {
        seasonMsg.innerHTML = textList.winter
    } else if (day >= 78 && day <= 171) {
        seasonMsg.innerHTML = textList.spring
    } else if (day >= 171 && day <= 265) {
        seasonMsg.innerHTML = textList.summer
    } else if (day >= 265 && day <= 355) {
        seasonMsg.innerHTML = textList.autumn
    } else if (day >= 355 && day <= 357) {
        seasonMsg.innerHTML = textList.winter
    } else if (day >= 357 && day <= 360) {
        seasonMsg.innerHTML = textList.christmas
    } else if (day >= 360) {
        seasonMsg.innerHTML = textList.newYear
    }

}

setInterval(extraText, 1000);

initDateTime();

// hi guys peyton here
