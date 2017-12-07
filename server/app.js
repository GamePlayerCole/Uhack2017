const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
var fs = require('fs');
// var https = require('https');

const app = express();

app.use(logger('dev'));
app.use(cors());

/*
var options = {
	key: fs.readFileSync("./keys/mockserver.key"),
	cert: fs.readFileSync("./keys/mockserver.crt")
}
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
	res.status(200).send({message: 'Hello World.'})
});


app.get('/yelp', function(req, res) {
	axios.post('https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}')
	  .then(response => {
	  	var token = response['data']['access_token'];
		var lat = req.param('latitude');
		var long = req.param('longitude');
		var radius = Math.floor(milesToMeters(req.param('radius')));

		const AuthStr = 'Bearer ' + token; 
		axios.get('https://api.yelp.com/v3/businesses/search?latitude=' + lat + '&longitude=' + long + '&radius=' + radius + '&limit=50', { headers: { Authorization: AuthStr } })
		 .then(restaurantsList => {
		 	console.log(restaurantsList.data);
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

function milesToMeters(miles) { return miles * 1609.34 };

app.listen(3000, () => console.log('Application on port 3000'));

// Todo Radius, 
