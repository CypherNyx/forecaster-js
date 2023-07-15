// *** Document References
var searchFormEl = document.getElementById('searchForm'); 
var searchBtn = document.getElementById('search-btn');
var currentCityInfo = document.getElementById('currentCityInfo');
var currentGrados = document.getElementById('grados');
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
    currentCityInfo.innerHTML = 'Weather in ' + name;
    document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
    document.querySelector('#timeDate').innerHTML = dayjs().format('dddd, MMMM D YYYY').toString();
    document.querySelector('.weatherDescription').innerHTML = description;
    currentGrados.innerHTML = temp + '°F';
    currentHumidity.innerHTML = humidity + ' %';
    currentWind.innerHTML = speed ;
  },

  // *** 5 Day weather Forecast 
  fetchForecast: function (city){
    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=' + city +'&units=imperial' + weather.keyID
    )
    .then(response => response.json())
        .then(data => {
            var fiveDayForecast = document.getElementById('futureWeather');
            fiveDayForecast.innerHTML = '';
             for (let i = 0; i < data.list.length; i += 8) {
              var weatherIcon = data.list[i].weather[0].icon;
              var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";  
              fiveDayForecast.innerHTML += `
                      <div class="col fiveDayForecastCard">
                      <h5 class="text-center">${new Date(data.list[i].dt_txt).toLocaleDateString()}</h5>
                      <p class="text-center"><img class="cardWthrIcon" src="${iconUrl}"></p>
                      <p class="text-center">Temperature: ${data.list[i].main.temp} F</p>
                      <p class="text-center">Wind Speed: ${data.list[i].wind.speed} MPH</p>
                      <p class="text-center">Humidity: ${data.list[i].main.humidity} %</p>
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

  
  
});

// //***** Search History 

function storeCity(cityInputVal){
  var cities = localStorage.getItem("oldCities");
  if (!cities){
    priorSearchedCities.push(cityInputVal);
    localStorage.setItem("oldCities", JSON.stringify(priorSearchedCities));
  } else {
    cities.push(priorSearchedCities);
    localStorage.setItem("oldCities", cities);
    

  }
};

console.log('array history', priorSearchedCities);

// function renderMessage() {
//   var listSearched = JSON.parse(localStorage.getItem("priorSearchedCities"));
//   if (listSearched !== null) {
//     document.querySelector(".message").textContent = listSearched.student + 
//     " received error" 
//   }
// }

