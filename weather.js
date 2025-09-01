async function getWeather() {
       document.getElementById("search").addEventListener("click",async ()=>{
        let city = document.getElementById("cityname").value.trim().replace(" ","");
            const url = `https://global-weather-api1.p.rapidapi.com/weather?city=${city}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'eacb455dd7msh6dde57f899592adp13dde7jsn9df9e9f7391c',
		'x-rapidapi-host': 'global-weather-api1.p.rapidapi.com',
		'x-api-key': '29gcWxc1xHP498ntsy'
	}
};

    try {
      const response = await fetch(url, options);
      const result = await response.json();
    console.log(result);
    

    const temperatureImage=document.querySelector("#temperatureBox>img");

    if(result.temperature_c<=10){
        temperatureImage.src="assets/low-temperature.png"
    }else if(result.temperature_c>10 && result.temperature_c<=19){
        temperatureImage.src="assets/low-temperature.png";
    }
    else if(result.temperature_c>=20 && result.temperature_c<=29){
        temperatureImage.src="assets/normal-temperature.png";
    } else if(result.temperature_c>=30 && result.temperature_c<=34){
        temperatureImage.src="assets/hot-temperature.png";
    } else if(result.temperature_c>=35){
        temperatureImage.src="assets/high-temperature.png";
    }

    document.getElementById("temperature").innerText=result.temperature_c+"°C";
    document.getElementById("feels-like").innerText=result.temperature_c+"°C";


        document.getElementById("humidity").innerText=result.humidity+"%";

        document.getElementById("wind").innerText=result.wind_kph+"Km/h";

    } catch (err) {
      console.error("Weather fetch failed:", err);
    }
        })
}

getWeather();
