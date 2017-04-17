var Client = require('node-rest-client').Client;

var client = new Client();

const REGION = "BR1";
const BASE_URL = "https://br.api.pvp.net/championmastery/location/" + REGION;
const PATH = '/player/${playerId}/champion/${champId}?api_key=${api_key}';
const API_KEY_CONST = "f6170541-f23f-493c-b699-547cc664fa20";

var lolChampionMasteryAPIClient = {
    /**
     * 
        championLevel	int	Champion level for specified player and champion combination.
        chestGranted	boolean	Is chest granted for this champion or not in current season.
        championPoints	int	Total number of champion points for this player and champion combination - they are used to determine championLevel.
        championId	    long	Champion ID for this entry.
        playerId	    long	Player ID for this entry.
        championPointsUntilNextLevel	long	Number of points needed to achieve next level. Zero if player reached maximum champion level for this champion.
        championPointsSinceLastLevel	long	Number of points earned since current level has been achieved. Zero if player reached maximum champion level for this champion.
        lastPlayTime	long	Last time this champion was played by this player - in Unix milliseconds time format.
     * 
     */
    getMasteryByPlayerAndChampion: function(playerId, champId, callback){
        const args = {
            path: { "playerId": playerId, "champId": champId, "api_key": API_KEY_CONST },	
        };
        const api_url = BASE_URL + PATH; 

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
}

module.exports = lolChampionMasteryAPIClient;