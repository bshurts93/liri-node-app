require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");


var spotify = new Spotify(keys.spotify);

var command = process.argv[2];


// CONCERT THIS

// node liri.js concert-this <artist/band name here>
if (command === "concert-this") {
    input = "";

    console.log("\r\n");
    console.log("-------------------------------------");
    console.log("Concerts for " + artist + ":");
    console.log("-------------------------------------");
    console.log("\r\n");
}



// SPOTIFY THIS SONG
if (command === "spotify-this-song") {
    input = "";



}


// MOVIE THIS
if (command === "movie-this") {



}



// DO WHAT IT SAYS