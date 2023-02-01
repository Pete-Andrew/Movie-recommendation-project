var APIkey = "67a9b854";
var submitButton = document.getElementById("submit-button");

//creates an onclick function that takes the input film name, replaces the white space in it with +, and pulls the film info from the API
submitButton.onclick = function (event) {
    event.preventDefault(); 
    
    var filmTitle = $("#search").val() 
    var filmTitleWithoutSpaces = filmTitle.replaceAll(' ', '+' )
    
    console.log(filmTitle);
    console.log(filmTitleWithoutSpaces);

    var filmInfo = "http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + filmTitleWithoutSpaces; 
    console.log(filmInfo); 

    //Ajax turns the returned info from the API key into a usable object. 
    $.ajax({
        url: filmInfo,
        method: "GET", 
        }).then(function (APIResponse) {
            console.log(APIResponse);

            var poster = $("#poster");
            poster.attr("src", APIResponse.Poster);
           
        }); 
   
}



