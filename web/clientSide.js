$(document).ready(function(){
	$("#results").hide();
	//console.log(restaurantsList)
	$("#new").on("click", function(){
		if (typeof restaurantsList === 'undefined' || restaurantsList === null || restaurantsList.length == 0) {
			getLocation();
		} else {
			if (radius != document.getElementById("distanceValue").value) {
				getRestaurantsList(lat, long);
			} else {
				getRandomRestaurant(lat, long);
			}
		}

	});

});

var restaurantsList;
var lat;
var long;
var radius;

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
	$("#gmaps-link").html("Open in Google Maps");
	$("#gmaps-link").attr("href", gmapLink);
	$("#results").show();
}

function getRestaurantsList(lat,longitude){
	radius = document.getElementById("distanceValue").value;
	var restaurantRequest = new XMLHttpRequest();
	restaurantRequest.open("GET", "https://b540f69c.ngrok.io/yelp?latitude="+lat+"&longitude="+longitude+"&radius="+radius, true);

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
	lat = position.coords.latitude;
	long = position.coords.longitude;
	getRestaurantsList(lat, long);
}
