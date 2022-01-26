var input = document.getElementById("input")
var searchbutton = document.getElementById("searchBttn")
var cityWeather = document.getElementById("cityWeather")
var fiveDay = document.getElementById("fiveDay")
searchbutton.addEventListener("click", function () {
    console.log(input.value)
    APIcall(input.value)
})
function APIcall(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b8033cd6f91ebcbedb1a8f2576574c01&units=imperial')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            cityWeather.innerHTML = ""
            var forecastContainer = document.createElement("div")
            var cityName = document.createElement("h1")
            var temp = document.createElement("h3")
            var wind = document.createElement("h3")
            var humidity = document.createElement("h3")
            var uvIndex = document.createElement("h3")
            var icon = document.createElement("img")
            cityName.innerText = data.name
            forecastContainer.append(cityName)
            temp.innerText = data.main.temp
            forecastContainer.append(temp)
            wind.innerText = data.wind.speed
            forecastContainer.append(wind)
            humidity.innerText = data.main.humidity
            forecastContainer.append(humidity)
            icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            forecastContainer.append(icon)
            cityWeather.append(forecastContainer)
            fiveDayForecast(city)
        });

}
function fiveDayForecast(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ city +'&appid=b8033cd6f91ebcbedb1a8f2576574c01&units=imperial')
        .then(response => response.json())
        .then(data => { console.log(data) 
            var day = 1
        for (var i =6; i < data.list.length; i += 8) {
            var fiveDayContainer = document.createElement("div")
            var temp = document.createElement("h5")
            var humidity = document.createElement("h5")
            var wind = document.createElement("h5")
            var date = document.createElement("h5")
            var icon = document.createElement("img")
            temp.innerText = data.list[i].main.temp
            fiveDayContainer.append(temp)
            humidity.innerText = data.list[i].main.humidity
            fiveDayContainer.append(humidity)
            wind.innerText = data.list[i].wind.speed
            fiveDayContainer.append(wind)
            icon.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
            fiveDayContainer.append(icon)
            date.innerText = moment().add(day,"days").calendar()
            day++
            fiveDayContainer.append(date)
            fiveDay.append(fiveDayContainer)
        }
    })
}

