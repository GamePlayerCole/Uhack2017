$(document).ready(function(){
	$("#new").on("click", function(){
		getLocation();
	});

});

var restaurant;

function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; 
}

function getRandomRestaurant(lat,longitude){

	var restaurantRequest = new XMLHttpRequest();
	restaurantRequest.open("GET", "http://54.148.9.45:3000/yelp?latitude=" + lat+"&longitude="+longitude, true);

	restaurantRequest.onload = function(e){
		console.log(restaurantRequest.responseText);
		var restaurantsList = JSON.parse(restaurantRequest.responseText);
		var randomNum = getRandomInt(0,restaurantsList.restaurants.length);
		var randomRestaurant = restaurantsList.restaurants[randomNum];
		restaurant = randomRestaurant;
		var href = randomRestaurant.url;
		var name = randomRestaurant.name;
		var addy = randomRestaurant.location.display_address;
		var phone = randomRestaurant.display_phone;
		var imgUrl = randomRestaurant.image_url;
		$("#name").html(name);
		$("#name").attr("href", href);
		$("#address").html(addy.join(", "));
		$("#phone-number").html(phone);
		$("#pic").attr("src", imgUrl);
	};

	restaurantRequest.send();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
	getRandomRestaurant(position.coords.latitude, position.coords.longitude);
}