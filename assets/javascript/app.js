var topics = ["angel" , "artificial tree" , "bells" , "birth" , "blizzard" , "blustery" , "boots" , "candle" , "candy" , "candy cane" , "cap" , "cardDecember 25" , "decorate" , "decorations" , "happy" , "holiday" , "holly" , "hope"];

function topicbtn(){
    /*set topic button*/
    for(var i=0; i<topics.length; i++){
        var buttonTopic = $('<button>');
        buttonTopic.html(topics[i]);
        buttonTopic.attr("type" , "button");
        buttonTopic.attr("value" , topics[i]);
        buttonTopic.addClass("btn btn-secondary m-1 gifBtn");
        $(".btnDiv").append(buttonTopic);
    }
    /*set topic button*/
};

/*submit button function*/
$(".addBtn").click(function(){
    event.preventDefault();
    topics.push($(".btnInput").val());//add the user text to topic array
    $(".btnDiv").empty();
    start();
});
/*submit button function*/

function start(){
    topicbtn();//set the topic buttons
    // This .on("click") function will trigger the AJAX Call
    $(".gifBtn").click(function(){
        var gif = this.value;// Here we grab the text from the button
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=tih1sM9xO9rI3QB0DwNzTqD5gvMJr3n3&limit=10";// Here we construct our URL
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                for(var i=0; i<10; i++){
                    var gifSecondDiv = $("<div>");
                    gifSecondDiv.addClass("col-sm-4 mx-0 my-1");
                    var p = $("<p>").text("Rating: " + response.data[i].rating);
                    var gifImg = $("<img>");
                    gifImg.addClass("img-thumbnail imagemove");
                    gifImg.attr({"src": response.data[i].images.fixed_height_still.url,
                                "data-still": response.data[i].images.fixed_height_still.url,
                                "data-animate": response.data[i].images.original.url,
                                "data-state":"still"});
                    gifSecondDiv.append(p);
                    gifSecondDiv.append(gifImg);
                    $(".gifDiv").prepend(gifSecondDiv);
                }
                
                $(".imagemove").on("click", function() {
                    var state = $(this).attr("data-state");
                    if(state === "still"){
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                        console.log($(this).attr("data-state"));
                    }else{
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                        console.log($(this).attr("data-state"));
                    }
                });  
            });
    });
};

start();