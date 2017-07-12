var Lists = require('mongoose').model('Lists');
var list_model = require('../models/lists.model');

module.exports = function(app) { //ฟังก์ชันให้เรียกใช้ได้ (app)HTTP
    app.post('/lists', function(req, res, next) {
        var lists = new Lists(req.body);
        list_model.find({ id: lists.id }, function(err, list_result) {
            if (list_result == null) {
                lists.save(function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        // res.json(lists);
                        redirect("cumulativediagram")
                    };
                });
            };
            // console.log(list_result);
        });
    });
}