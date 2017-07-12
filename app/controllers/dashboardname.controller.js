var config = require('../../config/config');
var mongoose = require('mongoose');
var dashboard_model = require('../models/dashboardname.model');

//config ip port connect    
// var ip_aws = config.ip_aws();
// var port_aws = config.port_aws();

module.exports = function(app) { //ฟังก์ชันให้เรียกใช้ได้ (app)HTTP
    app.get('/dashboardname', function(req, res, next) {
        const userid = req.query.userid;
        console.log(userid);
        dashboard_model.find({ idUser: userid, is_delete: false }, function(err, dashboard_result) {
            console.log("sasadas")
            if (err) throw err;
            res.locals.dashboard_name = dashboard_result;
            console.log(dashboard_result)
            res.render('dashboardname');
        });
    });

    app.post('/dashboardname', function(req, res, next) {
        var id = req.query.id
        console.log(id);

        dashboard_model.findOne({ _id: id }, function(err, dashboard_result) {
            if (err) throw err;
            dashboard_result.is_delete = true;

            dashboard_result.save(function(err) {
                if (err) throw err;
                console.log('delete dashboard complete');
            });
        });
        res.render('dashboardname');
    });

    app.get("/cumulativediagram", function(req, res, next) {
        var id = req.param('id');
        var obj_id = mongoose.Types.ObjectId(id);

        dashboard_model.findById(obj_id, function(err, result) {
            if (err) throw err;
            console.log("id: " + obj_id)
            console.log("cumulativedaigram: " + result);
            res.locals.dashboard_result = result;
            res.render('cumulativediagram');
        });
    });
}