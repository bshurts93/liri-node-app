require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");


var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = process.argv[3];


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

    spotify.search({ type: 'track', query: 'All the small things' }, function (err, data) {
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