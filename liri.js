let keys = require('./keys.js');
let twitter = require('twitter');
let Spotify = require('node-spotify-api')
let twitterAuth;

let command = process.argv[2];

switch(command) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            callSpotify();
            break;
        case 'movie-this':
            movies();
        case 'do-what-it-says':
            doSays();
            break;
}

function myTweets(){
    let twitterAuth = keys.twitterKeys;

    var client = new twitter(keys);

    var params = {screen_name: 'DarkoNovakovi12'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets[0].created_at);
        console.log(tweets[0].text);
    }
    });
}

function callSpotify(){
    var spotify = new Spotify({
        id: '43fda1d2449a4896bd08da08bc20afa7',
        secret: 'e056a1daad124d728e1824a71baf9bf3'
    });
    
    spotify.search({ type: 'track', query: 'Thunderstruck' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
    }
    
    console.log(data); 
    })
}
