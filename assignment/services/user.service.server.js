// var app = require('express');
// var userModel = require('../model/user/user.model.server');
// var passport      = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy(localStrategy));
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);
//
// app.get ('/api/user/:userId', findUserById);
// app.get ('/api/user', findAllUsers);
// app.post('/api/user', createUser);
// app.put ('/api/user/:userId', updateUser);
// app.delete ('/api/user/:userId', deleteUser);
//
// app.post  ('/api/login', passport.authenticate('local'), login);
// app.get   ('/api/loggedin', loggedin);
// app.post  ('/api/logout', logout);
// app.post  ('/api/register', register);
//
//
// function register(req, res) {
//     var userObj = req.body;
//     userModel
//         .createUser(userObj)
//         .then(function (user) {
//             req
//                 .login(user, function (status) {
//                     res.send(status);
//                 });
//         });
// }
//
// function logout(req, res) {
//     req.logout();
//     res.sendStatus(200);
// }
//
// function loggedin(req, res) {
//     console.log(req.user);
//     if(req.isAuthenticated()) {
//         res.json(req.user);
//     } else {
//         res.send('0');
//     }
// }
//
//
// function localStrategy(username, password, done) {
//     userModel
//         .findUserByCredentials(username, password)
//         .then(function (user) {
//             if(user) {
//                 done(null, user);
//             } else {
//                 done(null, false);
//             }
//         }, function (error) {
//             done(error, false);
//         });
// }
//
// function login(req, res) {
//     res.json(req.user);
// }
//
// function deleteUser(req, res) {
//     var userId = req.params.userId;
//     userModel
//         .deleteUser(userId)
//         .then(function (status) {
//             res.send(status);
//         });
// }
//
// function updateUser(req, res) {
//     var user = req.body;
//     userModel
//         .updateUser(req.params.userId, user)
//         .then(function (status) {
//             res.send(status);
//         });
// }
//
// function createUser(req, res) {
//
//     var user = req.body;
//     userModel
//         .createUser(user)
//         .then(function (user) {
//             res.json(user);
//         }, function (err) {
//             res.send(err);
//         });
// }
//
// function findUserById(req, res) {
//     var userId = req.params['userId'];
//
//     userModel
//         .findUserById(userId)
//         .then(function (user) {
//             res.json(user);
//         });
//
// }
//
// function findAllUsers(req, res) {
//     var username = req.query['username'];
//     var password = req.query.password;
//     if(username && password) {
//         userModel
//             .findUserByCredentials(username, password)
//             .then(function (user) {
//                 if(user) {
//                     res.json(user);
//                 } else {
//                     res.sendStatus(404);
//                 }
//             });
//     } else if(username) {
//         userModel
//             .findUserByUsername(username)
//             .then(function (user) {
//                 if(user) {
//                     res.json(user);
//                 } else {
//                     res.sendStatus(404);
//                 }
//             });
//     } else {
//         userModel
//             .findAllUsers()
//             .then(function (users) {
//                 res.json(users);
//             });
//     }
// }
//
// function serializeUser(user, done) {
//     done(null, user);
// }
//
// function deserializeUser(user, done) {
//     userModel
//         .findUserById(user._id)
//         .then(
//             function(user){
//                 done(null, user);
//             },
//             function(err){
//                 done(err, null);
//             }
//         );
// }


