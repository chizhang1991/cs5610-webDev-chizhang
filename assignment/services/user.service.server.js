var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");

// google strategy
// var GoogleStrategy = require('passport-google-oauth2').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var cookieParser = require('cookie-parser');
var session = require('express-session');


module.exports = function(app, models){

    var model = models.userModel;

    // app.post('/api/user', createUser);
    app.get('/api/user', findUserByUsername);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.get('/api/alluser', findAllUsers);

    /*Config Passport*/
    app.post('/api/login', passport.authenticate('LocalStrategy'), login);
    app.post('/api/logout', logout);
    app.get ('/api/loggedin', loggedin);
    app.post('/api/register', register);

    app.get('/auth/google',
        passport.authenticate('google', { scope : ['profile', 'email'] }));
    // app.get('/auth/google',
    //     passport.authenticate('google', { scope:
    //         [ 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
    //     ));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));

    // google oauth

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
        // passReqToCallback   : true
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));


    // function googleStrategy(token, refreshToken, profile, done) {
    function googleStrategy(token, refreshToken, profile, done) {

        console.log("profile: " + profile);

        model
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    console.log("user: " + user);
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model
                            .createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    // app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', {
    //         successRedirect: '/#/user',
    //         failureRedirect: '/#/login'
    //     }));
    //
    // passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    //     profileFields: ['id', 'email', 'first_name', 'last_name']
    // };
    //
    // function facebookStrategy(token, refreshToken, profile, done) {
    //     model
    //         .findUserByFacebookId(profile.id)
    //         .then(function(user){
    //                 if(user != null){
    //                     return done(null, user);
    //                 }
    //                 else{ //create a new user in db
    //                     var newUser={
    //                         username: profile.emails[0].value.split('@')[0],
    //                         firstName: profile.name.givenName,
    //                         lastName: profile.name.familyName,
    //                         email: profile.emails[0].value,
    //                         facebook: {
    //                             id: profile.id,
    //                             token: token
    //                         }
    //                     };
    //                     model
    //                         .createUser(newUser)
    //                         .then(function(user){
    //                             if(user){
    //                                 return done(null, user);
    //                             }
    //                             else{
    //                                 return done(null, false);
    //                             }
    //                         })
    //                 }
    //             },
    //             function(err){
    //                 if(err){
    //                     return done(err);
    //                 }
    //             });
    // }


    passport.use('LocalStrategy', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // localStrategy function
    function localStrategy(username, password, done) {
        model
            .findUserByUsername(username)
            .then(
                function(user) {
                    // console.log(user);
                    if (user === null || user === undefined) {
                        return done(null, false, {message: 'User not found!'})
                    } else if(bcrypt.compareSync(password, user.password)) {
                        // console.log("User found!");
                        return done(null, user);
                    } else {
                        console.log("User not found!");
                        return done(null, false, {message: 'Username and password does not match!'});
                    }
                },
                function(err) {
                    if (err) {
                        console.log("error: " + err);
                        return done(err);
                    }
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
        user.password = bcrypt.hashSync(user.password);
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
        user.password = bcrypt.hashSync(user.password);
        // console.log(user);

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

        model
            .findUserByUsername(username)
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            )
    }

    function findAllUsers(req, res) {
        model
            .findAllUser()
            .then(
                function (users) {
                    // console.log(users);
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            )
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
