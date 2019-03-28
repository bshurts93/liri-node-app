
// APP DEPENDENCIES
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");

// NPM PACKAGES
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios")


// NODE INPUT
var command = process.argv[2];
var input = [];

var consoleLine = "---------------------------------------------------------------------------------------------------------------------------------------------------------------";

for (var i = 3; i < process.argv.length; i++) {
    input.push(process.argv[i]);
}

// API FUNCTIONS
function concertThis(artist) {
    if (!artist) { artist = input.join("%20") };
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
        .then(function (response) {

            console.log("\r\n\r\n");
            console.log("BANDSINTOWN DATA FOR " + artist.toUpperCase());
            for (var i = 0; i < 5; i++) {
                var venue = response.data[i].venue.name;
                var city = response.data[i].venue.city;
                var region = response.data[i].venue.region;
                var date = response.data[i].datetime;

                console.log(consoleLine);
                console.log("Venue: " + venue);
                console.log("City: " + city + ", " + region);
                console.log("Date: " + date);
            }
            console.log(consoleLine);
            console.log("\r\n\r\n");
        });
}
function spotifyThisSong(song) {
    if (!song) { song = input.join(" "); }

    spotify.search({ type: 'track', query: song }, function (err, data) {
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
        console.log("\r\n\r\n");
        console.log("SPOTIFY DATA FOR " + song.toUpperCase());

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
        console.log("\r\n\r\n");
    });
}
function movieThis(movie) {
    if (!movie) { movie = input.join("+"); }

    var queryURL = "http://www.omdbapi.com/?apikey=c00acbcb&t=" + movie;

    axios.get(queryURL)
        .then(function (response) {
            var movie = response.data;

            console.log("\r\n\r\n");
            console.log("OMDB DATA FOR " + movie.Title.toUpperCase());
            console.log(consoleLine);
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("Rating: " + movie.Rated);
            console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
            console.log("Language: " + movie.Language);
            console.log("Actors: " + movie.Actors);
            console.log("\r");
            console.log("Plot: " + movie.Plot);
            console.log(consoleLine);
            console.log("\r\n\r\n");
        });
}

// CONCERT THIS
if (command === "concert-this") {
    concertThis();
}

// SPOTIFY THIS SONG
if (command === "spotify-this-song") {
    spotifyThisSong();
}

// MOVIE THIS
if (command === "movie-this") {
    movieThis();
}

// DO WHAT IT SAYS
if (command === "do-what-it-says") {
    fs.readFile('random.txt', "utf8", function (err, data) {
        if (err) throw err;
        dataArr = data.toString().split(",")
        // console.log(dataArr);

        spotifyThisSong(dataArr[1]);
        concertThis(dataArr[3]);
        movieThis(dataArr[5]);
    });
}
