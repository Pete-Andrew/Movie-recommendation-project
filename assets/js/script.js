var APIkey = "67a9b854";
var submitButton = document.getElementById("submit-button");

// http://www.omdbapi.com/?apikey=[yourkey]&




// http://www.omdbapi.com/?t=rambo&y=1991


submitButton.onclick = function (event) {
    event.preventDefault(); 
    
    var filmTitle = $("#search").val() 
    console.log(filmTitle);

    var filmInfo = "http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + filmTitle ; 
    console.log(filmInfo); 


}




// http://www.omdbapi.com/?apikey=[yourkey]&
