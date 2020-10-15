 // function hideonload(){
        // $("#hideonload").css("display","block")
        // }

        var cities = ["Seattle",];

        function displayCityInfo() {

            var city = $(this).attr("data-name");
            var APIkey = "&appid=3ab769e1d5edf7b37431bdd5400d6c70"
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIkey;


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                // $("#cities-view").text(JSON.stringify(response));
                console.log(response);

                var cityDiv = $("<div class='cityDiv'>");
                var cityBigname = response.name;
                var CurrentDate = moment().format('l');

                var pOneText = ((cityBigname) + (" ") + ("(") + (CurrentDate) + (")"));

                var pOne = $("<h4>").addClass("currentDay").text(pOneText);
                cityDiv.append(pOne);

                // weather icon
                let dayIcon = response.weather[0].icon;
                let dayWeatherIcon = "http://openweathermap.org/img/wn/" + dayIcon + ".png";
                let dayIconEl = $("<img/>", {
                    id: "weather-icon",
                    src: dayWeatherIcon,
                    width: 60
                })

                cityDiv.append(dayIconEl);


                var createBreak = $("<br>");
                cityDiv.append(createBreak);

                var cityTemp = response.main.temp;
                var cityTempEl = $("<p>").html("Temp: " + ((cityTemp - 273.15) * 1.80 + 32).toFixed(1) + ("&deg;F"));

                cityDiv.append(cityTempEl);


                var humidity = response.main.humidity;
                var humidtyEl = $("<p>").html("Humidty: " + humidity + ("%"));

                cityDiv.append(humidtyEl);

                var windSpeed = response.wind.speed;
                var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " m/s");
                cityDiv.append(windSpeedEl);



                var lat = response.coord.lat;
                var lon = response.coord.lon;


                var queryURLuv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=3ab769e1d5edf7b37431bdd5400d6c70";

                var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=3ab769e1d5edf7b37431bdd5400d6c70";

                $.ajax({
                    url: queryURLuv,
                    method: "GET",
                }).then(function (res) {
                    console.log(res);
                    var uvI = res.value;
                    console.log(uvI);

                  

                    // var uvEl = $("<span>").addClass("uvBox").html(uvI);
                    // var indexColo    
                    var uvEl = $("<p>").addClass("allBox").html("UV Index: " + uvI);

                    if (uvI < (3.00)) {
                        uvEl.attr("id", "green")
                    }

                    else if (uvI > 3 && uvI < 8) {
                        uvEl.attr("id", "yellow")
                    }

                    else {
                        uvEl.attr("id", "red")
                    }

                    
                


                    cityDiv.append(uvEl);

                    // card appending to DOM
                    $("#cities-view").append(cityDiv);



                });

                  // 5 day forecast moment days: 
                $("#forecast-1").text(moment().add(1, "d").format("l"));
                $("#forecast-2").text(moment().add(2, "d").format("l"));
                $("#forecast-3").text(moment().add(3, "d").format("l"));
                $("#forecast-4").text(moment().add(4, "d").format("l"));
                $("#forecast-5").text(moment().add(5, "d").format("l"));
                

                $.ajax({
                    url: queryURLForecast,
                    method: "GET",
                }).then(function (response) {
                    console.log(response);
                
                

                let forecastTemp = [];
               
                let forecastHumidity = [];
                
                let forecastIcon = [];

                
                let futuredayWeatherIcon = "http://openweathermap.org/img/wn/" + forecastIcon + ".png";
                let FutureDayIconEl = $("<img/>").html(futuredayWeatherIcon).attr("id", "future-weather-icon");
                //     id: "weather-icon",
                //     src: futuredayWeatherIcon,
                //     width: 40
                // })

                for (let i = 0; i < response.list.length; i+= 8) {
                  
                        
                        forecastTemp.push(response.list[i].main.temp);
                        forecastHumidity.push(response.list[i].main.humidity);
                        forecastIcon.push(response.list[i].weather[0].icon);
                    // }
                   


                }
                $(".forecast-day").each(function (array){
                    $(this).html(forecastDay[array]);
                })


                console.log(forecastTemp);
                $(".forecast-temp").each(function (array){
                     $(this).html("Temp: " + ((forecastTemp[array] - 273.15) * 1.80 + 32).toFixed(0) + ("&deg;F"));
                   

                })
                $(".forecast-humidity").each(function (array){
                     $(this).text(forecastHumidity[array] + "%");

                }) 
                 $(".forecast-icon").attr("src", function (array){
                    return "http://openweathermap.org/img/w/" + forecastIcon[array] + ".png";

                })                
                
            })

   



                // var forecastDiv = $("<div class='forecastDiv'>");
                // var forecastCityname = response.city.name;
                // var futureDate = response.list[i].dt_txt;
                // console.log(futureDate);


                // var pTwoText = ((cityBigname) + (" ") + ("(") + (CurrentDate) + (")"));

                // var pTwoTextEl = $("<h4>").addClass("futureDay").text(pTwoText);
                // forecastDiv.append(pTwoTextEl);





            });
        }





        // if (uvI > parseInt(2.00)) {
        //     uvEl.attr({
        //         "class": "yellow"
        //     }


        // else if (uvI < parseInt(2.00)) {
        //     uvEl.attr({
        //         "class": "green"
        //     }

        //      

        // function displayFiveDay () {
        //             // var city = $(this).attr("data-name");
        //             var cityInput = $("#search-city").val();
        //             var FiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=3ab769e1d5edf7b37431bdd5400d6c70";

        //             $.ajax({
        //                 url: FiveDayURL,
        //                 method: "GET"
        //             }).then(function (fiveDayForecast) {
        //                 console.log(fiveDayForecast);
        //         //         $("#cities-view").text(JSON.stringify(fiveDayForecast));

        //             });

        //          }

        //          var cityBigname = response.name;

        //     response.forEach(function (fiveDay) {
        // // console.log(thishour);
        // var fiveDayBox = $("<div>").attr({
        //     "class": "row",
        //     "id": "fiveDayForecast",
        // });

        // var cityFiveDay = response;
        //     var pCity = $("<header>").addClass("thisCity").text(cityFiveDay);

        //     cityFiveDay.append(pCity);

        //     $("#fiveDay-view").append(fiveDayBox); 
        // });
        function storeCities() {
            // push cities inside this function


            localStorage.setItem("cities", JSON.stringify(cities));
        }
        // pulling the coppy of the preset cities from Local storage
        function citiesFromStorage() {
            // retrive cities from storage
            var storedResults = JSON.parse(localStorage.getItem("cities"));
            // If  were retrieved from localStorage, update cities array it
            if (storedResults !== null) {
                cities = storedResults;
            }

        }



        function renderButtons() {
            $("#buttons-view").empty();
            $("#cities-view").empty();


            for (var i = 0; i < cities.length; i++) {
                var a = $("<button>");
                a.addClass("city");
                a.addClass("btn");
                a.addClass("btn-outline-info");
                a.attr("data-name", cities[i]);
                a.text(cities[i]);
                $("#buttons-view").append(a);
            }
        }


        // REWORK THIS BELOW 

        $(".add-city").on("click", function (event) {
            event.preventDefault();
            displayCityInfo();

            storeCities();

            // create function for cityweatherfunction to "clearning the search a city value"

            var city = $("#city-input").val().trim();


            cities.push(city);
            // console.log(cities);


            renderButtons();
        });


        // wrap everything into a documnet on ready at top. on click will handle store city and call


        $(document).on("click", ".city", displayCityInfo);
        // $(document).on("click", "fiveDayForecastBlock",)

        renderButtons();

