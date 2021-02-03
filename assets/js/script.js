// Needed Variables

var makeContainer = $("<container>");
var makeHeader  = $("<header>");
var makeH1 = $("<h1>");
var makeP = $("<p>");
var makeUl = $("<ul>");
var makeLi = $("<li>");
var makeInput = $("<input>");
var makeButton = $("<button>");
var makeSection = $("<section>");
var makeArticle = $("<article>");
var makeAside = $("<aside>");
var searchButton = makeButton;
var searchHistory = [];


// the ready function that makes sure everything is loaded before the function runs

$("document").ready(function(){

// addes a class to the main container
makeContainer.addClass("container row")

// add the class to the makeinput as well as attachs the attributes
makeInput.addClass(" me-2 col-4").attr("placeholder","Search").attr("id","searchInput").attr("type","search").attr("aria-label","Search");

// adds a class the aside 
makeAside.addClass("row")
// adds a class to the article 
makeArticle.addClass("col-12")
// adds a class to the section 
makeSection.addClass("col-12 height")

// adds a class to the header 
makeHeader.addClass("navbar navbar-expand-lg navbar-light bg-light col-12 header row");
// adds a class  and the text to the h1
makeH1.addClass("navbar-brand col-2").text("Weather Dashboard");
// adds a class to the seachbutton and ass the attributes and text 
searchButton.addClass("btn btn-outline-success col-2").attr("type","submit").text("Search");
// adds a class
makeLi.addClass("col-12 searchHistory")
// adds a class to the ul 
makeUl.addClass("row col-12")
// adds a class tot he aside 
makeAside.addClass("sideTitle col-4")

// appends the header,section and side to the container
// appends the h1 to the header 
// appends the input and searchbutton to the section 
// appends the ul to the article 
$(makeContainer).append((makeHeader).append(makeH1),(makeSection).append(makeInput,searchButton),(makeAside).append(makeArticle).append(makeUl));

// makes a section and adds a class 
var makeCard = $("<section>").addClass("card col-8")
// makes a div and adds a class
var wrap = $("<div>").addClass("row")

// makes a function 
function fahrenheit(a){
    return (a - 273.15) * 1.80 + 32;
}


// if the localstorage key city is null make an empty array else add the array form localStorage 
if(localStorage.getItem('city')=== null){
    searchHistory =[];
} else {
    searchHistory = JSON.parse(localStorage.getItem("city"));
}

// append card to container 

$(makeContainer).append(makeCard);

// append container to body 
$("body").append(makeContainer);

// makes a function 
function render(){
    // for each item in the searchHistory array
    for(i = 0; i < searchHistory.length;i++){
        // make a button, add text and a event listner on it  
        var newButton = $('<button>').text(searchHistory[i]).on("click",savedSearch);
        // append the new button the ul 
        $(makeUl).append(newButton);
        
    }
}
// make a function 
function makingAjaxCurrentCall(a){

    // the needed variables for a ajax request for the current day weather
    var APIkey = "3ca7bb017648384c3b897e93f5370638"; // my APIkey
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ a +"&appid=" + APIkey; //openweathermap url

    // make the ajax call 
    $.ajax({
        // using those variables 
        // ajax asks a promise 
        url: queryURL,
        method: "GET"

        // then responsed 
    }).then(function(response){
        // clear the make card element 
        makeCard.empty();   
        //  make a h2 add a class and text 
        var header = $("<h2>").addClass("card card-body").text(response.name + " " +new Date().toLocaleDateString() + " " ).addClass("cardHeader");
        // make a img and add  attributes and a class 
        var img = $("<img>").attr('src',"http://openweathermap.org/img/wn/" + response.weather[0].icon +".png").addClass("imgSize")
        // make a p and add text for 
        var temp = $("<p>").text("temperature: " + fahrenheit(response.main.temp).toFixed(2) + "°F") //temperature
        var humid = $("<p>").text("Humidity: " + Math.floor(response.main.humidity) +"%") //humidity
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed + "MPH"); //wind speed

        // append the header temp humid and wind to the makecard 
        // append the img to the header 
        makeCard.append(header.append(img),temp,humid,wind);

    });
}

// make a function 
function makingAjaxForecastCall(a){

        // the needed variables for the five day forecast 
    var APIkey = "3ca7bb017648384c3b897e93f5370638";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ a +"&appid=" + APIkey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        wrap.empty();

        // for 5 days 
        for(i=0;i < 5;i++){
     
        //    make a article and add a class 
            var smallCard = $("<article>").addClass("col-2 smallCard")
            // make a p and add text  for 
            var date = $("<p>").text(new Date(response.list[(i * 8)].dt_txt).toLocaleDateString()); // date

            var humid = $("<p>").text("Humidity: " + Math.floor(response.list[i].main.humidity)+"%"); // humidity
            var tempfah = $("<p>").text( "Temp: " + fahrenheit(response.list[i].main.temp).toFixed(2) +"°F"); //temperature
            // make a img and add text and attribute 
            var icons = $("<img>").text(response.list[i].weather[0].icon).attr("src","http://openweathermap.org/img/wn/" +response.list[i].weather[0].icon +".png")
            

            // append date icson temp and humid to the small card elements             
            smallCard.append(date,icons,tempfah,humid);
            // append the small card to the wrap div 
            wrap.append(smallCard)
            // append the wrap to the make card 
            makeCard.append(wrap)
        }


    });
}
// make a function
function searching(event){
    // prevent default behavior from the browser 
    event.preventDefault(); 

    // clear the ul 0
    $(makeUl).empty()
    
    // store the value of the input 
    var searchResults = $("#searchInput").val()
    // convert stored value to uppercase 
   searchResults = searchResults.toUpperCase();
    // if search History array does not have the input value 
    if(searchHistory.indexOf(searchResults) === -1){
    // add the input value to the search history array 
    searchHistory.push(searchResults);
    // update the array in the local storage 
    localStorage.setItem("city" , JSON.stringify(searchHistory));


    // call on the ajax functions use the search results
    makingAjaxCurrentCall(searchResults); //current weather 
    makingAjaxForecastCall(searchResults); // five day forecast 

    // run the render function 
    render(); 
    } else {
        // else just run the functionss
        render();        
            makingAjaxCurrentCall(searchResults);
            makingAjaxForecastCall(searchResults);
    }

}

function savedSearch(){
    // add the value of the current clicked object and store the textcontent value 
    var clickedValue = this.textContent;
    // run the ajax functions using the textContent value 
    makingAjaxCurrentCall(clickedValue);
    makingAjaxForecastCall(clickedValue);

};

// adds a click even on the search button 
$(searchButton).on("click",searching);
// runs the render function 
render();

})



