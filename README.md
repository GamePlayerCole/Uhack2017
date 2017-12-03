# Uhack2017
## Inspiration
Finding a place to eat with your friends or significant other can be challenging sometimes, not because you don't know what you want to eat, but because there are so many options out there. Hungry Hub is meant to be used as a one tap suggestion for where you can eat next.

## What it does
You provide your location and desired radius to be within for the place you would like to eat at and Hungry Hub will suggest a place to you based on the parameters. Still undecided? Go ahead an click "Nope, gimme another" and Hungry Hub will suggest another place.

## How we built it
We used Nodejs to run our server-side requests to yelp and to manipulate the response. On the client side, we have vanilla Javascript and Jquery to have in-browser manipulations. The interface of the front-end is built with HTML, CSS, and Bootstrap. One of our team members also used the Corona framework to create a cross platform mobile application displaying the same information.

## Challenges we ran into
One of the biggest challenges we ran into was running our node server over HTTPS. This was required because our web frontend had to run over HTTPS to get the User geolocation data. If the frontend runs over HTTPS and node runs over HTTP, the browser complains about serving insecure data, and does not display any of the fetched data. When we configured node to run over HTTPS, the browser complained again saying that the server certificate may be fraudulent. Because of this, we had to use a workaround. For the demo, we ran our node server locally and opened up the port we used by using ngrok to get an HTTPS link. We then plugged this link into our frontend and the data was able to load without any complaints.

## Accomplishments that we're proud of
We are proud of getting a cross-platform prototype up and running in the short amount of time we had. 

## What we learned
Third Party API usage, Nodejs, Asynchronous vs Synchronous, and much more

## What's next for Hungry Hub
Some features we would like to implement next are filters by price, ratings, meal types (breakfast, lunch, dinner, etc.) and previously eaten (logs with use login).

