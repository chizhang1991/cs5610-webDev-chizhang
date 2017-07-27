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
        // 'findUserByFacebookId' : findUserByFacebookId
    };

    return api;

    // Function Definition Section

    function createUser(user){
        user.roles = ['USER'];
        user.websites = [];
        return userModel.create(user);
    }

    function findUserById(userId){
        return userModel.findOne({_id: userId});
    }

    function findUserByUsername(uname){
        return userModel.findOne({username : uname})
    }

    function findUserByCredentials(uname, pswrd){
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

    // function findUserByFacebookId(facebookId) {
    //     return User.findOne({'facebook.id': facebookId});
    // }

};