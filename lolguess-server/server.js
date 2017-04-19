var express = require('express');
var bodyParser = require('body-parser');
var fs = require ('fs');
var lolGuessService = require('./LOLGuessService');
var app = express();

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/currentMatchStat/:summonerName', function(req, res) {
    console.log("GET stats");

    if('mock' == req.params.summonerName){
        fs.readFile('lolCurrentGameInfo.json', 'utf8', function(err, data) {  
            if (err) throw err;
            // console.log(data);
            res.send(data);
        });
    }else{
        lolGuessService.getPlayersDetailsFromCurrentMatch(req.params.summonerName, function(data){
            const jsonData = JSON.stringify(data);
            console.log('Webservice return:' + jsonData);
            res.send(jsonData);
        });
    }
});

app.listen(6069);
