//Created by Cole Hemp (GamePlayerCole)
//createDirectionsLink.js
//Takes the address and generates a google maps direction link with the origin being the user's current location and the address pulled.


//Inputs:
//originLongitudeLatitude - An array containing the Longitude and Latitude of the user's location.
//destinationAddress - A string/string array containing the address of the destination.
function createDirectionsLink(orginLatitudeLongitude, destinationAddress) {
  //Converts array of inputted Longitude and Latitude of the user to a format useable by Google Maps URL api
  var originConverted = orginLatitudeLongitude[0] + "," + orginLatitudeLongitude[1];


  //Checks if address is a string or an array. If it's a string it'll convert the address into an array
  if (Array.isArray(destinationAddress) != true)
  {
    var destination = destinationAddress.split(" ");
  }
  else
  {
    var destination = destinationAddress;
  }


  //converts the array into a format combatible for the URL
  var destinationConverted = "";
  for (i = 0; i < destination.length; i++)
  {
    if (i != destination.length-1)
    {
      destinationConverted = destinationConverted + destination[i] + "+";
    }
    else {
      destinationConverted = destinationConverted + destination[i];
    }
  }


  //Generates the link for Google Maps Directions for current location to desired address
  return "https://www.google.com/maps/dir/" + originConverted + "/" + destinationConverted;
}
