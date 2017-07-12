var user_model = require('../models/user.model');
var User = require('mongoose').model('User');

module.exports = function(app) {
    app.post('/user', function(req, res, next) {
        /// console.log(JSON.stringify(req.body.token))
        // console.log("token: " + req.body.tokenKey)
        var users = new User(req.body);

        user_model.find({ idUser: users.idUser }, function(err, user_result) {
            if (user_result == null) {
                users.save(function(err) {
                    if (err) {
                        return next(err);
                    } else {
                        // res.json(users);
                        res.render("dashboardname", users)
                    }
                });
            }
            // console.log(user_result);
        });
    });
}