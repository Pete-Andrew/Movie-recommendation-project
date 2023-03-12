// localStorage.clear();

var time = moment();
$("#time").text(time.format("MMMM Do YYYY, h:mm:ss a"));

//sets IMDB (?) api key
var APIkey = "67a9b854";

// sets youtube API key
//var youtube_API_KEY = "insert - YouTube Data API v3 API key"
var youtube_API_KEY = "AIzaSyDf4tMz3vgTdMX_rn7o9ONzURY-tdhurvY";
// var youtube_API_KEY = "AIzaSyCmhzO1q2A0IGFd_sNNt10YNyKjZ7d08as";

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
var clearSaveHistoryButton = $("#clearHistory");

//creates an onclick function that takes the input film name, replaces the white space in it with +, and pulls the film info from the API
submitButton.onclick = function (event) {
  event.preventDefault();

  var youtubeSearch = $("#search").val() + " movie trailer";
  console.log(youtubeSearch);

  videoSearch(youtube_API_KEY, youtubeSearch, 1);

  var filmTitle = $("#search").val();
  //passes the film title into the film title function
  getMovieInfo(filmTitle);
};

//uses the value returned from youtubSearch to get a video from youtube

function videoSearch(youtube_API_KEY, youtubeSearch, maxResults) {
  //The empty() method removes all child nodes and content from the selected elements.
  $("#videos").empty();

  //The get() method returns a specified element from a Map object.
  //Map objects are collections of key-value pairs. A key in the Map may only occur once; it is unique in the Map's collection. Similar to objects.
  $.get(
    "https://www.googleapis.com/youtube/v3/search?key=" +
      youtube_API_KEY +
      "&type=video&part=snippet&maxResults=" +
      maxResults +
      "&q=" +
      youtubeSearch,

    function (data) {
      // console.log(data);

      data.items.forEach((item) => {
        video = `
              <iframe width="420" height=315" src="https://youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>            
              `;

        $("#videos").append(video);
      });
    }
  );
}

function getMovieInfo(filmTitle) {
  var filmTitleWithoutSpaces = filmTitle.replaceAll(" ", "+");

  var filmInfo =
    "https://www.omdbapi.com/?apikey=" +
    APIkey +
    "&t=" +
    filmTitleWithoutSpaces;

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

    //JSON.parse() is used for parsing data that was received as JSON; it deserializes a JSON string into a JavaScript object. String to object
    //JSON.stringify() on the other hand is used to create a JSON string out of an object or array; it serializes a JavaScript object into a JSON string. Object to string
    var filmArray = JSON.parse(localStorage.getItem("filmInfo")) || [];

    for (var i = 0; i < filmArray.length; i++) {
      //stops the button being appended if there is a title in the filmArray that matches a button.
      if (filmArray[i].Title === APIResponse.Title) {
        return;
      }
    }

    filmArray.push(APIResponse);
    localStorage.setItem("filmInfo", JSON.stringify(filmArray));
    createButton(APIResponse.Title);
  });
}

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

function saveButtonClick() {
  saveButton.click(function (event) {
    modal.css("display", "none");
    event.preventDefault();
  });
}
saveButtonClick();

function dynamicallyCreateCardsFromLocalStorage() {
  var filmArray = JSON.parse(localStorage.getItem("filmInfo"));

  //! logical NOT,
  if (!filmArray) {
    return;
  }

  //clears the buttons list and relogs the buttons so you don't get doubled enteries.
  cardsForPages.innerHTML = "";

  getMovieInfo(filmArray[0].Title);

  for (var i = 0; i < filmArray.length; i++) {
    createButton(filmArray[i].Title);
  }
}
//on refresh dynamically create buttons for each member of the history buttons array and assign them names.
dynamicallyCreateCardsFromLocalStorage();

function createButton(movieName) {
  var movieDiv = document.createElement("div");

  var filmArrayRendered = document.createElement("button");
  filmArrayRendered.setAttribute("class", "saveHistory btn btn-secondary");

  filmArrayRendered.addEventListener("click", doSomething);

  filmArrayRendered.textContent = movieName;
  movieDiv.append(filmArrayRendered);

  cardsForPages.append(movieDiv);
}

//when saved film buttons are clicked on this function passes the name of the button into the getMovieInfo and videoSearch functions.
function doSomething(event) {
  getMovieInfo(event.target.textContent);
  videoSearch(youtube_API_KEY, event.target.textContent + " movie trailer", 1);
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

// "code": 403,
// "message": "The request cannot be completed because you have exceeded your <a href=\"/youtube/v3/getting-started#quota\">quota</a>.",

//video has "paused on breakpoint" issue.
//also has exceeded API calls limit at least once!
