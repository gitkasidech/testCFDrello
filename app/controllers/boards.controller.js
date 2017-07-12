var board_model = require('../models/boards.model');
var Boards = require('mongoose').model('Boards');

module.exports = function(app) { //ฟังก์ชันให้เรียกใช้ได้ (app)HTTP
    app.post('/boards', function(req, res, next) {
        var boards = new Boards(req.body);
        board_model.find({ id: boards.id }, function(err, board_result) {
            if (board_result == null) {
                boards.save(function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        // res.json(boards);
                        redirect("cumulativediagram")
                    }
                });
            }
            // console.log(board_result);
        });
    })
}