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

    case "spotify":
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

    case "dowhatitsays":
        doWhatItSays();
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
                var summary = "\nArtist: " + songData.artists[0].name
                    + "\nSong: " + songData.name
                    + "\nURL: " + songData.preview_url
                    + "\nAlbum: " + songData.album.name
                    + "\n*************";

                console.log(summary);
            }

        }

    });
}

function movieSearch(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            summary = "\nRelease Date: " + response.data.Released +
                "\nImdb Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nCountry of Origin: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nActors: " + response.data.Actors;
            console.log("*************");

            console.log(summary);
        }
    );
}


function concertSearch(artist) {
    var queryUrl = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp'

    request(queryUrl, function (error, response, body) {

        let results = JSON.parse(body);

        if (results.length === 0) {
            console.log("No such band found. Try again.")
        }

        if (error) {
            console.log('Error: ', error)
        };

        results.forEach(function (event) {
            let name = event.venue.name;
            let city = event.venue.city;
            let date = moment(event.datetime).format("MM/DD/YYYY");
            let country = event.venue.country;
            summary = "\nDate: " + date +
                "\nVenue: " + name +
                "\nLocation: " + city + ", " + country +
                "\n*************";

            console.log(summary);
        });
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function (err, data){
        if (err) { throw err }
        spotifySearch(data);
    })
}