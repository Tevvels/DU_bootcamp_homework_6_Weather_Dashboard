var makeContainer = $("<container>");
var makeHeader  = $("<header>");
var makeH1 = $("<h1>");
var makeP = $("<p>");
var makeUl = $("<ul>");
var makeLi = $("<li>");
var makeInput = $("<input>");
var makeButton = $("<button>");
var makeSection = $("<section>");

var searchButton = makeButton;


makeContainer.addClass("container-fluid")
makeInput.addClass("form-control me-2")
makeInput.attr("placeholder","Search");
makeInput.attr("type","search");
makeInput.attr("aria-label","Search");


searchButton.addClass("btn btn-outline-success")
searchButton.attr("type","submit");
searchButton.text("Search");


$("body").append(makeContainer);
$(makeContainer).append(makeHeader);
$(makeHeader).append(makeH1);
$(makeContainer).append(makeUl);
$(makeUl).append(makeLi);
$(makeUl).append(makeLi);
$(makeUl).append(makeLi);
$(makeUl).append(makeLi);
$(makeContainer).append(makeSection);
$(makeContainer).append(makeInput);
$(makeContainer).append(searchButton);





