var config = require('./config');
var mongoose = require('mongoose');

var domain_mongodb = config.domain_mongodb();
var port_mongodb = config.port_mongodb();

module.exports = function() {
    mongoose.set('debug', config.debug);
    var db = mongoose.connect('mongodb://' + domain_mongodb + ':' + port_mongodb);
    require('../app/models/user.model');
    require('../app/models/boards.model');
    require('../app/models/lists.model');
    require('../app/models/dashboardname.model');
    return (db)
}