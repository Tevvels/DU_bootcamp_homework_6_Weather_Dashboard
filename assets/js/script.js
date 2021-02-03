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



$("document").ready(function(){


makeContainer.addClass("container row")

makeInput.addClass(" me-2 col-4")
makeInput.attr("placeholder","Search");
makeInput.attr("id","searchInput");
makeInput.attr("type","search");
makeInput.attr("aria-label","Search");

makeAside.addClass("row")
makeArticle.addClass("col-12")
makeSection.addClass("col-12 height")

makeHeader.addClass("navbar navbar-expand-lg navbar-light bg-light col-12 header row");
makeH1.addClass("navbar-brand col-2");
makeH1.text("Weather Dashboard");


searchButton.addClass("btn btn-outline-success col-2")
searchButton.attr("type","submit");
searchButton.text("Search");

makeLi.addClass("col-12 searchHistory")

makeUl.addClass("row col-12")
makeAside.addClass("sideTitle col-4")



$(makeHeader).append(makeH1);
$(makeContainer).append(makeHeader);



$(makeContainer).append(makeSection);
$(makeSection).append(makeInput);
$(makeSection).append(searchButton);
$(makeContainer).append(makeAside);
$(makeAside).append(makeArticle);
$(makeArticle).append(makeUl);


// Search for a City:

// card > City(day) symbol 

// temp File, humidity, wind ScopedCredential, uv Index 

// 5 day forecast

// Date,symbol, temp, humidity 



var makeCard = $("<section>");
makeCard.addClass("card col-8")
$(makeP).text( "hello")
makeCard.append(makeP);
$(makeP).text("again")
makeCard.append(makeP);
var wrap = $("<div>");
wrap.addClass("row")

function fahrenheit(a){
    return (a - 273.15) * 1.80 + 32;
}



if(localStorage.getItem('city')=== null){
    searchHistory =[];
} else {
    searchHistory = JSON.parse(localStorage.getItem("city"));
}

$(makeContainer).append(makeCard);


$("body").append(makeContainer);


var i = 0;


function render(){


        


    for(i = 0; i < searchHistory.length;i++){

        var newButton = $('<button>')
        newButton.text(searchHistory[i]);
        newButton.on("click",savedSearch);
        $(makeUl).append(newButton);
        
    }
}

function makingAjaxCurrentCall(a){

    var APIkey = "3ca7bb017648384c3b897e93f5370638";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ a +"&appid=" + APIkey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        makeCard.empty();
     
        var header = $("<h1>").addClass("card card-body").text(response.name + " " +new Date().toLocaleDateString() + " " ).addClass("cardHeader")
        var img = $("<img>").attr('src',"http://openweathermap.org/img/wn/" + response.weather[0].icon +".png").addClass("imgSize")
        var temp = $("<p>").text("temperature: " + fahrenheit(response.main.temp).toFixed(2) + "°F")
        var humid = $("<p>").text("Humidity: " + Math.floor(response.main.humidity) +"%")
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed + "MPH");
       
        


        makeCard.append(header.append(img),temp,humid,wind);

        

    });
}
function makingAjaxForecastCall(a){

    var APIkey = "3ca7bb017648384c3b897e93f5370638";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ a +"&appid=" + APIkey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        wrap.empty();

   
        for(i=0;i < 5;i++){
     
           
            var smallCard = $("<article>");
            var date = $("<p>");
            var humid = $("<p>");
            var tempfah = $("<p>");
            var icons = $("<img>");
            

             date.text(new Date(response.list[(i * 8)].dt_txt).toLocaleDateString());
            icons.text(response.list[i].weather[0].icon).attr("src","http://openweathermap.org/img/wn/" +response.list[i].weather[0].icon +".png")
            tempfah.text( "Temp: " + fahrenheit(response.list[i].main.temp).toFixed(2) +"°F");

             humid.text("Humidity: " + Math.floor(response.list[i].main.humidity)+"%");
            smallCard.append(date,icons,tempfah,humid);
            smallCard.addClass("col-2 smallCard")
            wrap.append(smallCard)
           
            makeCard.append(wrap)
            console.log();
        }


    });
}

function searching(event){
    event.preventDefault(); 


    $(makeUl).empty()
    
    
    var searchResults = $("#searchInput").val()
   searchResults = searchResults.toUpperCase();
    
    if(searchHistory.indexOf(searchResults) === -1){

    searchHistory.push(searchResults);
    
    localStorage.setItem("city" , JSON.stringify
    
    (searchHistory));


    makingAjaxCurrentCall(searchResults);
    makingAjaxForecastCall(searchResults);

    render();
    } else {
        render();        
            makingAjaxCurrentCall(searchResults);
            makingAjaxForecastCall(searchResults);
    }

}

function savedSearch(){

    var clickedValue = this.textContent;
    makingAjaxCurrentCall(clickedValue);
    makingAjaxForecastCall(clickedValue);

};


$(searchButton).on("click",searching);

render();

})

console.log(searchHistory)


