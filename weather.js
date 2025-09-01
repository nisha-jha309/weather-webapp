async function getWeather() {
       document.getElementById("search").addEventListener("click",async ()=>{
        let city = document.getElementById("cityname").value.trim().replace(" ","");
        let country = document.getElementById("datalistOptions").value;
     const url1 = `https://global-weather-api1.p.rapidapi.com/weather?city=${city},${country}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'eacb455dd7msh6dde57f899592adp13dde7jsn9df9e9f7391c',
		'x-rapidapi-host': 'global-weather-api1.p.rapidapi.com',
		'x-api-key': '29gcWxc1xHP498ntsy'
	}
};

const url2 = `https://global-weather-api1.p.rapidapi.com/forecast?city=${city}`;
    try {
      const response = await fetch(url1, options);
      const result = await response.json();
    console.log(result);

    const response2= await fetch(url2,options);
    const result2 =await response2.json();
    console.log(result2);
    

    const temperatureImage=document.querySelector("#temperatureBox>img");

    if(city){
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
    document.getElementById("feels-like").innerText="~"+result.feelslike_c+"°C";
   document.getElementById("humidity").innerText=result.humidity+"%";
document.getElementById("wind").innerText=result.wind_kph+"Km/h";
 }else{
    document.getElementById("temperature").innerText=0+"°C";
    document.getElementById("feels-like").innerText=0+"°C";
   document.getElementById("humidity").innerText=0+"%";
document.getElementById("wind").innerText=0+"Km/h";
     alert("Please enter a city name!");
      return;
 }

  } catch (err) {
      console.error("Weather fetch failed:", err);
    }
        
}
)
}

getWeather();
