
// APP DEPENDENCIES
require("dotenv").config();
var keys = require("./keys.js");

// NPM PACKAGES
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios")


// NODE INPUT
var command = process.argv[2];
var input = [];

var consoleLine = "--------------------------------------------------------------------------------------------------------------------"

for (var i = 3; i < process.argv.length; i++) {
    input.push(process.argv[i]);
}

// CONCERT THIS
if (command === "concert-this") {
    var userQuery = input.join("%20");
    var queryURL = "https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
        .then(function (response) {
            console.log(response.data[0]);
        })

}

// SPOTIFY THIS SONG
if (command === "spotify-this-song") {
    userQuery = input.join(" ");

    spotify.search({ type: 'track', query: userQuery }, function (err, data) {
        if (err) {

            console.log("\r\n\r\n");
            console.log("-------------------------------------");
            console.log("Can't find that song! Here's another.");
            console.log("Song: The Sign");
            console.log("Artist: Ace of Base");
            console.log("Album: Happy Nation");
            console.log("Preview: not available");
            console.log("-------------------------------------");
            console.log("\r\n\r\n");

            return console.log('Error occurred: ' + err);
        }
        console.log("\r");
        console.log("SPOTIFY THIS");

        for (var i = 0; i < 3; i++) {
            var track = data.tracks.items[i].name;
            var artist = data.tracks.items[i].artists[0].name;
            var album = data.tracks.items[i].album.name;
            var link = data.tracks.items[i].preview_url;

            console.log(consoleLine);
            console.log("Song: " + track);
            console.log("Artist: " + artist);
            console.log("Album: " + album);
            if (link === null) {
                console.log("Preview: not available");
            } else {
                console.log("Preview: " + link);
            }
        }
        console.log(consoleLine);
        console.log("\r");

    });
}


// MOVIE THIS
if (command === "movie-this") {



}



// DO WHAT IT SAYS