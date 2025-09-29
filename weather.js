async function getWeather() {
    document.getElementById("search").addEventListener("click", async () => {
        let city = document.getElementById("cityname").value.trim().replace(" ", "");
        let Region_country_input = document.getElementById("exampleDataList").value;
        const Region_country=Region_country_input.split(",");
        let region=Region_country[0];
        let country= Region_country[1];
        localStorage.setItem("city", city);
        localStorage.setItem("country", country);
        localStorage.setItem("region",region)

        const url1 = `https://global-weather-api1.p.rapidapi.com/weather?city=${city},${region},${country}`;
        const options = {
            method: 'GET',
            headers: {
                // 'x-rapidapi-key': 'eacb455dd7msh6dde57f899592adp13dde7jsn9df9e9f7391c',
                		'x-rapidapi-key': '0895e72151mshb046b57d01ddb8dp1bb990jsnf5c87e44c54d',
                'x-rapidapi-host': 'global-weather-api1.p.rapidapi.com',
                'x-api-key': '29gcWxc1xHP498ntsy'
            }
        };

        try {
            const response = await fetch(url1, options);
            const result = await response.json();
            console.log(result);

            localStorage.setItem("weatherData", JSON.stringify(result));

            const temperatureImage = document.querySelector("#temperatureBox>img");

            if (city) {
                if (result.temperature_c <= 10) {
                    temperatureImage.src = "assets/low-temperature.png"
                } else if (result.temperature_c > 10 && result.temperature_c <= 19) {
                    temperatureImage.src = "assets/low-temperature.png";
                }
                else if (result.temperature_c >= 20 && result.temperature_c <= 29) {
                    temperatureImage.src = "assets/normal-temperature.png";
                } else if (result.temperature_c >= 30 && result.temperature_c <= 34) {
                    temperatureImage.src = "assets/high-temperature.png";
                } else if (result.temperature_c >= 35) {
                    temperatureImage.src = "assets/high-temperature.png";
                } else {
                    temperatureImage.src = "assets/temperature.png"
                }


                document.getElementById("temperature").innerText = result.temperature_c + "°C";
                document.getElementById("feels-like").innerText = "~" + result.feelslike_c + "°C";
                document.getElementById("humidity").innerText = result.humidity + "%";
                document.getElementById("wind").innerText = result.wind_kph + "Km/h";

                const addtoFavBtn = document.getElementById("addtoFav-btn");
        addtoFavBtn.onclick = () => {
          let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

          const newFav = {
            city: city,
            country: country,
            region: region,
            feelsLike: result.feelslike_c,
            temperature: result.temperature_c,
            condition: result.condition,
            icon: result.icon_url
          };

          if (!favorites.some(f => f.city === city && f.country === country)) {
            favorites.push(newFav);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            console.log(favorites);
            alert(`${city}, ${country} added to Favorites`);
          } else {
            alert("This city is already in favorites!");
          }
        };
            } else {
                document.getElementById("temperature").innerText = 0 + "°C";
                document.getElementById("feels-like").innerText = 0 + "°C";
                document.getElementById("humidity").innerText = 0 + "%";
                document.getElementById("wind").innerText = 0 + "Km/h";
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
