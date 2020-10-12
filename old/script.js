var cities = []

$("#find-city").on("click", function(event) {
    event.preventDefault ();
    
    var cities = $("#search-city").val();
    console.log(cities);

    var APIkey = "&appid=3ab769e1d5edf7b37431bdd5400d6c70"
    const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cities + APIkey;

    $.ajax({
        url: weatherAPI,
        method: "GET"
    }).then(function(response){
        $("#search-city").text(JSON.stringify(response));
        console.log(response);
    })
       

});

function renderButtons (){
    $("#citybuttons-view").empty();
 for (var i = 0; i < cities; i++) {
    var a = $("<button>");
    a.addClass("city");
    a.attr("data-name", cities[i]);
    a.text(cities[i]);
    $("#citybuttons-view".append(a));
 }   

}
 $("#add-city").on("click", function(event) {
event.preventDefault ();
var city = $("#city-input").val().trim();
cities.push(city);
 

renderButtons();
});

renderButtons ();



