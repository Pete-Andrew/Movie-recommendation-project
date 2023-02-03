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

//creates an onclick function that takes the input film name, replaces the white space in it with +, and pulls the film info from the API
submitButton.onclick = function (event) {
  event.preventDefault();

  var filmTitle = $("#search").val();
  var filmTitleWithoutSpaces = filmTitle.replaceAll(" ", "+");

  console.log(filmTitle);
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

    $("#filmTitle").text(APIResponse.Title);
    $("#actors").text("Actors: " + APIResponse.Actors);
    $("#awards").text("Awarrds:" + APIResponse.Awards);
    $("#rated").text("Rated: " + APIResponse.Rated);
    $("#director").text("Director: " + APIResponse.Director);
    $("#imdb-rating").text("IMDB rating: " + APIResponse.imdbRating);
    $("#released").text("Release Date: " + APIResponse.Released);
  });
};

$(document).ready(function () {
  var modal = $("#myModal");

  var trigger = $("#modal-trigger");

  var closeButton = $(".close-button");

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
