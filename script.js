

var date = new Date();

$("#searchBtn").on("click", function display() {
  event.preventDefault();
  var city = $("#searchInput").val();


  // clear input box
  // $("#searchInput" ).val("");

  var apiKey = "&appid=e5a12255ed7addfc305fdbdf86dcd1db";
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);

      getCurrentWeather(response);
      getCurrentForecast();
      makeList(city);
      ultravilut(response.coord.lat, response.coord.lon)
      
    })
    
  })
  
  function makeList(city) {
    var listItem = $("<li>").addClass("list-group-item history").text(city);
    listItem.attr("data-name",city)
    $(".list").append(listItem);
    
  }
  
  function getCurrentWeather(response) {
    var tempF = Math.floor((response.main.temp - 273.15) * 1.80 + 32);
    $("#currentCity").empty();
    
    var card = $("<div>")
    card.addClass("cardss")
    var cardBody = $("<div>").addClass("cardBody")
    var cityName = $("<h4>").addClass("cityName").text(response.name)
    var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    var temp = $("<p>").text("temprature: " + tempF + "°F")
    var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
    
    
    cityName.append(cityDate, image)
    cardBody.append(cityName, temp, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)
  
    


}


function getCurrentForecast() {
  var city = $("#searchInput").val();
  console.log(city);
  var apiKey = "&appid=e5a12255ed7addfc305fdbdf86dcd1db";
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response) {

    console.log(response);
    var results = response.list;

    $('#forecast').empty();
    $("#forcasth3").empty();
    var forecast = $("<h3>").text("Forecast Weather")
    $("#forcasth3").append(forecast)



    for (var i = 0; i < results.length; i++) {

      var day = moment((results[i].dt_txt.split(' ')[0])).format("MM/DD/YYYY");
      var hour = results[i].dt_txt.split('-')[2].split(' ')[1];
      console.log(day);
      console.log(hour);
      console.log(results[i].dt_txt.indexOf("12:00:00"))

      if (results[i].dt_txt.indexOf("12:00:00") !== -1) {

        // get the temperature and convert to fahrenheit 
        var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
        var tempF = Math.floor(temp);

        var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
        var cityDate = $("<h4>").addClass("card-title").text(day);
        var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
        var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")


        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);


      }
    }



  })
}



function ultravilut(lat, lon) {

  var apiKey = "&appid=e5a12255ed7addfc305fdbdf86dcd1db";
  var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily" + apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET"
  })
    .then(function (responseUv) {
      console.log(responseUv.current.uvi);

      if (responseUv.current.uvi < 3) {
     
        var uv = $("<h5>").text("UV: " + responseUv.current.uvi)
        uv.addClass("green")
      $("#currentCity").append(uv)

      }  if(responseUv.current.uvi >= 3 &&responseUv.current.uvi < 6) {

       var uv = $("<h5>").text("UV: " + responseUv.current.uvi)
        uv.addClass("yellow")
        $("#currentCity").append(uv)
      } if(responseUv.current.uvi >= 6 &&responseUv.current.uvi < 8) {

        var uv = $("<h5>").text("UV: " + responseUv.current.uvi)
         uv.addClass("orange")
         $("#currentCity").append(uv)
       } if(responseUv.current.uvi >= 8 &&responseUv.current.uvi < 11) {
        var uv = $("<h5>").text("UV: " + responseUv.current.uvi)
         uv.addClass("red")
         $("#currentCity").append(uv)
       }else if(responseUv.current.uvi >= 11)  {

        var uv = $("<h5>").text("UV: " + responseUv.current.uvi)
         uv.addClass("violet")
         $("#currentCity").append(uv)
       }

    })
}


// storing the item and geting it back


 
  // $(".cityName").on("click", function () {
  //   var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  //   console.log(searchHistory);
  //   var searchTerm = city;
  //   display(searchTerm)
  //   searchHistory.push(searchTerm);
  //   localStorage.setItem("search", JSON.stringify(searchHistory));

  // })

  $(document).on("click", ".history", function() {

    var history = $(this).attr("data-name")
    weather(history);
  });



  function weather(city){
    var apiKey = "&appid=e5a12255ed7addfc305fdbdf86dcd1db";
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);

      getCurrentWeather(response);
      getCurrentForecast();
      makeList(city);
      ultravilut(response.coord.lat, response.coord.lon)

    })
  }