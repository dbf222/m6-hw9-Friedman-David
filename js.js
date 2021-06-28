/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
var form = document.querySelector(".top form");
var input = document.querySelector(".top input");
var msg = document.querySelector(".top .msg");
var list = document.querySelector(".ajax-section .cities");

var apiKey = "e9a8d86bdcbb99be3615f0309dd8aea2";


form.addEventListener("submit", (e) => {
  e.preventDefault();
  var listItems = list.querySelectorAll(".ajax-section .city");
  var inputVal = input.value;

  //ajax here
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var { main, name, sys, weather } = data;
      var icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      var li = document.createElement("li");
      li.classList.add("city");
      var markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>


        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>

        <div class="city-temp"><span>Currently: ${Math.round(main.temp)}<sup>°</sup></span>C</div>

        <div class="feels-like"><span>Feels like: ${Math.round(main.feels_like)}<sup>°</sup>F</span></div>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Cant find the city you were looking for";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});
