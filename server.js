process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();
var app = express();

module.exports = function() {
    require('../app/controllers/index.controller')(app);
    require('../app/controllers/dashboardname.controller')(app);
    require('../app/controllers/boards.controller')(app);
    require('../app/controllers/lists.controller')(app);
    require('../app/controllers/editdashboard.controllers')(app);
    require('../app/controllers/cumulativediagram.controllers')(app);
    require('../app/controllers/user.controller')(app);

}

app.listen(5100);
module.exports = app;
console.log('Server running at http://localhost:5100');