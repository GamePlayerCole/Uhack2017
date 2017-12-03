const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
	res.status(200).send({message: 'Hello World.'})
});


app.get('/yelp', function(req, res) {
	axios.post('https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=U8CFldVZKL6PJ-f1_VYIGQ&client_secret=U1qTT2ZQ5qqVP2I3jVd2OswlDztlSHW3jwSiZQuPe7uWrrmnj2HCxF18G1QYYlDl')
	  .then(response => {
	  	var token = response['data']['access_token'];
		var lat = req.param('latitude');
		var long = req.param('longitude');

		const AuthStr = 'Bearer ' + token; 
		axios.get('https://api.yelp.com/v3/businesses/search?latitude=' + lat+'&longitude='+long, { headers: { Authorization: AuthStr } })
		 .then(restaurantsList => {
		     return res.json({resturants: restaurantsList.data.businesses});
		  })
		 .catch((error) => {
		     console.log('error ' + error);
		  });
	  })
	  .catch(error => {
	    console.log(error);
	  });
});

app.listen(3000, () => console.log('Test application on port 3000'));

