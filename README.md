# Liri - a node.js app

Welcome to Liri, the node.js based language interpretation and recognition interface. Liri runs on your command line and is your companion to help find music, concerts and movies.

## Getting started

It's easy as `npm i`. As long as you have node installed, just download the dependencies included in the package.json.

## Running Liri in node

Liri is used wherever you use node. In your bash/terminal of choice, run `liri.js` and the command line interface will prompt you with your choices. You can search Bandsintown to get tour dates of your favorite artist, Spotify for info on your latest jam, or end that argument with Laura over what year the orinial Star Wars came out. 

## Here's a look

#### Search for artist concerts
![bandsintown search gif](https://github.com/bshurts93/liri-node-app/blob/master/images/bandsintown.gif)

#### Search for songs
![spotify search gif](https://github.com/bshurts93/liri-node-app/blob/master/images/spotify.gif)

#### Search for movies
![omdb search gif](https://github.com/bshurts93/liri-node-app/blob/master/images/omdb.gif)

#### Test Liri's functions
![test gif](https://github.com/bshurts93/liri-node-app/blob/master/images/test.gif)

### Don't use your noggin, just get loggin'
After each search, the results will be saved to the included file `log.txt`. No need to remember any of the info you search in a session!

### APIs and Dependencies 

Liri utilizes data from the follwing APIs and NPM packages

* [Spotify API](https://developer.spotify.com/documentation/web-api/)
* [Bandsintown API](https://manager.bandsintown.com/support/bandsintown-api)
* [OMDB API](http://www.omdbapi.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [Moment](https://www.npmjs.com/package/moment)
* [Node Spotify API](https://www.npmjs.com/package/node-spotify-api)

## Author

* **Ben Shurts** 

## Acknowledgments

* This is a project built during the Vanderbilt Coding Bootcamp, spring 2019
* Node can be cool!
* Boy, howdy... - Tim Yager
