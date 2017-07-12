var mongoose = require('mongoose');
var user_model = require('../models/user.model');

module.exports = function(app) {
    app.get('/createdashboard', function(req, res, next) {
        const userid = req.query.userid;
        user_model.find({ idUser: userid }, function(err, user_result) {
            if (err) throw err;
            res.locals.user_name = user_result;
            console.log(user_result)
            res.render('createdashboard');
        });
        //res.render('createdashboard');
    })

    // app.get("/cumulativediagram", function(req, res, next) {
    //     var id = req.param('id');
    //     var obj_id = mongoose.Types.ObjectId(id);

    //     dashboard_model.findById(obj_id, function(err, result) {
    //         if (err) throw err;
    //         console.log("id: " + obj_id)
    //         console.log("cumulativedaigram: " + result);
    //         res.locals.dashboard_result = result;
    //         res.render('cumulativediagram?id=' + obj_id);
    //     });
    // });
    // app.get('/cumulativediagram', function(req, res) {
    //     var id = req.query.id
    //     Dashboard_model.find({ _id: id }, function(err, dashboard_result) {
    //         if (err) throw err;
    //         res.locals.dashboard_name = dashboard_result;
    //         console.log("cumulative>>>" + dashboard_result)
    //         res.render('cumulativediagram?id=' + id);
    //     });
    // });
}