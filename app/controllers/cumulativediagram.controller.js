var mongoose = require('mongoose');
var Dashboardname_model = require("../models/dashboardname.model")

module.exports = function(app) {
    app.post('/cumulativediagram', function(req, res, next) {
        console.log("ASSSS")
        var newDashboard = Dashboardname_model({
            tokenKey: req.body.tokenKey,
            idUser: req.body.idUser,
            userName: req.body.userName,
            namedashboard: req.body.namedashboard,
            idboard: req.body.idboard,
            complete: [{ complete_id: req.body.complete_id, color_complete: req.body.color_complete }],
            inprogress: [{ inprogress_id: req.body.inprogress_id, color_inprogress: req.body.color_inprogress }],
            backlog: [{ backlog_id: req.body.backlog_id, color_backlog: req.body.color_backlog }],
            is_delete: false,
        });
        console.log(newDashboard);
        newDashboard.save(function(err, doc) {
            if (err) throw err;
            console.log(doc)
            console.log('create dashboard complete');
            res.render('cumulativediagram', doc);
        })
        console.log(req.body);
    });

    // app.get('/cumulativediagram', function(req, res) {
    //     var id = req.query.id
    //     Dashboard_model.find({ _id: id }, function(err, dashboard_result) {
    //         if (err) throw err;
    //         res.locals.dashboard_name = dashboard_result;
    //         console.log("cumulative >>>" + dashboard_result)
    //         res.render('cumulativediagram');
    //     });
    // });

    // app.get("/cumulativediagram", function(req, res, next) {
    //     var id = req.param('id');
    //     var obj_id = mongoose.Types.ObjectId(id);

    //     dashboard_model.findById(obj_id, function(err, result) {
    //         if (err) throw err;
    //         console.log("cumulativedaigram: " + result);
    //         res.locals.dashboard_result = result;
    //         res.render('cumulativediagram?id=' + id);
    //     });
    // });

    // app.get('/dashboardname', function(req, res) {
    //     var id = req.query.id
    //     Dashboard_model.find({ _id: id }, function(err, dashboard_result) {
    //         if (err) throw err;
    //         res.locals.dashboard_name = dashboard_result;
    //         console.log("cumulative>>>" + dashboard_result)
    //         res.render('cumulativediagram?id=' + id);
    //     });
    // });
}