var Client = require('node-rest-client').Client;

// configure proxy 
var options_proxy = {
    proxy: {
        host: "localhost",
        port: 3128,
        tunnel: false
    }
};

var client = new Client();

const REGION = "BR1";
const BASE_URL = "https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo";
const API_KEY_CONST = "f6170541-f23f-493c-b699-547cc664fa20";

var lolCurrentMatchAPIClient = {
    getCurrentMatchInfos: function(summonerId, callback){
        var args = {
            path: { "summonerId": summonerId, "api_key": API_KEY_CONST },	
        };
        var api_url = BASE_URL + '/' + REGION + '/${summonerId}?api_key=${api_key}'; 
        client.get(api_url, args,
            function (data, response) {
                callback(data, response.statusCode);
            }).on('error', function (err) {
                console.log('something went wrong on the request', err.request.options);
            }); 
    }

}

module.exports = lolCurrentMatchAPIClient;