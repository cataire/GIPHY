$("document").ready(function(){

// create array of topics
// make a button for each item
// create ajax call for each button 
// get gifs on the screen
// get value from search field
// push into topics array
// call make buttons function

var topics = ["Santa", "penguins", "elves", "reindeer", "Rudolph", "Christmas tree", "sledding", "cats in snow"];


// Function to create buttons for the items in the topics array

function createBtns() {

	$(".buttons").empty();
	for(var index = 0; index < topics.length; index++) {
		var buttons = $("<button>");
		buttons.addClass("btn btn-danger item-buttons");
		buttons.attr("value", topics[index]);
		buttons.text(topics[index]);
		$(".buttons").append(buttons);
	}
};

createBtns();


//function to make an ajax call to GIPHY server to get images

function getGifs() {

$(".item-buttons").on("click", function(){

$(".results").empty();


// this variable holds a keyword for search

var search = $(this).attr("value");

console.log(search);

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=6TcDgJson23T2pB2AaWqZ5Gl6yOhDUsN&limit=5";


//ajax call

 $.ajax({
          url: queryURL,
          method: "GET"
        })
		.done(function(response){

		console.log(response);
		var results = response.data;

			for (var index = 0; index < results.length; index++) {


				// dynamically creating gifs

				var resultImage = $("<img>");
				resultImage.addClass("resultGif");

				// adding attributes for animation

				resultImage.attr("data-still", results[index].images.fixed_height_still.url);
				resultImage.attr("data-animate", results[index].images.fixed_height.url);
				resultImage.attr("src", results[index].images.fixed_height_still.url);
				resultImage.attr("data-state", "still");


				// adding rating

				var imageRating = $("<p>");
				imageRating.text("Rating: " + results[index].rating);

			
				$(".results").append(resultImage);
				$(".results").append(imageRating);
			};


		});

}); //on click closing

};

getGifs();

// function to animate images on click

$(document.body).on("click", ".resultGif", function() {
	console.log("clicked");
	var getState = $(this).attr("data-state");
	if(getState === "still") {

		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}

	else {

		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});


// pushing value from search field into the topics array

$(document.body).on("click", ".input-button", function(event){
	event.preventDefault();
	var getInput = $(".search-input").val().trim();
	$(".search-input").val("");
	topics.push(getInput);
	createBtns();
	getGifs();
});


}); //doc ready closing