module.exports = function(app, models){

    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
    //     {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    // ];
    // var users = [];

    var model = models.User;

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

    /*API implementation*/
    function findAllUsers(req, res) {
        console.log("find all users");
        var username = req.query.username;
        var password = req.query.password;
        console.log("username: " + username);
        console.log("password: " + password);
        if(username && password){
            console.log("find by credentials");
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
                        res.sendStatus(400).send(error);
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
                            user = null;
                            res.send(user);
                        }
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
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
                        res.sendStatus(400).send(error);
                    }
                )
        }

        // if (username && password) {
        //     for (var u in users) {
        //         var user = users[u];
        //         if (user.username === username && user.password === password) {
        //             res.send(user);
        //             return;
        //         }
        //     }
        //     res.sendStatus(404);
        //     return;
        // } else if (username) {
        //     for (var u in users) {
        //         var user = users[u];
        //         if (user.username === username) {
        //             res.send(user);
        //             return;
        //         }
        //     }
        //     res.sendStatus(404);
        //     return;
        // } else {
        //     res.send(users);
        // }
    }


    function createUser(req, res) {
        // console.log("model: " + model);
        var user = req.body;
        console.log(user);
        // console.log(model.createUser);
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

        // var newUser = {
        //     _id: new Date().getTime(),
        //     username: user.username,
        //     password: user.password,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     email: user.email
        // };
        // users.push(newUser);

        // res.send(newUser);

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

        // var username = req.query.username;
        // var pswd = req.query.password;
        //
        // for (u in users){
        //     var user = users[u];
        //     if(user.username === username && user.password === pswd){
        //         res.status(200).send(user);
        //         return;
        //     }
        // }
        // res.status(404).send("Not found that user by credentials!");

        var query = req.query;
        var username = query.username;
        var password = query.password;

        console.log("find user by credential: " + username + password);

        // var user = null;
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
                        res.sendStatus(400).send(error);
                    }
                );
        }

    }

    function findUserById(req, res) {

        var params = req.params;
        console.log("find user by id" + params.uid);

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

        // var uid = req.params.uid;
        //
        // for (u in users){
        //     var user = users[u];
        //     if(String(user._id) === String(uid)) {
        //         res.status(200).send(user);
        //         return;
        //     }
        // }
        // res.status(404).send("That user was not found by ID!");
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

        // var uid = req.params.uid;
        // var new_user = req.body;
        // for (var u in users){
        //     if(String(users[u]._id) === String(uid)) {
        //         users[u] = new_user;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Not found the user you want to update!");
    }

    function deleteUser(req,res) {
        var uid = req.params.uid;
        if(uid){
            model
                .userModel
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

        // var uid = req.params.uid;
        // var user = req.body;
        //
        // for (u in users){
        //     if(String(users[u]._id) === String(uid)){
        //         users.splice(u,1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Not found the user to delete!");
    }
};

// module.exports = function(app, model){
//     // var userModel = require("../model/user/user.model.server");
//
//
//     var users = [];
//     // POST Calls.
//     app.post('/api/user', createEntity);
//
//     // GET Calls.
//     app.get('/api/user', getUser);
//     app.get('/api/user/:uid', getUserById);
//
//     // PUT Calls.
//     app.put('/api/user/:uid', updateDetails);
//
//     // DELETE Calls.
//     app.delete('/api/user/:uid', deleteFromSystem);
//
//     /* REST Functions */
//
//     function getUser(req, res) {
//         var query = req.query;
//         // var user = null;
//         if(query.username && query.password){
//             model
//                 .userModel
//                 .findUserByCredentials(query.username, query.password)
//                 .then(
//                     function(user){
//                         if(user){
//                             res.json(user);
//                         } else {
//                             user = null;
//                             res.send(user);
//                         }
//                     },
//                     function (error) {
//                         res.sendStatus(400).send(error);
//                     }
//                 );
//         }
//     }
//
//     function getUserById(req, res){
//         var params = req.params;
//         if(params.uid){
//             model
//                 .userModel
//                 .findUserById(params.uid)
//                 .then(
//                     function (user){
//                         if(user){
//                             res.json(user);
//                         } else {
//                             user = null;
//                             res.send(user);
//                         }
//                     },
//                     function (error){
//                         res.sendStatus(400).send(error);
//                     }
//                 );
//         }
//     }
//
//     function createEntity(req, res) {
//         var user = req.body;
//         model
//             .userModel
//             .createUser(user)
//             .then(
//                 function(newUser){
//                     res.json(newUser);
//                 },
//                 function(error){
//                     res.sendStatus(400).send(error);
//                 }
//             );
//     }
//     function updateDetails(req, res){
//         var uid = req.params.uid;
//         var user = req.body;
//         model
//             .userModel
//             .updateUser(uid, user)
//             .then(
//                 function (user){
//                     res.json(user)
//                 },
//                 function (error){
//                     res.sendStatus(400).send(error);
//                 }
//             );
//     }
//
//     function deleteFromSystem(req, res){
//         var uid = req.params.uid;
//         if(uid){
//             model
//                 .userModel
//                 .deleteUser(uid)
//                 .then(
//                     function (status){
//                         res.sendStatus(200);
//                     },
//                     function (error){
//                         res.sendStatus(400).send(error);
//                     }
//                 );
//         } else{
//             // Precondition Failed. Precondition is that the user exists.
//             res.sendStatus(412);
//         }
//     }
// };