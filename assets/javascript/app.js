// This .on("click") function will trigger the AJAX Call
$("#find-gif").on("click", function(event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var gif = $("#search-input").val();

    // Here we construct our URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=tih1sM9xO9rI3QB0DwNzTqD5gvMJr3n3&limit=10";

    // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
    // and display it in the div with an id of movie-view

    // ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        for(var i=0; i<10; i++){
            var gifurl = JSON.stringify(response.data[i].images.fixed_height_still.url);
            $("#gif-view").prepend("<button class='imagemove'><img src=" + gifurl + "/></button>");
            $(".imagemove").on("click",function(){
                gifurl = JSON.stringify(response.data[i].images.original.url)
                $(".imagemove").html("<button class='imagemove'><img src=" + gifurl + "/></button>");
            });
        }
    });

    // -----------------------------------------------------------------------

  });