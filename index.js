
    const apiKey = "01375ce5a24ad5eae0d5f0023ffef282";

    document.getElementById("searchWeather").addEventListener("click", () => {
      const city = document.getElementById("city").value.trim();
      const output = document.getElementById("output");

      if (!city) {
        output.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
      }

      output.innerHTML = '<p class="loading">Loading...</p>';

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
          if (!response.ok) {
            throw new Error("City not found or invalid API key.");
          }
          return response.json();
        })
        .then(data => {
          const { name, main, weather, sys,wind,clouds,rain} = data;
          const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

          output.innerHTML = `
            <h2>${name}, ${sys.country}</h2>
            <img src="${icon}" alt="${weather[0].description}">
            <p>Temperature: ${main.temp}°C</p>
            <p>Feels like: ${main.feels_like}°C</p>
              <p>Wind Pressure: ${main.pressure}°C</p>
                    <p>Wind Direction: ${wind.deg}°C</p>
                         <p>Cloud: ${clouds.all}°C</p>
                          <p>Rain Volume (Last Hour): ${rain ? rain['24h'] : 0} mm</p>
  <p>Sunrise: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>            
  <p>Humidity: ${main.humidity}%</p>
            <p>Condition: ${weather[0].description}</p>
          `;
        })
        .catch(err => {
          output.innerHTML = `<p class="error">${err.message}</p>`;
        });
    });