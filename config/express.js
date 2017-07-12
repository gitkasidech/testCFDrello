var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var compression = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var OAuth = require('oauth').OAuth;
var url = require('url');
var config = require('./config');

// request ip
var domain_mongodb = config.domain_mongodb();
var port_mongodb = config.port_mongodb();

var user_name = config.user_name();
var user_pass = config.user_pass();


module.exports = function() {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(compression);
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.set('views', './app/views');
    app.set('view engine', 'jade');

    if (process.env.NODE_ENV == 'production') {
        app.use(session({
            secret: '2C44-4D44-einciohmnc-ewr434-32ede2r3-415',
            resave: false,
            saveUninitialized: true
        }));
    } else if (process.env.NODE_ENV == 'development') {
        app.use(session({
            secret: '3DYA-9HEH-jfjoefhmhj-sleek32l-le942Aj-873',
            resave: false,
            saveUninitialized: true
        }));
    } else if (process.env.NODE_ENV == 'beta') {
        app.use(session({
            secret: 'cdlc-9HEH-ljfoefkdiop-sleek32l-hkhkll-009',
            resave: false,
            saveUninitialized: true
        }));
    }


    app.get('/user/set', function(req, res) {
        // console.log(req.query.id);
        var id = req.query.id;
        if (!req.query.id) {
            res.send('login failed');
        } else {
            var o_id = mongoose.Types.ObjectId(id);
            //new mongo.ObjectID(id);
            // console.log(o_id);
            try {
                var options = {
                    db: {
                        native_parser: true
                    },
                    server: {
                        poolSize: 5
                    },
                    "user": user_name,
                    "pass": user_pass,
                    auth: {
                        authMechanism: 'SCRAM-SHA-1'
                    },
                    mongos: true,
                    replset: {
                        auto_reconnect: false,
                        poolSize: 10,
                        connectWithNoPrimary: true,
                        ssl: true,
                        sslValidate: false,
                        socketOptions: {
                            keepAlive: 1000,
                            connectTimeoutMS: 30000
                        }
                    }
                };
                var url = 'mongodb://' + domain_mongodb + ':' + port_mongodb + '/admin';
                console.log(url)
                var _connect = mongoose.createConnection(url, options);
                var url = 'mongodb://' + domain_mongodb + ':' + port_mongodb;
                console.log("url: " + url);
                var _connect = mongoose.createConnection(url);
                console.log(_connect)
                var connection = _connect.useDb('se4_crawler_cost_analytic_beta_public');
                var User = connection.model('users', {});
                User.findById(o_id, function(error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        try {
                            var jsonobj = JSON.stringify(result);
                            var obj = JSON.parse(jsonobj);
                            req.session.Email = obj.email;
                            console.log("Session : " + req.session.Email);
                            req.session.Oid = result._id;
                            res.redirect('/');
                        } catch (err) {
                            console.log("Error: 'email' of null " + err);
                        }
                    }
                });

            } catch (err) {
                console.log("Error: mongodb " + err);
            }
        }
    });


    require('../app/controllers/index.controller')(app);
    require('../app/controllers/dashboardname.controller')(app);
    require('../app/controllers/createdashboard.controller')(app);
    require('../app/controllers/user.controller')(app);
    require('../app/controllers/boards.controller')(app);
    require('../app/controllers/lists.controller')(app);
    require('../app/controllers/cumulativediagram.controller')(app);
    require('../app/controllers/editdashboard.controller')(app);
    require('../app/controllers/user.controller')(app);

    app.use(express.static('./public'));
    return app;
};