var app = require("../../express");

module.exports = function(app){

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
        {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    ];

    app.get('/give/me/all/users', function (req, res) {
        res.send(users);

    });

    app.get('/api/user?', findAllUsers);
    // app.get('/api/user?username=username&password=password', function (req, res) {
    //     console.log("credential test");
    //     console.log(req.query.username);
    //     console.log(req.query.password);
    //     res.sendStatus(200);
    // });

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
        } else {
            res.send(users);
        }
        // console.log("get uri");
        // console.log("test: " + req.query.username);
        // res.sendStatus(200);
        // res.send(users);
    }

    // POST Calls.
    app.post('/api/user', createUsers);

    // GET Calls.
    app.get('/api/user?username=username', findUserByUsername);
    app.get('/api/user?username=username&password=password', findUserByCredentials);
    app.get('/api/user/:uid', findUserById);

    // PUT Calls.
    app.put('/api/user/:uid', updateUser);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteUser);

    /*API implementation*/
    function createUsers(req, res) {
        var user = req.body;

        var newUser = {
            _id: new Date().getTime(),
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        users.push(newUser);

        if(newUser){
            res.status(200).send(newUser);
        } else {
            res.sendStatus(500);
        }
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
        res.status(404).send("not found!");
    }

    function findUserByCredentials (req, res) {
        console.log("in server side find by credentials");

        var username = req.query.username;
        var pswd = req.query.password;

        console.log("username: " + username);
        console.log("pswd: " + pswd);

        for (u in users){
            var user = users[u];
            if(user.username === username && user.password === pswd){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("not found!");

        // console.log(users[0]);
        // res.send(users[0]).sendStatus(200);
    }

    function findUserById(req, res) {

        var uid = req.params.uid;

        // console.log(uid);

        for (u in users){
            var user = users[u];
            if(user._id === uid){
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("Than user was not found!");
    }

    function updateUser(req,res) {
        var uid = req.params.id;
        var new_user = req.body;

        for (u in users){
            var user = users[u];
            if(user._id === uid){
                user.firstName = new_user.firstName;
                user.lastName = new_user.lastName;
                user.email = new_user.email;
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function deleteUser(req,res) {
        var uid = req.params.id;

        for (u in users){
            var user = users[u];
            if(user._id === uid){
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("not found!");
    }
};