//FETCH WEATHER API
// FETCH API
const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=42.9634&longitude=-85.6681&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,daylight_duration,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=14"
;

async function weatherAPI() {
    try {
        const response = await fetch(weatherURL);

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

weatherAPI()