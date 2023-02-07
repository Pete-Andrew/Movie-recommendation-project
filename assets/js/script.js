localStorage.clear();

var time = moment();
$("#time").text(time.format("DD-MM-YYYY"));

var APIkey = "67a9b854";
var submitButton = document.getElementById("submit-button");

var actors = $("#actors");
var awards = $("#awards");
var rated = $("#rated");
var director = $("director");
var IMDBrating = $("imdb-rating");
var released = $("released");
var fimlTitle = $("filmTitle");
var saveButton = $("button.saveButton");
var modal = $("#myModal");
var trigger = $("#submit-button");
var closeButton = $(".close-button");
var modalCardText = $("card-text");
var filmTitle = $("#search");

var filmArray = []; 

//creates an onclick function that takes the input film name, replaces the white space in it with +, and pulls the film info from the API
submitButton.onclick = function (event) {
  event.preventDefault();

  var filmTitle = $("#search").val();
  var filmTitleWithoutSpaces = filmTitle.replaceAll(" ", "+");
  
  console.log(filmTitleWithoutSpaces);

  var filmInfo =
    "http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + filmTitleWithoutSpaces;
  console.log(filmInfo);

  //Ajax turns the returned info from the API key into a usable object.
  $.ajax({
    url: filmInfo,
    method: "GET",
  }).then(function (APIResponse) {
    console.log(APIResponse);

    var poster = $("#poster1");
    poster.attr("src", APIResponse.Poster);
    
    var poster2 = $("#poster2");
    poster2.attr("src", APIResponse.Poster);

    $("#filmTitle").text(APIResponse.Title);
    $("#actors").text("Actors: " + APIResponse.Actors);
    $("#awards").text("Awards: " + APIResponse.Awards);
    $("#rated").text("Rated: " + APIResponse.Rated);
    $("#director").text("Director: " + APIResponse.Director);
    $("#imdb-rating").text("IMDB rating: " + APIResponse.imdbRating);
    $("#released").text("Release Date: " + APIResponse.Released);

    $(".card-text").text(APIResponse.Plot);
    $(".card-title").text(APIResponse.Title);

  });
};

$(document).ready(function () {

  trigger.click(function () {
    modal.css("display", "block");
  });

  closeButton.click(function () {
    modal.css("display", "none");
  });

  $(window).click(function (event) {
    if (event.target == modal[0]) {
      modal.css("display", "none");
    }
  });
});

function saveButtonClick () {
  saveButton.click(function (event) {
  
      event.preventDefault(); 
      console.log("test log");
    });
  
};
saveButtonClick(); 

function saveFilmToLocalStorage () {
  trigger.click(function () {

  filmArray.push(filmTitle.val()); 
  console.log(filmTitle.val());
  console.log(filmArray); 

  var stringifyFilmArray = JSON.stringify(filmArray);
  console.log("stringified filmArray: " + stringifyFilmArray);

  localStorage.setItem("filmHistory", filmArray);
  console.log("filmArray saved to local storage: " + JSON.stringify(localStorage));
//       // localStorage.getItem("placeHistory");

}) 
}

saveFilmToLocalStorage(); 

// film array in global var
//push film names to array
//add array to local storage
//get items from local storage
//dynamically create elements by itterating though local storage array
//e.g. create element for the films and set attributes
//append theses to the list


// function saveToLocalStorage() {
      
//   //updates the history buttons array by adding location names
//   historyButtonsArray.push(location);
  
//   console.log("historyButtonsArray: " + historyButtonsArray);
  
//   //stingifys the historyButtonsArray. A common use of JSON is to exchange data to/from a web server.
//   //When sending data to a web server, the data has to be a string.Convert a JavaScript object into a string with JSON.stringify().

//   var stringifyArray = JSON.stringify(historyButtonsArray);
//   console.log("stringified historyButtonsArray: " + stringifyArray);
//       //adds the historyButtonsArray to the local storage
//       localStorage.setItem("placeHistory", historyButtonsArray);
//       console.log("historyButtonsArray saved to local storage: " + JSON.stringify(localStorage));
//       // localStorage.getItem("placeHistory");

// }
// saveToLocalStorage();


// function callFromLocalStorage() {
//   var storedButtons = localStorage.getItem("placeHistory");
//   console.log("storedButtons from local storage: " + storedButtons);

// }
// callFromLocalStorage();

// //on refresh dynamically create buttons for each member of the history buttons array and assign them names. 

// function dynamicallyCreateButtonsFromLocalStorage(storedButtons) {

//   //clears the buttons list and relogs the buttons so you don't get doubled enteries.
//   historyButtonList.innerHTML = "";

//   if (storedButtons !== null) {
       
//     //
//     for (var i =0; i < historyButtonsArray.length; i++) {
    
//     var historyButtonsRendered = document.createElement("button"); 
//     historyButtonsRendered.setAttribute("class", "btn btn-secondary btn-block history-button");
    
//     // historyButtonsRendered.setAttribute("data-index", i);
//     historyButtonsRendered.textContent = historyButtonsArray[i];
        
//     historyButtonList.appendChild(historyButtonsRendered);
    
//     }
//   }
// }

// //on refresh dynamically create buttons for each member of the history buttons array and assign them names. 
// dynamicallyCreateButtonsFromLocalStorage(); 
