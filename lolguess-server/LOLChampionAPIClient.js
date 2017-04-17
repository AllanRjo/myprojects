var Client = require('node-rest-client').Client;

var client = new Client();

const REGION = "br";
const BASE_URL = "https://global.api.pvp.net/api/lol/static-data/" + REGION + "/v1.2";
const PATH = "/champion/";
const API_KEY_CONST = "f6170541-f23f-493c-b699-547cc664fa20";

var lolChampionAPIClient = {
    getById: function(champId, champData, callback){
        var args = {
            path: { "champId": champId, "champData": champData, "api_key": API_KEY_CONST },	
        };
        var api_url = BASE_URL + PATH + "${champId}?champData=${champData}&api_key=${api_key}"

        client.get(api_url, args, function(data, response){
            callback(data);
        }).on('error', function (err) {
            console.log('something went wrong on the request', err.request.options);
        }); 
        // handling client error events 
        client.on('error', function (err) {
            console.error('Something went wrong on the client', err);
        });        
    },
    /**
     * 
        {
            "image": {
                "full": "Nasus.png",
                "group": "champion",
                "sprite": "champion2.png",
                "h": 48,
                "w": 48,
                "y": 48,
                "x": 192
            },
            "title": "o Curador das Areias",
            "id": 75,
            "key": "Nasus",
            "name": "Nasus"
        }
     * 
     */
    getByIdOnlyImage: function(champId, callback){
        var args = {
            path: { "champId": champId, champData: "image", "api_key": API_KEY_CONST },	
        };
        var api_url = BASE_URL + PATH + "${champId}?champData=${champData}&api_key=${api_key}"

        client.get(api_url, args, function(data, response){
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

module.exports = lolChampionAPIClient;