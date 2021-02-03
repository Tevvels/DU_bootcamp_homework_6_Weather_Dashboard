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

function makingAjaxCall(a){

    var APIkey = "3ca7bb017648384c3b897e93f5370638";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ a +"&appid=" + APIkey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(response.city.name);

        function fahrenheit(a){
            return (a - 273.15) * 1.80 + 32;
        }
        console.log(fahrenheit(response.list[0].main.temp));
        console.log(response.list[1].main.humidity);
        console.log(response.list[2].wind.speed);
        console.log(response.list[3].weather[0].icon);
        console.log(response.list[4].main.temp);
        console.log(response.city.name);

        for(i=0;i < 5;i++){
     
           
            var fiveDay = $("<article>");
            var lineOne = $("<p>");
            var lineTwo = $("<p>");
            var lineThree = $("<p>");
            

             lineOne.text(response.list[(i * 8)].dt_txt);
             lineTwo.text(Math.floor(response.list[i].main.humidity));
            lineThree.text(Math.floor(fahrenheit(response.list[i].main.temp)));


            fiveDay.append(lineOne);
            fiveDay.append(lineTwo);
            fiveDay.append(lineThree);
            fiveDay.addClass("col-2 fiveDay")
            wrap.append(fiveDay)
           
            makeCard.append(wrap)
            console.log();
        }


    });
}

function searching(event){
    event.preventDefault(); 


    $(makeUl).empty()
    

    var searchResults = $("#searchInput").val()
    
    searchHistory.push(searchResults);
    
    localStorage.setItem("city" , JSON.stringify
    
    (searchHistory));

    makingAjaxCall(searchResults);

    render();
}

function savedSearch(){

    var clickedValue = this.textContent;
    makingAjaxCall(clickedValue);

};


$(searchButton).on("click",searching);

render();

})

console.log(searchHistory)