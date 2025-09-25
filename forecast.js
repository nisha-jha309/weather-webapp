async function getForeCast() {
const options = {
	method: 'GET',
	headers: {
		// 'x-rapidapi-key': 'eacb455dd7msh6dde57f899592adp13dde7jsn9df9e9f7391c',
    		'x-rapidapi-key': '0895e72151mshb046b57d01ddb8dp1bb990jsnf5c87e44c54d',
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
document.getElementById("chances-of-rain").innerText=`${result2[0].day.daily_chance_of_rain}%`;


document.getElementById("temperature").innerText=`${result2[0].day.avgtemp_c}°C`;


document.getElementById("humidity").innerText=`${result2[0].day.avghumidity}`;
document.getElementById("uv").innerText=`${result2[0].day.uv}`;



let hourlyHTML = "";
for(let index=0;index<=2;index++){
  hourlyHTML+=`<div class="forecast-criterias">
        <p>HOURLY FORECAST (<span class="day-name"></span>)</p>
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

let Day=document.getElementsByClassName("day-name");

for (let index=0;index<Day.length;index++){
  const dateStr = result2[index].date; 
const dateObj = new Date(dateStr);
if(index===0){
 Day[index].textContent="Today";
}
else if(index===1){
 Day[index].textContent="Tomorrow";
}
else{
Day[index].textContent=`${dateObj.toLocaleDateString("en-US",{weekday:"long"})}`;
}
}
} 

  } catch (err) {
      console.error("Weather fetch failed:", err);
    }
        
}

getForeCast();


