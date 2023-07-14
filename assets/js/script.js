
// var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=7a2a3e009ff8ece7e90ad8dae53147aa"

// *** Document References
var searchFormEl = document.querySelector('#searchForm'); 
var cityInputVal = document.querySelector('#searchCity');
var searchBtn = document.querySelector ('.btn-primary');
var currentCityInfo = document.querySelector('#currentCityInfo');
var currentTemp = document.querySelector('#currentTemp');
var currentWind = document.querySelector('#currentWind');
var currentHumidity = document.querySelector('#currentHumidity');
var rightNowTD = dayjs().format('dddd, MMMM D YYYY h:m a ').toString();


 
var displayForecast = {
  keyID : '7a2a3e009ff8ece7e90ad8dae53147aa',
  fetchWeather: function (){
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=London&appid=7a2a3e009ff8ece7e90ad8dae53147aa'
    )
    .then((response) => response.json())
    .then((data) => console.log(data));
  }
  


}

//displayForecast()

// console.log(currentWeather);
console.log (rightNowTD);

// searchBtn.addEventListener('submit', displayForecast);

