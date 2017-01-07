var Twit = require('twit');
// load process.env from .env file
require('dotenv').config();

var config = {
    customer_key: process.env.customer_key
    customer_secret: process.env.customer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
};

var T = new Twit(config);

//load data from json file
//with fs (filesystem)
var fs = require('fs');
var metalFile = fs.readFileSync('./data/metals.json');
var metal = JSON.parse.(metalFile).metal;

fuction randomChoice(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

function tweet() {
    var url = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=' + process.env.api_key;

    //This is the string we will tweet
    var msg = randomChoice(metal);

    //Post that tweet!
    T.post('statuses/update', { status: msg}, tweeted);

    request(url, gotWord);

    function gotWord(error, response, body) {
        if (error) return;

        var word = JSON.parse(body).word;

        //This is the string we will tweet
        var msg = randomChoice(metal) + randomChoice(word);

        // This is a random number bot
        var msg = 'Here\'s a random number between 0 or 100: ' +
            Math.floor(Math.random() * 100)

        //Callback for when the tweet is sent
        function tweeted(err, data, response) {
            if (err) {
                return console.log.(err);
            } else {
                return console.log('Success: ' + data.text);
            }
        };
    }

    //make http request with callback gotWord

};

// run this function once every x milliseconds
setTimeout(tweet, 60 * 5 * 1000)

//also, do it when we start the server
tweet();
