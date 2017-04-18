var React = require('react');
var UserStatsCell = require('./UserStatsCell.jsx');
var HTTP = require('../services/lolservice');

var StatsTable = React.createClass({
    getInitialState: function() {
        return {stats:"", summonerName: "", modo: ""};
    },

    componentDidMount: function() {
    },

   onInputChange: function(e) {
        this.setState({summonerName: e.target.value});
    },
    
    onClick: function(e) {
        HTTP.get('/currentMatchStat/' + this.state.summonerName)
        .then(function(json) {
            this.setState({stats:json, modo:'consulta'});
        }.bind(this));    
    },
 
    render: function() {
        var participant0 = [];
        var participant1 = [];
        var participant2 = [];
        var participant3 = [];
        var participant4 = [];
        var participant5 = [];
        var participant6 = [];
        var participant7 = [];
        var participant8 = [];
        var participant9 = [];
        if(this.state.stats.participants){
            participant0 = this.state.stats.participants[0];
            participant1 = this.state.stats.participants[1];
            participant2 = this.state.stats.participants[2];
            participant3 = this.state.stats.participants[3];
            participant4 = this.state.stats.participants[4];
            participant5 = this.state.stats.participants[5];
            participant6 = this.state.stats.participants[6];
            participant7 = this.state.stats.participants[7];
            participant8 = this.state.stats.participants[8];
            participant9 = this.state.stats.participants[9];
        }
        var formStyle = {
            marginTop: '15',
            marginBottom: '5',
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '18',
            color: '#777'
        };
        
        var resultStyle = {
            marginBottom: '5',
            fontFamily: 'Helvetica',
            fontStyle: 'bold',
            fontSize: '18',
            color: '#111',
            textAlign: 'center',
            backgroundColor: 'green'
        };

        return (
        <div className="container-fluid">
            <div className="row" style={formStyle}>
                <div className="alert alert-danger">
                    <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
                </div>
            </div>
            <div className="row" style={formStyle}>
                <div className="col-sm-offset-2"/>
                <div className="col-sm-8 form-group">
                    <form className="form-inline">
                        <label for="summorName">SummorName:</label>
                        <input
                        id="summorName"
                        placeholder=""
                        className="form-control"
                        value={this.state.summonerName}
                        onChange={this.onInputChange} />

                        <button  type="button" className="btn btn-default" onClick={this.onClick}>Guess</button>
                    </form>
                </div>
                <div class="col-sm-offset-2"/>
            </div>
            <div className="row" style={resultStyle}>
                <div className="col-sm-12">
                    <h2>Chances Team1: {this.state.stats['chancesTeam#100']}%</h2>
                    <h2>Chances Team2: {this.state.stats['chancesTeam#200']}%</h2>
                </div>
            </div>
            <div className="row">
                    <UserStatsCell key={participant0.championId} 
                                summonerName={participant0.summonerName} 
                                summonerLevel={participant0.summonerLevel}
                                championLevel={participant0.championLevel}
                                championInfos={participant0.championInfos}
                                participantStats={participant0.stats}
                                size="col-sm-2 col-sm-offset-1" />
                    <UserStatsCell key={participant1.championId} 
                                summonerName={participant1.summonerName} 
                                summonerLevel={participant1.summonerLevel}
                                championInfos={participant1.championInfos}
                                championLevel={participant1.championLevel}
                                participantStats={participant1.stats}
                                size="col-sm-2 " />
                    <UserStatsCell key={participant2.championId} 
                                summonerName={participant2.summonerName} 
                                summonerLevel={participant2.summonerLevel}
                                championInfos={participant2.championInfos}
                                championLevel={participant2.championLevel}
                                participantStats={participant2.stats}
                                size="col-sm-2 " />
                    <UserStatsCell key={participant3.championId} 
                                summonerName={participant3.summonerName} 
                                summonerLevel={participant3.summonerLevel}
                                championInfos={participant3.championInfos}
                                championLevel={participant3.championLevel}
                                participantStats={participant3.stats}
                                size="col-sm-2 " />
                    <UserStatsCell key={participant4.championId} 
                                summonerName={participant4.summonerName} 
                                summonerLevel={participant4.summonerLevel}
                                championInfos={participant4.championInfos}
                                championLevel={participant4.championLevel}
                                participantStats={participant4.stats}
                                size="col-sm-2" />
                    <div className="col-sm-offset-1" />
            </div>
            <div className="row">
                    <UserStatsCell key={participant5.championId} 
                                summonerName={participant5.summonerName} 
                                summonerLevel={participant5.summonerLevel}
                                championInfos={participant5.championInfos}
                                championLevel={participant5.championLevel}
                                participantStats={participant5.stats}
                                size="col-sm-2 col-sm-offset-1" />
                    <UserStatsCell key={participant6.championId} 
                                summonerName={participant6.summonerName} 
                                summonerLevel={participant6.summonerLevel}
                                championInfos={participant6.championInfos}
                                championLevel={participant6.championLevel}
                                participantStats={participant6.stats}
                                size="col-sm-2 " />
                    <UserStatsCell key={participant7.championId} 
                                summonerName={participant7.summonerName} 
                                summonerLevel={participant7.summonerLevel}
                                championInfos={participant7.championInfos}
                                championLevel={participant7.championLevel}
                                participantStats={participant7.stats}
                                size="col-sm-2 " />
                    <UserStatsCell key={participant8.championId} 
                                summonerName={participant8.summonerName} 
                                summonerLevel={participant8.summonerLevel}
                                championInfos={participant8.championInfos}
                                championLevel={participant8.championLevel}
                                participantStats={participant8.stats}
                                size="col-sm-2 " />
                    <UserStatsCell key={participant9.championId} 
                                summonerName={participant9.summonerName} 
                                summonerLevel={participant9.summonerLevel}
                                championInfos={participant9.championInfos}
                                championLevel={participant9.championLevel}
                                participantStats={participant9.stats}
                                size="col-sm-2" />
                    <div className="col-sm-offset-1" />
            </div>
        </div>

        );
    }
});

module.exports = StatsTable;
