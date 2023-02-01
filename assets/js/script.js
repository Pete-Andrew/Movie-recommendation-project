var APIkey = "67a9b854";
var submitButton = document.getElementById("submit-button");

// http://www.omdbapi.com/?apikey=[yourkey]&
http://img.omdbapi.com/?apikey=[yourkey]&



submitButton.onclick = function (event) {
    event.preventDefault(); 
    
    var filmTitle = $("#search").val() 
    console.log(filmTitle);

    var filmInfo = "http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + filmTitle; 
    console.log(filmInfo); 

    $.ajax({
        url: filmInfo,
        method: "GET", 
        }).then(function (filmInfoFromAPI) {
            console.log(filmInfoFromAPI);

        }); 
    
}



