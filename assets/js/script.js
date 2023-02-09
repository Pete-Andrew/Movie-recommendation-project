// localStorage.clear();

var time = moment();
$("#time").text(time.format("MMMM Do YYYY, h:mm:ss a"));


var APIkey = "67a9b854";
var submitButton = document.getElementById("submit-button");

var actors = $(".actors");
var awards = $(".awards");
var rated = $(".rated");
var director = $(".director");
var IMDBrating = $(".imdb-rating");
var released = $(".released");
var fimlTitle = $(".filmTitle");
var saveButton = $("button.saveButton");
var modal = $("#myModal");
var trigger = $("#submit-button");
var closeButton = $(".close-button");
var modalCardText = $("card-text");
var filmTitle = $("#search");
var cardsForPages = $(".front-page-card");
var clearSaveHistoryButton = $("#clearHistory")



//creates an onclick function that takes the input film name, replaces the white space in it with +, and pulls the film info from the API
submitButton.onclick = function (event) {
  event.preventDefault();

  var filmTitle = $("#search").val();
 //passes the film title into the film title function
  getMovieInfo(filmTitle); 
}

function getMovieInfo (filmTitle) { 
  var filmTitleWithoutSpaces = filmTitle.replaceAll(" ", "+");
  
  var filmInfo =
    "https://www.omdbapi.com/?apikey=" + APIkey + "&t=" + filmTitleWithoutSpaces;

  //Ajax turns the returned info from the API key into a usable object.
  $.ajax({
    url: filmInfo,
    method: "GET",
  }).then(function (APIResponse) {

    var poster = $("#poster1");
    poster.attr("src", APIResponse.Poster);
    
    var poster2 = $("#poster2");
    poster2.attr("src", APIResponse.Poster);

    $(".filmTitle").text(APIResponse.Title);
    $(".actors").text("Actors: " + APIResponse.Actors);
    $(".awards").text("Awards: " + APIResponse.Awards);
    $(".rated").text("Rated: " + APIResponse.Rated);
    $(".director").text("Director: " + APIResponse.Director);
    $(".imdb-rating").text("IMDB rating: " + APIResponse.imdbRating);
    $(".released").text("Release Date: " + APIResponse.Released);

    $(".card-text").text(APIResponse.Plot);
    $(".card-title").text(APIResponse.Title);

    var filmArray = JSON.parse(localStorage.getItem("filmInfo")) || [];
    
    for (var i =0; i < filmArray.length; i++) {
    //stops the button being appended if there is a title in the filmArray that matches a button.
    if (filmArray[i].Title === APIResponse.Title) {
    return; }
    } 

    filmArray.push(APIResponse);
    localStorage.setItem("filmInfo", JSON.stringify(filmArray));
    createButton(APIResponse.Title);
    
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
      modal.css("display", "none");
      event.preventDefault(); 
    });
  
};
saveButtonClick(); 


function dynamicallyCreateCardsFromLocalStorage() {

  
  var filmArray = JSON.parse(localStorage.getItem("filmInfo"));
  
  if (!filmArray) {
    return;
  }

   //clears the buttons list and relogs the buttons so you don't get doubled enteries.
   cardsForPages.innerHTML = "";

  // if (filmArray !== null) {  
  
  getMovieInfo(filmArray[0].Title); 

  for (var i =0; i < filmArray.length; i++) {
    createButton(filmArray[i].Title); 
  }
}
//on refresh dynamically create buttons for each member of the history buttons array and assign them names. 
dynamicallyCreateCardsFromLocalStorage(); 


function createButton (movieName) { 

  var movieDiv = document.createElement("div");
  
  var filmArrayRendered = document.createElement("button"); 
  filmArrayRendered.setAttribute("class", "saveHistory btn btn-secondary");
  // var trash = document.createElement("i");
  // trash.classList="fa-regular fa-circle-xmark";
  // trash.setAttribute("class", "fa-regular fa-circle-xmark");
        
    filmArrayRendered.addEventListener("click", doSomething) 

    // filmArrayRendered.setAttribute("data-index", i);
    filmArrayRendered.textContent = movieName
    movieDiv.append(filmArrayRendered); 
    // movieDiv.append(trash); 

    cardsForPages.append(movieDiv);
}

function doSomething (event) {
    
  getMovieInfo(event.target.textContent);

}


  clearSaveHistoryButton.click(function () {
  console.log("eventListenerClicked"); 
  localStorage.clear();
  location.reload();
  modal.css("display", "none");
  });

//test comment!
//making sure this is going to push to github
//final comment just to be sure



