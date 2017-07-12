var mongoose = require('mongoose');
var dashboard_model = require('../models/dashboardname.model');

module.exports = function(app) {
    app.get("/editdashboard", function(req, res, next) {
        var id = req.param('id');
        var obj_id = mongoose.Types.ObjectId(id);

        dashboard_model.findById(obj_id, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.locals.dashboard_result = result;
            res.render('editdashboard');
        });
    });

    app.post("/editdashboards", function(req, res) {
        var id = req.param('id');
        console.log('id: ' + req.body.id);
        console.log(id);
        var obj_id = mongoose.Types.ObjectId(id);
        //var id = "5932276b42856215ac13ce2c"

        dashboard_model.findById(id, function(err, result) {
            if (err) throw err;
            console.log(result);
            result.namedashboard = req.body.namedashboard;
            result.idboard = req.body.idboard;
            result.complete = [{ complete_id: req.body.complete_id, color_complete: req.body.color_complete }];
            result.inprogress = [{ inprogress_id: req.body.inprogress_id, color_inprogress: req.body.color_inprogress }];
            result.backlog = [{ backlog_id: req.body.backlog_id, color_backlog: req.body.color_backlog }];

            result.save(function(err) {
                if (err) throw err;
                console.log('Edit dashboard complete');
                //res.render('cumulativediagram');
            });
        });
        res.render('cumulativediagram');
    });
}