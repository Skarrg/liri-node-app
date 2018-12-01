require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var nodeArgv = process.argv;
var command = process.argv[2];

var search = process.argv.slice(3).join(" ");

switch(command) {

    case "spotify":
    if(search){
        spotifySearch(search);
    } else {
        spotifySearch("The Sign");
    }
    break;

    case "movie":
    if(search){
        
    }
    break;

    case "concert":
    if(search){
        
    }
    break;

    default:
    console.log("Yo my commands are: spotify, movie, concert");
    break;
}

function spotifySearch(song){
    spotify.search({ type: 'track', query: song, limit: 2 }, function(error, data){
     
      if(error){
        console.log('Error: Spotify search messed up.');
      } else {
        for(var i = 0; i < data.tracks.items.length; i++){
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