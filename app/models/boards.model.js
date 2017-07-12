var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardsSchema = new Schema({
    id: String,
    name: String,
    id_member: String,
    user: String,
    token: String
});

var Boards = mongoose.model('Boards', BoardsSchema);
module.exports = Boards;