var domain_mongodb = process.env.MONGOCOST_IP_27017;
var port_mongodb = process.env.MONGOCOST_PORT_27017;

var ip_aws = process.env.AWS_IP_3000;
var port_aws = process.env.AWS_PORT_3000;

var user_name = process.env.MONGOCOST_USER;
var user_pass = process.env.MONGOCOST_PASSWORD;

exports.domain_mongodb = function() {
    return domain_mongodb;
};
exports.port_mongodb = function() {
    return port_mongodb;
};

exports.ip_aws = function() {
    return ip_aws;
};
exports.port_aws = function() {
    return port_aws;
};

exports.user_name = function() {
    return user_name;
};
exports.user_pass = function() {
    return user_pass;
};