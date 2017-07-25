
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var bcrypt = require("bcrypt-nodejs");
var cookieParser = require('cookie-parser');
var session = require('express-session');


module.exports = function(app, models){

    var model = models.userModel;

    // get all users
    // app.get('/api/user?', findAllUsers);

    // POST Calls.
    app.post('/api/user', createUser);

    // GET Calls.
    app.get('/api/user?username=username', findUserByUsername);
    // app.get('/api/user?username=username&password=password', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);

    // PUT Calls.
    app.put('/api/user/:uid', updateUser);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteUser);

    /*Config Passport*/
    app.post('/api/login', passport.authenticate('LocalStrategy'), login);
    app.post('/api/logout', logout);
    app.get ('/api/loggedin', loggedin);

    app.post('/api/register', register);

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
        model
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

    // session cookie functions
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    // passport function implementation
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var user = req.body;
        // console.log(user);
        model
            .createUser(user)
            .then(
                function (user) {
                    req.login(user, function (status) {
                        res.send(status);
                    })
                }
            )
    }

    /*API implementation*/

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
