
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var bcrypt = require("bcrypt-nodejs");
var cookieParser = require('cookie-parser');
var session = require('express-session');


module.exports = function(app, models){

    var model = models.userModel;

    // get all users
    app.get('/api/user?', findAllUsers);

    // POST Calls.
    app.post('/api/user', createUser);

    // GET Calls.
    app.get('/api/user?username=username', findUserByUsername);
    app.get('/api/user?username=username&password=password', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);

    // PUT Calls.
    app.put('/api/user/:uid', updateUser);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteUser);


    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use('LocalStrategy', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // localStrategy function
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    /*API implementation*/
    function findAllUsers(req, res) {
        // console.log("find all users");
        var username = req.query.username;
        var password = req.query.password;

        if(username && password){
            // console.log("find by credentials");
            model
                .findUserByCredentials(username, password)
                .then(
                    function(user){
                        if(user){
                            res.json(user);
                        } else {
                            // user = null;
                            // res.send(user);
                            res.sendStatus(404).send(error);
                        }
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        } else if (username) {
            model
                .findUserByUsername(username)
                .then(
                    function (user) {
                        if(user) {
                            res.json(user);
                        } else {
                            // user = null;
                            // res.send(user);
                            res.sendStatus(404).send(error);

                        }
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        } else {
            model
                .findAllUser()
                .then(
                    function (users) {
                        res.send(users);
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                )
        }

    }


    function createUser(req, res) {

        var user = req.body;

        model
            .createUser(user)
            .then(
                function (newUser) {
                    res.json(newUser);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );

    }

    function findUserByUsername (req, res) {

        var username = req.query.username;

        for (u in users){
            var user = users[u];
            if(user.username === username){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("Not found that user with this username!");
    }

    function findUserByCredentials (req, res) {

        var query = req.query;
        var username = query.username;
        var password = query.password;

        if(username && password){
            model
                .findUserByCredentials(username, password)
                .then(
                    function(user){
                        if(user){
                            res.json(user);
                        } else {
                            user = null;
                            res.send(user);
                        }
                    },
                    function (error) {
                        res.sendStatus(404).send(error);
                    }
                );
        }

    }

    function findUserById(req, res) {

        var params = req.params;

        if(params.uid){
            model
                .findUserById(params.uid)
                .then(
                    function (user){
                        // console.log(user);
                        if(user){
                            res.json(user);
                        } else {
                            user = null;
                            res.send(user);
                        }
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        }

    }

    function updateUser(req,res) {
        var uid = req.params.uid;
        var user = req.body;
        model
            .updateUser(uid, user)
            .then(
                function (user){
                    res.json(user)
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );

    }

    function deleteUser(req,res) {
        var uid = req.params.uid;
        if(uid){
            model
                .deleteUser(uid)
                .then(
                    function (status){
                        res.sendStatus(200);
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        } else{
            // Precondition Failed. Precondition is that the user exists.
            res.sendStatus(412);
        }

    }
};
