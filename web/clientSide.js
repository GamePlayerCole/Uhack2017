$(document).ready(function(){
	console.log(restaurantsList);
	$("#new").on("click", function(){
		if (typeof restaurantsList === 'undefined' || restaurantsList === null || restaurantsList.length == 0) {
			getLocation();
		} else {
			getRandomRestaurant();
		}
		
	});

});

var restaurantsList;

function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; 
}

function setHtmlAttributes(name, href, addy, phone, imgUrl, gmapLink) {
	$("#name").html(name);
	$("#name").attr("href", href);
	$("#address").html(addy.join(", "));
	$("#phone-number").html(phone);
	$("#pic").attr("src", imgUrl);
	$("#gmaps-link").html("Google Maps Link");		
	$("#gmaps-link").attr("href", gmapLink);
}

function getRestaurantsList(lat,longitude){

	var restaurantRequest = new XMLHttpRequest();
	restaurantRequest.open("GET", "https://0bbc761e.ngrok.io/yelp?latitude=" + lat+"&longitude="+longitude, true);

	restaurantRequest.onload = function(e){
		console.log("Sending request to server");
		restaurantsList = JSON.parse(restaurantRequest.responseText);
		getRandomRestaurant(lat, longitude);
		$("#new").html("Nope, Gimme Another!");
	};

	restaurantRequest.send();
}

function getRandomRestaurant(lat, long) {
	console.log("Pulling random restaurant from list");
	var randomNum = getRandomInt(0,restaurantsList.restaurants.length);
	var randomRestaurant = restaurantsList.restaurants[randomNum];
	var href = randomRestaurant.url;
	var name = randomRestaurant.name;
	var addy = randomRestaurant.location.display_address;
	var phone = randomRestaurant.display_phone;
	var imgUrl = randomRestaurant.image_url;
	var gmapLink = createDirectionsLink([lat, long], addy);
	console.log(name, addy, href, phone, imgUrl, gmapLink);
	setHtmlAttributes(name, href, addy, phone, imgUrl, gmapLink);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
	getRestaurantsList(position.coords.latitude, position.coords.longitude);
}
