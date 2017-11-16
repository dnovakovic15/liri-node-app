let keys = require('./keys.js');
let twitter = require('twitter');
let Spotify = require('node-spotify-api');
let request = require('request');
let fs = require('fs');
var util = require('util');
let twitterAuth;
let fileOutput = [];

let command = process.argv[2];
let input = process.argv.splice(3, process.argv.length - 1).join(',');

switch(command) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            callSpotify();
            break;
        case 'movie-this':
            movies();
            break;
        case 'do-what-it-says':
            doSays();
            break;
}

//Function that fetches tweets from the user specified in the keys.js file.
function myTweets(){
    let twitterAuth = keys.twitterKeys;

    var client = new twitter(keys);

    var params = {screen_name: 'DarkoNovakovi12'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for(var i = 0; i < tweets.length; i++){
            let tweetArray = [];
            tweetArray.push(tweets[i].text);
            tweetArray.push(tweets[i].created_at);
            console.log(tweetArray.join(', '));
        }
    }
    });
}

//Function that calls spotify API and outputs information based on song name.
function callSpotify(){
    var spotify = new Spotify({
        id: '43fda1d2449a4896bd08da08bc20afa7',
        secret: 'e056a1daad124d728e1824a71baf9bf3'
    });
    
    spotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }   
        if(data.tracks.items.length > 1){
            for(var i = 0; i < data.tracks.items.length; i++){
                process.stdout.write('Artists: ');
                let artistsArray = [];
                for(var j = 0; j < data.tracks.items[i].artists.length; j++){
                    artistsArray.push(data.tracks.items[i].artists[j].name)
                }
                console.log(artistsArray.join(', '));
                console.log('Song Name: ' + data.tracks.items[i].name); 
                console.log('Spotify URL: ' + data.tracks.items[i].preview_url); 
                console.log('Album: ' + data.tracks.items[i].album.name);
                console.log('-------------------------')   
            }
        } 
        else{
            input = 'The Sign';
            callSpotify();
        }
    })
}

//Function that calls the OMDB movies API and outputs certain information based on movie name.
function movies(){
    request('http://www.omdbapi.com/?apikey=940c1089&t=' + input + '&r=json', function (error, response, body) {
        var json = JSON.parse(body);
        if(error){
            console.log('error:', error);
        }
        else if(json.Response == 'True'){
            console.log('Title: ' + json.Title); 
            console.log('Year: ' + json.Year); 
            console.log('IMDB Rating: ' + json.imdbRating);
            if(json.Ratings[1]){
                console.log('Rotten Rating: ' + json.Ratings[1].Value); 
            }
            else{
                console.log('No Rotten Tomatoes Rating Found')
            }
            console.log('Countries: ' + json.Country); 
            console.log('Languages: ' + json.Language); 
            console.log('Plot: ' + json.Plot); 
            console.log('Actors: ' + json.Actors); 
        }
        else {
            input = 'Mr. Nobody';
            movies()
        }
    });
}

//Function that calls callSpotify specified by the song in random.txt
function doSays(){
    fs.readFile('./random.txt', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    input = data.split(',')[1];
    callSpotify();
    });
}

//Create variables that hold the outputStream to log.txt and process.stdout
var log_file = fs.createWriteStream('log.txt', {flags : 'a'});
var log_stdout = process.stdout;

//Overload console.log for it to print to stdout as well as to append to the wrtieStream.
console.log = function(d) { 
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

//Seperate each command in the log.txt file.
log_file.write('\n');
