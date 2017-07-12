var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DashboardslistSchema = new Schema({
    tokenKey: String,
    idUser: String,
    userName: String,
    namedashboard: String,
    idboard: String,
    nameboard: String,
    complete: [{ complete_id: String, color_complete: String }],
    inprogress: [{ inprogress_id: String, color_inprogress: String }],
    backlog: [{ backlog_id: String, color_backlog: String, }],
    is_delete: Boolean,
    provider: {}
});

var Dashboardname_model = mongoose.model('Dashboardname_model', DashboardslistSchema);

// make this available to our users in our Node applications
module.exports = Dashboardname_model;