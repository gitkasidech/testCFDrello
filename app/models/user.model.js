var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    tokenKey: String,
    idUser: String,
    name: String,
    fullname: String,
    email: String,
    provider: {}
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
// mongoose.model('User', UserSchema);