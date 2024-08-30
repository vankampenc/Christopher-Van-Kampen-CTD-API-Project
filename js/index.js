//FETCH WEATHER API
// FETCH API
const grWeatherURL = "https://api.open-meteo.com/v1/forecast?latitude=42.9634&longitude=-85.6681&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,daylight_duration,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=14"
;
const zeelandWeatherURL = "https://api.open-meteo.com/v1/forecast?latitude=42.8125&longitude=-86.0186&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,daylight_duration,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=14"
;

// City Selector
let city = "grandRapids"

document.addEventListener('input',(e)=>{

    if(e.target.getAttribute('name')=="city")
    city = e.target.value
    addWeather();
    })


const degreeFahrenheitSymbol = "\u00B0F";


// Fetch Weather
async function weatherAPI() {
    try {
        const response = await fetch(
            city==="grandRapids"?grWeatherURL:zeelandWeatherURL
        );

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const data = await response.json();
        console.log(data);
        return data;
    }   catch (error) {
        console.error('ERROR', error);
    }
}



async function addWeather() {
    const weatherSection = document.getElementById("weather");
    const currentTempDiv = weatherSection.getElementsByClassName('currentTemp')[0];
    const weather = await weatherAPI();
    const dailyPrecipProbabilityDiv = weatherSection.getElementsByClassName('precipProb')[0];
    dailyPrecipProbabilityDiv.innerHTML =""
    const dailyPrecipWeather = weather.daily.precipitation_probability_max
    const dailyDate = weather.daily.time

    currentTempDiv.innerHTML = `${weather.current.temperature_2m} ${degreeFahrenheitSymbol}`


    for (let i=0; i<dailyPrecipWeather.length; i++) {

        const precipProb = dailyPrecipWeather[i];
        const precipDate = dailyDate[i];

        const dailyDiv = document.createElement('div');

        dailyDiv.innerHTML = `<span class="dailySpan">${precipDate}</span><span class="dailySpan">${precipProb}%</span>`;

        //Apending
        dailyPrecipProbabilityDiv.appendChild(dailyDiv)

        
    }

}

addWeather()

