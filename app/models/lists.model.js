var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListsSchema = new Schema({
    id: String,
    name: String,
    board: String,
    id_member: String,
    user: String,
    token: String
});
var Lists = mongoose.model('Lists', ListsSchema);
module.exports = Lists;