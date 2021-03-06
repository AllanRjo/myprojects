var Client = require('node-rest-client').Client;

var client = new Client();

const REGION = "BR";
const BASE_URL = "https://na.api.pvp.net/api/lol/" + REGION	+ "/v1.4";
const FIND_BY_NAME = "/summoner/by-name/";
const FIND_BY_ID = "/summoner/";
const API_KEY_CONST = "f6170541-f23f-493c-b699-547cc664fa20";

var lolUserAPIClient = {
    getByName: function(name, callback){
        var args = {
            path: { "name": name, "api_key": API_KEY_CONST },	
        };
        var api_url = BASE_URL + FIND_BY_NAME + '${name}?api_key=${api_key}'; 

        client.get(api_url, args, function(data, response){
            // parsed response body as js object 
            callback(data, response.statusCode);
        }).on('error', function (err) {
            console.log('something went wrong on the request', err.request.options);
        }); 
        // handling client error events 
        client.on('error', function (err) {
            console.error('Something went wrong on the client', err);
        });        
    },
    getByIds: function(ids, callback){
        var args = {
            path: { "ids": ids, "api_key": API_KEY_CONST },	
        };
        var api_url = BASE_URL + FIND_BY_ID + '${ids}?api_key=${api_key}'; 

        client.get(api_url, args, function(data, response){
            // parsed response body as js object 
            callback(data);
        }).on('error', function (err) {
            console.log('something went wrong on the request', err.request.options);
        }); 
        // handling client error events 
        client.on('error', function (err) {
            console.error('Something went wrong on the client', err);
        });        
    }

}

module.exports = lolUserAPIClient;