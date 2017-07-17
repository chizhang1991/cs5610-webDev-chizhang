module.exports = function(app, model){

    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
    //     {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    // ];
    var users = [];

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
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username && user.password === password) {
                    res.send(user);
                    return;
                }
            }
            res.sendStatus(404);
            return;
        } else if (username) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username) {
                    res.send(user);
                    return;
                }
            }
            res.sendStatus(404);
            return;
        } else {
            res.send(users);
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
                    res.sendStatus(400).send(error);
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

        var username = req.query.username;
        var pswd = req.query.password;

        for (u in users){
            var user = users[u];
            if(user.username === username && user.password === pswd){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("Not found that user by credentials!");

    }

    function findUserById(req, res) {

        var params = req.params;
        if(params.uid){
            model
                .userModel
                .findUserById(params.uid)
                .then(
                    function (user){
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
        var new_user = req.body;
        for (var u in users){
            if(String(users[u]._id) === String(uid)) {
                users[u] = new_user;
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Not found the user you want to update!");
    }

    function deleteUser(req,res) {
        var uid = req.params.uid;
        var user = req.body;

        for (u in users){
            if(String(users[u]._id) === String(uid)){
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Not found the user to delete!");
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