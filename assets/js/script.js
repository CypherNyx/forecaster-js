
// var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=7a2a3e009ff8ece7e90ad8dae53147aa"

// *** Document References
var searchFormEl = document.getElementById('searchForm'); 
var cityInputVal = document.getElementById('searchCity');
var searchBtn = document.querySelector ('.btn-primary');
var currentCityInfo = document.getElementById('currentCityInfo');
var currentTemp = document.getElementById('currentTemp');
var currentWind = document.getElementById('currentWind');
var currentHumidity = document.getElementById('currentHumidity');




 // Fetch current weather from searched city
var weather = {
  keyID : '7a2a3e009ff8ece7e90ad8dae53147aa',
  fetchWeather: function (city){
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=imperial&appid=' + this.keyID
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
    document.querySelector('#timeDate').innerHTML = dayjs().format('dddd, MMMM D YYYY h:m a').toString();
    document.querySelector('.weatherDescription').innerHTML = description;
    document.querySelector('.grados').innerHTML = temp + '°F';
    document.querySelector('#currentHumidity').innerHTML = `Humidity
     ${humidity}%` ;
    document.querySelector('#currentWind').innerHTML = 'Wind speed ' + speed + 'miles/h';
  },
  search : function(){
    this.fetchWeather(cityInputVal);
  }


};


searchBtn.addEventListener('click', function(){
  weather.search();

});

