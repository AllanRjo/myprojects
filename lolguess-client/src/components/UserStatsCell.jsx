var React = require('react');

var UserStatsCell = React.createClass({
  componentWillMount:function() {
    this.setState({opacity:'0.5'})
  },
  handleClick:function() {
    alert("You clicked on: " + this.props.summonerName);
  },
  handleMouseOver: function() {
    this.setState({opacity: '1'})
  },
  handleMouseLeave: function() {
    this.setState({opacity: '0.5'})
  },
  render: function() {
    var divStyle = {
      boxShadow: '0 2px 20px 2px rgba(100,100,100,0.2), inset 0 2px 20px 2px rgba(100,100,100,0.1)',
      borderRadius: '10',
      textAlign: 'center',
      marginTop: '20',
      background: 'white',
      opacity: this.state.opacity
    };
    if (this.props.background) {
      divStyle.background = this.props.background;
    }
    if(this.props.height) {
      divStyle.height = this.props.height;
    }

    var headingStyle = {
      marginTop: '1',
      fontFamily: "Lobster",
      color: '#777'
    };
    if(this.props.headingBackground) {
      headingStyle.background = this.props.headingBackground;
    }

    var contentStyle = {
      marginBottom: '5',
      fontFamily: 'Helvetica',
      fontStyle: 'bold',
      fontSize: '18',
      color: '#777'
    };

    var imageTableStyle = {
      marginBottom: '5',
      fontFamily: 'Helvetica',
      fontStyle: 'bold',
      color: '#777'
    };

    if(this.props.contentColor) {
      contentStyle.color = this.props.contentColor;
    }

    const IMAGE_PATH = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/';

    var imageSrc = '', imageAlt='';
    if(this.props.championInfos){
      imageSrc = IMAGE_PATH + this.props.championInfos.image.full;
      imageAlt = this.props.championInfos.image.full;
    }
    
    var statsSEASONRankedSolo5x5 = {};
    var statsSEASONUnranked = {};

    if(this.props.participantStats){
      statsSEASONRankedSolo5x5 = this.props.participantStats['statsSEASON#RankedSolo5x5'] || { wins:'0', totalChampionKills: '0', totalAssists: '0' } ;
      statsSEASONUnranked = this.props.participantStats['statsSEASON#Unranked'] || { wins:'0', totalChampionKills: '0', totalAssists: '0' };
    }
    return (
      <div onClick={this.handleClick}
           onMouseOver={this.handleMouseOver}
           onMouseLeave={this.handleMouseLeave}
           style={divStyle}
           className={this.props.size || "col-xs-10 col-sm-4 col-md-3 col-xs-offset-1 col-sm-offset-0 col-md-offset-1"}>

          <div style={headingStyle} className="col-sm-12">
              <h3>{this.props.summonerName}</h3>
          </div>
          <div style={imageTableStyle} className="col-sm-12">
              <img src={imageSrc} alt={imageAlt} />
          </div>
          
          <div style={contentStyle} className="col-sm-12 panel panel-default">
            <div className="row"> 
              <div className="col-sm-12">
                Level:{this.props.summonerLevel}
              </div> 
              <div className="col-sm-12">
                Champion Lvl:{this.props.championLevel}
              </div> 
              <div className="col-sm-4">
                 <p>RW</p>
              </div>
              <div className="col-sm-4">
                 <p>RK</p>
              </div>
              <div className="col-sm-4">
                  <p>RA</p>
              </div>
            </div>
            <div className="row" >  
              <div className="col-sm-4">
                  {statsSEASONRankedSolo5x5.wins}
              </div>
              <div className="col-sm-4">
                  {statsSEASONRankedSolo5x5.totalChampionKills}
              </div>
              <div className="col-sm-4">
                  {statsSEASONRankedSolo5x5.totalAssists}
              </div>
            </div>

            <div className="row">  
              <div className="col-sm-4">
                 <p>UW</p>
              </div>
              <div className="col-sm-4">
                  <p>UK</p>
              </div>
              <div className="col-sm-4">
                  <p>UA</p>
              </div>
            </div>
            <div className="row">  
              <div className="col-sm-4">
                  {statsSEASONUnranked.wins}
              </div>
              <div className="col-sm-4">
                  {statsSEASONUnranked.totalChampionKills}
              </div>
              <div className="col-sm-4">
                  {statsSEASONUnranked.totalAssists}
              </div>
            </div>

            </div>
      </div>
    )
  }
});

module.exports = UserStatsCell;
