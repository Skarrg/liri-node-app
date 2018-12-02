require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
var omdb = require('omdb');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var nodeArgv = process.argv;
var command = process.argv[2];


var search = process.argv.slice(3).join("+");

switch (command) {

    case "spotify-song":
        if (search) {
            spotifySearch(search);
        } else {
            spotifySearch("The Sign");
        }
        break;

    case "movie":
        if (search) {
            if (search) {
                movieSearch(search);
            } else {
                movieSearch("Mr Nobody.");
            }
        }
        break;

    case "concert":
        if (search) {
            if (search) {
                concertSearch(search);
            } else {
                concertSearch("Mastodon");
            }
        }
        break;

    default:
        console.log("My current commands are: spotify, movie, concert");
        break;
}

function spotifySearch(song) {
    spotify.search({ type: 'track', query: song, limit: 2 }, function (error, data) {

        if (error) {
            console.log('Error: Spotify search messed up.');
        } else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                console.log("Artist: " + songData.artists[0].name);
                console.log("Song: " + songData.name);
                console.log("URL: " + songData.preview_url);
                console.log("Album: " + songData.album.name);
                console.log("*************");
            }

        }

    });
}

function movieSearch(movie) {
    console.log(movie);
    axios.get("http://www.omdbapi.com/?t=" + movie
        + "&y=&plot=short&apikey=trilogy").then(
            function (response) {

                summary = "\nRelease Date: " + response.data.Released +
                    "\nImdb Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry of Origin: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors: " + response.data.Actors;

                console.log(summary);
            }
        );
}


function concertSearch(concert) {
    console.log("concert blank")
}