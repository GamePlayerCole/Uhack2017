const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
var fs = require('fs');

const app = express();

const CLIENT_ID = '';
const CLIENT_SECRET = '';


app.use(logger('dev'));
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
	res.status(200).send({message: 'Hello World.'})
});


app.get('/yelp', function(req, res) {
	axios.post('https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=' + CLIENT_ID + 
		'&client_secret=' + CLIENT_SECRET)
	  .then(response => {
	  	var token = response['data']['access_token'];
		const AuthStr = 'Bearer ' + token; 
		var lat = req.param('latitude');
		var long = req.param('longitude');
		var radius = Math.floor(milesToMeters(req.param('radius')));
		var offset = calcRandomOffset(900);

		console.log(lat, long, radius, offset);

		axios.get('https://api.yelp.com/v3/businesses/search?latitude=' + lat + '&longitude=' + long 
			+ '&radius=' + radius + '&offset=' + offset + '&limit=50' + '&categories=restaurants', 
			{ headers: { Authorization: AuthStr } })
		 .then(restaurantsList => {
		     return res.json({restaurants: restaurantsList.data.businesses});
		  })
		 .catch((error) => {
		     console.log('error ' + error);
		  });
	  })
	  .catch(error => {
	    console.log(error);
	  });
});

function milesToMeters(miles) { return miles * 1609.34 }

function calcRandomOffset(max) { return Math.floor(Math.random() * max) }

app.listen(3000, () => console.log('Application on port 3000'));
