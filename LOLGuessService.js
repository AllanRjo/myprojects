const lolUserAPIClient = require('./LOLUserAPIClient');
const lolCurrentMatchAPIClient = require('./LOLCurrentMatchAPIClient');
const lolChampionMasteryAPIClient = require('./LOLChampionMasteryAPIClient');
const lolChampionAPIClient = require('./LOLChampionAPIClient');

const Error = (m,c) => ({
    msg: m,
    code: c
})

const Participant= (p) => ({
    participant: p,
    summonerLevel: '',
    championInfos: {},
    stats: '',
    champioLevel: ''
})

const CurrentGameStats = {
    participants: [],
    chancesTeam1 : '',
    chancesTeam2: ''
}

const lolGuessService = {
    getPlayersDetailsFromCurrentMatch: function(summonerName, callback){
        lolUserAPIClient.getByName(summonerName, function(userDetails){
            console.info(userDetails);
            lolCurrentMatchAPIClient.getCurrentMatchInfos(userDetails[summonerName.toLowerCase()].id, function(currentMatchInfos, responseCode){
                if(responseCode == 404){
                    return Error('SummonerName not in game', responseCode);
                }
                const participants = currentMatchInfos.participants;
                getParticipantsMatchInfos(participants, function(usersDetails){
                    let len = participants.length;
                    let j = 0, finished = 0;
                    for(j =0; j < len; j++){
                        let p = Participant(participants[j]);
                        p.summonerLevel = usersDetails[p.participant.summonerId].summonerLevel;                            
                        CurrentGameStats.participants.push(p);
                        // console.log('p.id=' + p.participant.summonerId + ' u.id=' + usersDetails[p.participant.summonerId].id);
                        lolChampionMasteryAPIClient.getMasteryByPlayerAndChampion(p.participant.summonerId, p.participant.championId, 
                            function(champioMasteryInfos, responseCode){
                                if(responseCode == 200)
                                    p.champioLevel = champioMasteryInfos.champioLevel;
                                else
                                    p.champioLevel = 0;
                                lolChampionAPIClient.getByIdOnlyImage(p.participant.championId, function(championInfos){
                                    p.championInfos = championInfos;
                                    finished++;
                                    if( finished == len)
                                        callback(CurrentGameStats);
                                });
                            }
                        );
                    }
                });
            });
        });
    }
}

function getParticipantsMatchInfos(participants, callback){
    const len = participants.length;
    let summonnerIds = '';
    for (let i = 0; i < len; i++) {
        summonnerIds += participants[i].summonerId;
        if(i != len - 1)
            summonnerIds += ',';
    }
    lolUserAPIClient.getByIds(summonnerIds, function(usersDetails){
        // for (let j = 0 in usersDetails) {
        callback(usersDetails);
    });
}

/*
"participants": [
    {
      "teamId": 100,
      "spell1Id": 12,
      "spell2Id": 4,
      "championId": 75,
      "profileIconId": 911,
      "summonerName": "BlackPlayerr",
      "bot": false,
      "summonerId": 13923662,
      "runes": [
        {
          "count": 9,
          "runeId": 5245
        },
        {
          "count": 9,
          "runeId": 5289
        },
        {
          "count": 9,
          "runeId": 5317
        },
        {
          "count": 3,
          "runeId": 5335
        }
      ],
      "masteries": [
        {
          "rank": 1,
          "masteryId": 6111
        },
        {
          "rank": 4,
          "masteryId": 6114
        },
        {
          "rank": 1,
          "masteryId": 6121
        },
        {
          "rank": 5,
          "masteryId": 6134
        },
        {
          "rank": 1,
          "masteryId": 6142
        },
        {
          "rank": 4,
          "masteryId": 6151
        },
        {
          "rank": 1,
          "masteryId": 6154
        },
        {
          "rank": 1,
          "masteryId": 6164
        },
        {
          "rank": 4,
          "masteryId": 6311
        },
        {
          "rank": 1,
          "masteryId": 6312
        },
        {
          "rank": 1,
          "masteryId": 6322
        },
        {
          "rank": 5,
          "masteryId": 6331
        },
        {
          "rank": 1,
          "masteryId": 6342
        }
      ],
      "summonerLevel": 30,
      "championInfos": {
        "id": 75,
        "key": "Nasus",
        "name": "Nasus",
        "title": "o Curador das Areias",
        "image": {
          "full": "Nasus.png",
          "sprite": "champion2.png",
          "group": "champion",
          "x": 240,
          "y": 0,
          "w": 48,
          "h": 48
        }
      },
      "stats": {
        "statsSEASON#RankedSolo5x5": {
          "playerStatSummaryType": "RankedSolo5x5",
          "wins": "3",
          "totalChampionKills": "54",
          "totalAssists": "100"
        },
        "statSeason": 2016,
        "statsSEASON#Unranked": {
          "playerStatSummaryType": "Unranked",
          "wins": "207",
          "totalChampionKills": "1974",
          "totalAssists": "2354"
        }
      },
      "championLevel": "1"
    },
*/


module.exports=lolGuessService;