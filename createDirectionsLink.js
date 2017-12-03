//Created by Cole Hemp (GamePlayerCole)
//createDirectionsLink.js
//Takes the address and generates a google maps direction link with the origin being the user's current location and the address pulled.

function createDirectionsLink(address) {
  //Checks if address is a string or an array. If it's a string it'll convert the address into an array
  if (Array.isArray(address) != true)
  {
    var destination = address.split(" ");
  }
  else
  {
    var destination = address;
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
  return "https://www.google.com/maps/dir/Current+Location/" + destinationConverted;
}
