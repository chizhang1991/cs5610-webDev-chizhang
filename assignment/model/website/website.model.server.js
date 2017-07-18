module.exports = function(mongoose, User) {
    var websiteSchema = require('./website.schema.server.js')(mongoose);
    var websiteModel = mongoose.model('websiteModel', websiteSchema);
    // var userSchema = require('../user/user.model.server')(mongoose);
    // var userModel = mongoose.model('User', userSchema);
    // var userModel = models.User;

    var api = {
        'createWebsiteForUser': createWebsiteForUser,
        'findAllWebsitesForUser': findAllWebsitesForUser,
        'findWebsiteById': findWebsiteById,
        'updateWebsite': updateWebsite,
        'removePageFromWebsite': removePageFromWebsite,
        'deleteWebsite': deleteWebsite,
        'findAllWebsites' : findAllWebsites,
        'addPageToWebsite' : addPageToWebsite
     };

     return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return websiteModel
            .create(website)
            .then(
                function (website) {
                    console.log("in create website for user");
                    return User
                        .addWebsiteForUser(userId, website._id)
                })
    }

     function findAllWebsitesForUser(userId) {
         return websiteModel
             .find({_user: userId})
             .populate('_user')
             .exec();
     }

     function findWebsiteById(websiteId) {
         return websiteModel.findOne({_id: websiteId});
     }

     function updateWebsite(websiteId, website) {
         return websiteModel.update({
             _id : websiteId
         }, {
             name: website.name,
             description: website.description
         });
     }

     function removePageFromWebsite(websiteId, pageId) {
         websiteModel
             .findOne({_id: websiteId})
             .then(
                 function(website){
                     website.pages.pull(pageId);
                     website.save();
                 },
                 function(error){
                     console.log(error);
                 }
             );
     }

     function addPageToWebsite(websiteId, pageId) {
         return websiteModel
             .findOne({_id: websiteId})
             .then(function (website) {
                 website.pages.push(pageId);
                 return website.save();
             });
     }

     function deleteWebsite(websiteId) {
         // return websiteModel.remove({
         //     _id : websiteId
         // });
         var userId = websiteModel.findOne({_id: websiteId})._user;

         return websiteModel
            .remove({_id: websiteId})
            .then(function (status) {
                return User
                    .removeWebsiteFromUser(userId, websiteId);
            });
     }

     function findAllWebsites() {
         return websiteModel.find();
     }

};


//
// var mongoose = require('mongoose');
// var websiteSchema = require('./website.schema.server');
// var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
// var userModel = require('../user/user.model.server');
//
// // api
// websiteModel.findAllWebsites = findAllWebsites;
// websiteModel.createWebsiteForUser = createWebsiteForUser;
// websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
// websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;
//
// module.exports = websiteModel;
//
// function deleteWebsiteFromUser(userId, websiteId) {
//     return websiteModel
//         .remove({_id: websiteId})
//         .then(function (status) {
//             return userModel
//                 .deleteWebsite(userId, websiteId);
//         });
// }
//
// function findAllWebsitesForUser(userId) {
//     return websiteModel
//         .find({_user: userId})
//         .populate('_user')
//         .exec();
// }
//
// function createWebsiteForUser(userId, website) {
//     website._user = userId;
//     return websiteModel
//         .create(website)
//         .then(function (website) {
//             return userModel
//                 .addWebsite(userId, website._id)
//         })
// }
//
// function findAllWebsites() {
//     return websiteModel.find();
// }