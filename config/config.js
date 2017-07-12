module.exports = require('./env/' + process.env.NODE_ENV + '.js');

// var domain_mongodb = process.env.MONGOCOST_IP_27017;
// var port_mongodb = process.env.MONGOCOST_PORT_27017;

// var ip_aws = process.env.AWS_IP_3000;
// var port_aws = process.env.AWS_PORT_3000;

// exports.domain_mongodb = function() {
//     return domain_mongodb;
// };
// exports.port_mongodb = function() {
//     return port_mongodb;
// };

// exports.ip_aws = function() {
//     return ip_aws;
// };
// exports.port_aws = function() {
//     return port_aws;
// };