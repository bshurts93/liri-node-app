
// APP DEPENDENCIES
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


// NODE INPUT
var command = process.argv[2];
var input = [];

for (var i = 3; i < process.argv.length; i++) {
    input.push(process.argv[i]);
}

// CONCERT THIS

// node liri.js concert-this <artist/band name here>
if (command === "concert-this") {

    console.log("\r\n");
    console.log("-------------------------------------");
    console.log("Concerts for " + artist + ":");
    console.log("-------------------------------------");
    console.log("\r\n");
}



// SPOTIFY THIS SONG
if (command === "spotify-this-song") {
    userQuery = input.join(" ");
    console.log("ASDFASDF: " + userQuery);

    spotify.search({ type: 'track', query: userQuery }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var track = data.tracks.items[0].name;
        var artist = data.tracks.items[0].artists[0].name;
        var album = data.tracks.items[0].album.name;
        var link = data.tracks.items[0].preview_url;

        console.log("\r\n\r\n");
        console.log("-------------------------------------");
        console.log("Spotify Information");
        console.log("Song: " + track);
        console.log("Artist: " + artist);
        console.log("Album: " + album);
        if (link === null) {
            console.log("Preview: not available");
        } else {
            console.log("Preview: " + link);
        }
        console.log("-------------------------------------");
        console.log("\r\n\r\n");
    });
}


// MOVIE THIS
if (command === "movie-this") {



}



// DO WHAT IT SAYS