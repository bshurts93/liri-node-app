
// APP DEPENDENCIES
require("dotenv").config();
var inquirer = require("inquirer")
var moment = require("moment");
var keys = require("./keys.js");
var fs = require("fs");

// NPM PACKAGES
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");


// NODE INPUT
var command = process.argv[2];
var input = [];

var consoleLine = "---------------------------------------------------------------------------------------------------------------------------------------------------------------";

// GRABS CLI INPUT (only used in v1 of original assignment)
// for (var i = 3; i < process.argv.length; i++) {
//     input.push(process.argv[i]);
// }

// INQUIRER BASE PROMPT
function liriMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "searchType",
            message: "What would you like to do?",
            choices: ["Search concerts", "Search Spotify", "Search movies", "Test app"]
        }
    ]).then(function (answer) {
        var selection = answer.searchType;

        switch (selection) {
            case "Search concerts":
                concertThis();
                break;
            case "Search Spotify":
                spotifyThisSong();
                break;
            case "Search movies":
                movieThis();
                break;
            case "Test app":
                testApp();
                break;
            default:
                console.log("ERR");
        }
    });
}

// API FUNCTIONS
function concertThis(artist) {

    inquirer.prompt([
        {
            type: "input",
            name: "artist",
            message: "What artist do you want to see?",
        }
    ]).then(function (answer) {
        artist = answer.artist;

        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(queryURL)
            .then(function (response) {

                console.log("\r\n\r\n");
                console.log("BANDSINTOWN DATA FOR " + artist.toUpperCase());
                for (var i = 0; i < 5; i++) {
                    var venue = response.data[i].venue.name;
                    var city = response.data[i].venue.city;
                    var region = response.data[i].venue.region;
                    var date = moment(response.data[i].datetime).format("MMMM Do YYYY, h:mma");

                    console.log(consoleLine);
                    console.log("Venue: " + venue);
                    console.log("City: " + city + ", " + region);
                    console.log("Date: " + date);

                    fs.appendFile("log.txt", artist + "\n\r\n" + venue + "\n" + city + "\n" + region + "\n" + date + "\n" + consoleLine + "\n\r", function (err) {
                        if (err) { throw err; }
                    });
                }
                console.log(consoleLine);
                console.log("\r\n\r\n");

                liriMenu();
            }).catch(function (error) {
                console.log(consoleLine);
                console.log("Sorry! No concert data can be found for that artist.");
                console.log("\r\n");
                console.log("Error info: " + error);
                console.log(consoleLine);
            });
    });

}
function spotifyThisSong(song) {
    inquirer.prompt([
        {
            type: "input",
            name: "song",
            message: "What song are you searching for?",
        }
    ]).then(function (answer) {
        song = answer.song;

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

                fs.appendFile("log.txt", "\n\r\n" + track + "\n" + artist + "\n" + album + "\n" + link + "\n\r" + consoleLine, function (err) {
                    if (err) { throw err; }
                });
            }
            console.log(consoleLine);
            console.log("\r\n\r\n");

            liriMenu();
        });
    });
}
function movieThis(movie) {

    inquirer.prompt([
        {
            type: "input",
            name: "movie",
            message: "What movie would you like to know about?",
        }
    ]).then(function (answer) {
        movie = answer.movie;

        var queryURL = "http://www.omdbapi.com/?apikey=" + keys.omdb.key + "&t=" + movie;

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

                fs.appendFile("log.txt", "\n\r\n" + movie.Title + "\n" + movie.Year + "\n" + movie.Rated + "\n" + movie.Ratings[1].Value + "\n" + movie.Language + "\n" + movie.Actors + "\n\r" + consoleLine, function (err) {
                    if (err) { throw err; }
                });


                liriMenu();
            });
    });
}
function testApp() {
    fs.readFile('random.txt', "utf8", function (err, data) {
        if (err) throw err;

        dataArr = data.toString().split(",")

        // Extract input data from array
        var spotifySong = dataArr[1];
        var bandsAPIArtist = dataArr[3];
        var movieTitle = dataArr[5];

        // Bandsintown API call
        var concertURL = "https://rest.bandsintown.com/artists/" + bandsAPIArtist + "/events?app_id=codingbootcamp";
        axios.get(concertURL)
            .then(function (response) {

                console.log("\r\n\r\n");
                console.log("BANDSINTOWN DATA FOR " + bandsAPIArtist.toUpperCase());
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
            }).catch(function (error) {
                console.log(consoleLine);
                console.log("Sorry! No concert data can be found for that artist.");
                console.log("\r\n");
                console.log("Error info: " + error);
                console.log(consoleLine);
            });

        // Spotify API call
        spotify.search({ type: 'track', query: spotifySong }, function (err, data) {
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
            console.log("SPOTIFY DATA FOR " + spotifySong.toUpperCase());

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

        // OMDB API call
        var movieURL = "http://www.omdbapi.com/?apikey=" + keys.omdb.key + "&t=" + movieTitle;
        axios.get(movieURL)
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
    });
}

liriMenu();




// V1 COMMAND LINE CONTROLS (BASE ASSIGNMENT)

// // CONCERT THIS
// if (command === "concert-this") {
//     concertThis();
// }

// // SPOTIFY THIS SONG
// if (command === "spotify-this-song") {
//     spotifyThisSong();
// }

// // MOVIE THIS
// if (command === "movie-this") {
//     movieThis();
// }

// // DO WHAT IT SAYS
// if (command === "do-what-it-says") {
//     fs.readFile('random.txt', "utf8", function (err, data) {
//         if (err) throw err;
//         dataArr = data.toString().split(",")
//         // console.log(dataArr);

//         spotifyThisSong(dataArr[1]);
//         concertThis(dataArr[3]);
//         movieThis(dataArr[5]);
//     });
// }
