const lolUserAPIClient = require('./LOLUserAPIClient');


const newParticipant= (p) => ({
    participant: p,
    summonerId: '',
    summonerName: '',
    summonerLevel: '',
    championInfos: '',
    stats: '',
    champioLevel: '1'
})

console.info(newParticipant({name:'Aaaaa'}));

const userDetails = [{nome:'Allan', level:1}, {nome:'Fulano', level:2}];

for(let i in userDetails){
  console.info(userDetails[i]);
}

lolUserAPIClient.getByName('lithiumbr', function(userDetails){
    console.info(userDetails);
});
