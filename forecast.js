async function getForeCast() {
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'eacb455dd7msh6dde57f899592adp13dde7jsn9df9e9f7391c',
		'x-rapidapi-host': 'global-weather-api1.p.rapidapi.com',
		'x-api-key': '29gcWxc1xHP498ntsy'
	}
};
const cityname=localStorage.getItem("city");
const countryname=localStorage.getItem("country");
   
const weatherdata=JSON.parse(localStorage.getItem("weatherData"));

// console.log(city,country)
const url2 = `https://global-weather-api1.p.rapidapi.com/forecast?city=${cityname},${countryname}`;
    try {
        const response2= await fetch(url2,options);
    const result2 =await response2.json();
    console.log(result2);
    

document.getElementById("sunrise").innerHTML=`Rise: ${result2[0].astro.sunrise}`;
document.getElementById("sunset").innerHTML=`Set: ${result2[0].astro.sunset}`;

document.getElementById("moonphase").innerText=`${result2[0].astro.moon_phase}`;
document.getElementById("moonrise").innerText=`Rise: ${result2[0].astro.moonrise}`;
document.getElementById("moonset").innerText=`Set: ${result2[0].astro.moonset}`;


document.getElementById("condition").innerText=`${result2[0].day.condition.text}   `;
document.getElementById("weatherIcon").src=`${result2[0].day.condition.icon}  `;

document.getElementById("temperature").innerText=`${weatherdata.temperature_c}°C`;

document.getElementById("feelslike").innerText=`feels like ${weatherdata.feelslike_c}°C`;

document.getElementById("chances-of-rain").innerText=`${result2[0].day.daily_chance_of_rain}%`;

document.getElementById("humidity").innerText=`${weatherdata.humidity}`;
document.getElementById("uv").innerText=`${weatherdata.uv_index}`;



let hourlyHTML = "";
for(let index=0;index<=2;index++){
  hourlyHTML+=`<div class="forecast-criterias">
        <p>HOURLY FORECAST</p>
        <hr>
        <div id="hourly">
`;

result2[index].hour.forEach(element => {
    console.log(element);
    const timeParts = element.time.split(" "); 
  const hourTime = timeParts[1]; // "14:00"
    hourlyHTML+=`
<div class="hour">
<p class="hour-time">${hourTime}</p>
<img src="${element.condition.icon}"/>
<p class="hour-condition">${element.condition.text}</p>
</div>
`;
})

hourlyHTML+=`</div>
</div>`;
document.getElementById("hourly-weathers").innerHTML=hourlyHTML;
} 

  } catch (err) {
      console.error("Weather fetch failed:", err);
    }
        
}

getForeCast();


