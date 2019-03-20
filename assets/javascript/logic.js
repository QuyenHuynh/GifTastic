// initial array of topics
var topics =
    ["labrador retriever", "chihuahua", "pug", "shiba inu", "dalmation",
        "pomeranian", "poodle", "rottweiler", "shih tzu", "boston terrier", "bichon frise", "collie",
        "shar pei", "french bulldog", "schnauzer"];

// Displays the gifs and their ratings to the HTML
function displayGifs() {

    $(".gif-info").empty();

    var APIKEY = "TcK130HTyBT0W3lSAyL47uus0wO2UXJi"
    var searchTerm = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKEY + "&q=" + searchTerm; + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //loop through response data
        for (i = 0; i < 10; i++) {

            //create new divs to hold the data
            var divElem = $("<div>");
            divElem.addClass("gif-info");
            divElem.addClass("col-md-4");
            $(".gif-container").append(divElem);

            //get image titles
            var imgTitle = response.data[i].title;
            //append them to the new div we created
            divElem.append("<h5>" + imgTitle + "</h5>");

            //create new image tag
            var imgElem = $("<img>");
            //assign the image tag a src attribute (animated img) 
            imgElem.attr("src", response.data[i].images.fixed_height_still.url);
            //assign the still image url
            imgElem.attr("data-still", response.data[i].images.fixed_height_still.url);
            //assign the animated image url
            imgElem.attr("data-animate", response.data[i].images.fixed_height.url);
            //set the image state
            imgElem.attr("data-state", "still");
            //add gif class for on-click function
            imgElem.addClass("gif");
            //appends the gifs to divElem
            divElem.append(imgElem);

            //get the gif ratings
            var rating = $("<p>").text("Rating: " + response.data[i].rating);
            divElem.append(rating);

            //on-click function that allows user to pause and unpause gifs
            $(".gif").on("click", function () {

                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        }
    });
}

function renderButtons() {

    $("#my-buttons").empty();

    // Loops through topic array...
    for (var i = 0; i < topics.length; i++) {
        // and dynamicaly generates buttons for each movie in the array
        var buttonElem = $("<button>");
        // Add a class of topic to our button
        buttonElem.addClass("topic");
        buttonElem.addClass("btn btn-light");
        // Add a data-attribute
        buttonElem.attr("data-name", topics[i]);
        // Add initial button text
        buttonElem.text(topics[i]);
        // Append the buttons to the my-buttons div
        $("#my-buttons").append(buttonElem);
    }
}

// This function appends more buttons if the user desires
$("#add-button").on("click", function (event) {
    event.preventDefault();

    // get input from textbox
    var searchTerm = $("#search-input").val().trim();

    //prevents user from adding blank button
    if (searchTerm == "") {
        return false;
    } else {
        // push the user search term from the textbox into our topics array
        topics.push(searchTerm);
    }
    // call renderButtons function to process the new button
    renderButtons();
});


// An on-click listener which calls the displayGifs function if a button with the class of topic is clicked
$(document).on("click", ".topic", displayGifs);
// Calls the renderButtons function to display the intial buttons
renderButtons();