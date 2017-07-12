var config = require('../../config/config');

// //config ip port connect
// var ip_aws = config.ip_aws();
// var port_aws = config.port_aws();

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        // var tokenid = req.
        res.render('index');
    });
}