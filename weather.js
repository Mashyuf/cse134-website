window.addEventListener('DOMContentLoaded', (e) => {
    weather = document.querySelector('weather-widget');
    fetch('https://api.weather.gov/points/32.8801,-117.2340')
			.then(response => {
				// Check if the response is ok (status in the range 200-299)
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
                let forecastURL = (data.properties.forecast);
				fetch(forecastURL)
                    .then(response => {
                        if(!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        let regexIcon = /(?<=\/)(\w*?_*?)(?=\?)/;
                        let icon = regexIcon.exec(data.properties.periods[0].icon);
                        weather.shadowRoot.innerHTML = 
                        iconFinder(icon[0]) +
                        '<br><br>' + 'Temperature: ' + data.properties.periods[0].temperature + '&deg;F' +
                        '<br>' + 'Humidity: ' + data.properties.periods[0].relativeHumidity.value + '%' +
                        '<br>' + data.properties.periods[0].shortForecast +
                        '<br>' + 'Wind: ' + data.properties.periods[0].windSpeed + ' ' + data.properties.periods[0].windDirection;
                    })
                    .catch(error => {
                        // Handle any errors
                        console.error('Fetch error:', error);
                        output.textContent = 'Error fetching time';
                    });
			})
			.catch(error => {
				// Handle any errors
				console.error('Fetch error:', error);
				weather.shadowRoot.innerHTML = 'Error fetching time';
			});
});

customElements.define('weather-widget', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = ' ';
    };
});

function iconFinder(status) {
    if (status == 'skc') {
        return '&#x2600;';
    } else if (status == 'fog' || 'smoke' || 'haze') {
        return '&#x1F32B;';
    } else if (status == 'few' || 'sct') {
        return '&#x1F324;';
    } else if (status == 'bkn' || 'ovc') {
        return '&#x2601;';
    } else if (status == 'wind_skc') {
        return '&#x1F32C; &#x2600;'
    } else if (status == 'wind_few' || 'wind_sct') {
        return '&#x1F32C; &#x1F324;';
    } else if (status == 'wind_bkn' || 'wind_ovc') {
        return '&#x1F32C; &#x2601;';
    } else if (status == 'snow' || 'snow_sleet' || 'blizzard') {
        return '&#x1F328;';
    } else if (status == 'rain_snow' || 'rain_sleet' || 'snow_fzra' || 'sleet') {
        return '&#x2746; &#x1F327;';
    } else if (status == 'rain' || 'fzra' || 'rain_fzra' || 'rain_showers' || 'rain_showers_hi') {
        return '&#x1F327;';
    } else if (status == 'tsra' || 'tsra_sct' || 'tsra_hi') {
        return '&#x26C8;';
    } else if (status == 'tornado') {
        return '&#x1F32A;';
    } else if (status == 'hurricane' || 'tropical_storm') {
        return '&#x1F300;';
    } else if (status == 'dust') {
        return '&#x1F3DC;';
    } else if (status == 'hot') {
        return '&#x1F323;';
    } else if (status == 'cold') {
        return '&#x2603;';
    } else {
        return '&#x2600;';
    }
};

