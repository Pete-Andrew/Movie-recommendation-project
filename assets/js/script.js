var APIkey = "67a9b854";
var submitButton = document.getElementById("submit-button");

// http://www.omdbapi.com/?apikey=[yourkey]&
http://img.omdbapi.com/?apikey=[yourkey]&



submitButton.onclick = function (event) {
    event.preventDefault(); 
    
    var filmTitle = $("#search").val() 
    var filmTitleWithoutSpaces = filmTitle.replaceAll(' ', '+' )
    
    console.log(filmTitle);
    console.log(filmTitleWithoutSpaces);

    var filmInfo = "http://www.omdbapi.com/?apikey=" + APIkey + "&t=" + filmTitleWithoutSpaces; 
    console.log(filmInfo); 

    $.ajax({
        url: filmInfo,
        method: "GET", 
        }).then(function (APIResponse) {
            console.log(APIResponse);

            var poster = $("#poster1");
            poster.attr("src", APIResponse.Poster);
  
            // console.log(poster);


        }); 
        
        // var poster = $("<img>");
        // poster.attr("src", response.Poster);
  

}



