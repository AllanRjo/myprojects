var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var StatStore = Reflux.createStore({
    listenables: [StatActions],
    getMock: function() {
        HTTP.get('/mock')
        .then(function(json) {
            this.stats = json;
            this.fireUpdate();
        }.bind(this));
    },
    //Refresh function
    fireUpdate: function() {
        this.trigger('change', this.stats);
    }
});

module.exports = StatStore;
