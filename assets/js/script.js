// *** Document References
var searchFormEl = document.getElementById('searchForm'); 
var searchBtn = document.getElementById('search-btn');
var currentCityInfo = document.getElementById('currentCityInfo');
var currentTemp = document.getElementById('currentTemp');
var currentWind = document.getElementById('currentWind');
var currentHumidity = document.getElementById('currentHumidity');

var priorSearchedCities = [];
var priorSearchedContainer = document.getElementById('history');

 // *** Fetch current weather from searched city
var weather = {
  keyID : '&appid=7a2a3e009ff8ece7e90ad8dae53147aa',
  fetchWeather: function (city){
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=imperial' + this.keyID
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },
  displayWeather : function(data){
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log (name, icon, description,temp,humidity, speed);
    document.querySelector('#currentCityInfo').innerHTML = 'Weather in ' + name;
    document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
    document.querySelector('#timeDate').innerHTML = dayjs().format('dddd, MMMM D YYYY').toString();
    document.querySelector('.weatherDescription').innerHTML = description;
    document.querySelector('.grados').innerHTML = temp + '°F';
    document.querySelector('#currentHumidity').innerHTML = humidity + ' %';
    document.querySelector('#currentWind').innerHTML = speed ;
  },

  // *** 5 Day weather Forecast 
  fetchForecast: function (city){
    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=' + city + weather.keyID
    )
    .then(response => response.json())
        .then(data => {
            var fiveDayForecast = document.getElementById('futureWeather');
            fiveDayForecast.innerHTML = '';
            for (let i = 0; i < data.list.length; i += 8) {
                fiveDayForecast.innerHTML += `
                      <div class="col fiveDayForecastCard">
                      <h5 class="text-left">${new Date(data.list[i].dt_txt).toLocaleDateString()}</h5>
                      <p class="text-left">Temperature: ${data.list[i].main.temp} F</p>
                      <p class="text-left">Wind Speed: ${data.list[i].wind.speed} MPH</p>
                      <p class="text-left">Humidity: ${data.list[i].main.humidity} %</p>
                    </div>`;
            }
        });
  },
};

// *** Preload weather info to begin
weather.fetchWeather('austin');
weather.fetchForecast('austin');


// *** Search for city
searchBtn.addEventListener('click', function(event){
  event.preventDefault();
  var cityInputVal = document.getElementById('searchCity').value; 
  weather.fetchWeather(cityInputVal);
  weather.fetchForecast(cityInputVal);
   console.log(cityInputVal);
   
});
