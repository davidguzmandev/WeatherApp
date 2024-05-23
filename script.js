const API_KEY = 'd10cbcbfd6e094048f2b6026e76058dd'
const url = `https://api.openweathermap.org/data/2.5/weather`
background();

document.getElementById('search').addEventListener('click', () => {
    const city = document.getElementById('city').value;

    if (city) {
        fetchWeather(city);
    } else {
        alert('Please write the name of the city');
    }
});

function fetchWeather(city) {
    fetch(`${url}?q=${city}&appid=${API_KEY}&units=metric`)
    .then(data => data.json())
    .then(data => showWeather(data))
}

function clouds (data){
    if (data.clouds.all < 20) {
        return 'Sunny';
    } else if (data.clouds.all >= 20 && data.clouds.all < 40) {
        return 'Mostly Sunny'
    } else if (data.clouds.all >= 40 && data.clouds.all < 60){
        return 'Partly Cloudy'
    } else if (data.clouds.all >= 60 && data.clouds.all < 80){
        return 'Partly Sunny'
    } else if (data.clouds.all >= 80 && data.clouds.all <= 99){
        return 'Mostly Cloudy'
    } else {
        return 'Cloudy'
    }
};

function getIcon (data) {
    const url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    console.log(data.weather[0].icon);
    return url
}

function showWeather(data) {
    const showData = document.getElementById('showWeather');
    showData.innerHTML = '';

    const cityName = data.name;
    const countryName = data.sys.country;
    const temp = Math.round(data.main.temp);
    const cloud =  clouds(data);
    const feelsLike = Math.round(data.main.feels_like);
    const tempMin = Math.round(data.main.temp_min);
    const tempMax = Math.round(data.main.temp_max);
    const humidity = data.main.humidity;
    const icon = getIcon(data);

    showData.innerHTML = `

        <p class="city">${cityName}, ${countryName}</p>
        <p class="temp">${temp}°</p>
        <p class="cloud">${cloud}</p>
        <p class="img"><img src="${icon}" ></p>
        <p class="info">Feels Like: ${feelsLike}°</p>
        <p class="info">H:${tempMax}° L:${tempMin}°</p>
        <p class="info">Humidy: ${humidity}</p>
        <br>
    `
}

function background(){
    const d = new Date();
    
    const container = document.querySelector('.container');

    if(d.getHours() < 10){
        container.classList.add('containerM');
    } else if(d.getHours() < 17){
        container.classList.add('containerA');
    } else {
        container.classList.add('containerN');
    }
    
}