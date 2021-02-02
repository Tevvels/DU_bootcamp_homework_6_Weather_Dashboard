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


if(searchHistory.indexOf() == -1 ) {

    searchHistory.push("Denver");

} else {
   searchHistory.push(JSON.parse(localStorage.getItem("city")));
}

$("document").ready(function(){


makeContainer.addClass("container")

makeInput.addClass(" me-2 col-4")
makeInput.attr("placeholder","Search");
makeInput.attr("id","searchInput");
makeInput.attr("type","search");
makeInput.attr("aria-label","Search");

makeAside.addClass("row")
makeArticle.addClass("col-12")
makeSection.addClass("col-8 row")

makeHeader.addClass("navbar navbar-expand-lg navbar-light bg-light col-2 row");
makeH1.addClass("navbar-brand col-2");
makeH1.text("Weather Dashboard");


searchButton.addClass("btn btn-outline-success col-2")
searchButton.attr("type","submit");
searchButton.text("Search");

makeLi.addClass("col-12 searchHistory")

makeUl.addClass("row col-4")



$(makeHeader).append(makeH1);
$(makeContainer).append(makeHeader);



$(makeContainer).append(makeSection);
$(makeSection).append(makeInput);
$(makeSection).append(searchButton);
$(makeContainer).append(makeAside);
$(makeAside).append(makeArticle);
$(makeArticle).append(makeUl);
$(makeUl).append(makeLi);

$("body").append(makeContainer);



var i = 0;


function render(){


    for(i = 0; i < searchHistory.length;i++){

        var newButton = $('<button>')

        newButton.text(searchHistory[i]);
        newButton.on("click",searching);

        $(makeUl).append(newButton);
        


    }
}

function searching(event){
    event.preventDefault();
    
    $(makeUl).empty()
    var searchResults = $("#searchInput").val()
    searchHistory.push(searchResults);
    localStorage.setItem("city" , JSON.stringify(searchHistory));

    var urlKey = "3ca7bb017648384c3b897e93f5370638";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ searchResults +"&appid=" + urlKey;
   $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function(response){
       console.log(response);
       console.log(response.main.humidity);
   
   });


    render();
}


$(searchButton).on("click",searching);

render();

})

console.log(searchHistory)