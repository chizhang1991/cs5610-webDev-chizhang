// var mongoose = require('mongoose');
// var userSchema = require('./user.schema.server')();
// var userModel = mongoose.model('User', userSchema);
//
// userModel.createUser = createUser;
// userModel.findUserById = findUserById;
// userModel.findAllUsers = findAllUsers;
// userModel.findUserByUsername = findUserByUsername;
// userModel.findUserByCredentials = findUserByCredentials;
// userModel.updateUser = updateUser;
// userModel.deleteUser = deleteUser;
// userModel.addWebsite = addWebsite;
// userModel.deleteWebsite = deleteWebsite;
//
// module.exports = userModel;
//
// function deleteWebsite(userId, websiteId) {
//     return userModel
//         .findById(userId)
//         .then(function (user) {
//             var index = user.websites.indexOf(websiteId);
//             user.websites.splice(index, 1);
//             return user.save();
//         });
// }
//
// function addWebsite(userId, websiteId) {
//     return userModel
//         .findById(userId)
//         .then(function (user) {
//             user.websites.push(websiteId);
//             return user.save();
//         });
// }
//
// function createUser(user) {
//     return userModel.create(user);
// }
//
// function findUserById(userId) {
//     return userModel.findById(userId);
// }
//
// function findAllUsers() {
//     return userModel.find();
// }
//
// function findUserByUsername(username) {
//     return userModel.findOne({username: username});
// }
//
// function findUserByCredentials(username, password) {
//     return userModel.findOne({username: username, password: password});
// }
//
// function updateUser(userId, newUser) {
//     delete newUser.username;
//     delete newUser.password;
//     return userModel.update({_id: userId}, {$set: newUser});
// }
//
// function deleteUser(userId) {
//     return userModel.remove({_id: userId});
// }


module.exports = function(mongoose){
    var userSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model('userModel', userSchema);

    var api = {
        'createUser' : createUser,
        'findUserById' : findUserById,
        'findUserByUsername' : findUserByUsername,
        'findUserByCredentials' : findUserByCredentials,
        'updateUser' : updateUser,
        'removeWebsiteFromUser' : removeWebsiteFromUser,
        'addWebsiteForUser' : addWebsiteForUser,
        'deleteUser' : deleteUser,
        'findAllUser' : findAllUser
    };

    return api;

    // Function Definition Section

    function createUser(user){
        // console.log("in user model");
        var newUser = {
            username : user.username,
            password : user.password,
            websites : []
        };

        if(user.firstName){
            newUser.firstName = user.firstName;
        }
        if(user.lastName){
            newUser.lastName = user.lastName;
        }
        if(user.email){
            newUser.email = user.email;
        }
        if(user.phone){
            newUser.phone = user.phone;
        }
        console.log("in user model, create user");
        return userModel.create(newUser);
    }

    function findUserById(userId){
        // return userModel.findById(userId);
        // console.log("in model: " + userId);
        return userModel.findOne({_id: userId});
    }

    function findUserByUsername(uname){
        return userModel.findOne({username : uname})
    }

    function findUserByCredentials(uname, pswrd){
        // console.log("in model, find by credentials");
        // console.log("uname: " + uname);
        // console.log("pswrd: " + pswrd);
        return userModel.findOne({
            username : uname,
            password : pswrd
        });
    }

    function updateUser(userId, user){
        return userModel.update({
            _id : userId
        }, {
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            phone : user.phone
        });
    }

    function removeWebsiteFromUser(userId, websiteId){
        // db.user.update({_id : ObjectId("583cf3287ac013080c4adee5")}, {$push : { "websites" : ObjectId("583cf43693b914082152cc3c")}})
        userModel
            .findOne({_id: userId})
            .then(
                function(user){
                    user.websites.pull(websiteId);
                    user.save();
                },
                function(error){
                    console.log(error);
                }
            );
    }

    function addWebsiteForUser(userId, websiteId) {
        console.log("in add website for user");
        return userModel
            .findOne({_id: userId})
            .then(function (user) {
                user.websites.push(websiteId);
                return user.save();
            });
    }

    function deleteUser(userId){
        return userModel.remove({
            _id : userId
        });
    }

    function findAllUser() {
        return userModel.find();
    }

//     function deleteWebsite(userId, websiteId) {
//     return userModel
//         .findById(userId)
//         .then(function (user) {
//             var index = user.websites.indexOf(websiteId);
//             user.websites.splice(index, 1);
//             return user.save();
//         });
//     }
//


};