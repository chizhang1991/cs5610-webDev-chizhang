// module.exports = function(mongoose, userModel) {
//     var websiteSchema = require('./website.schema.server.js')(mongoose);
//     var websiteModel = mongoose.model('Website', websiteSchema);
//
//     /* var api = {
//      'createWebsiteForUser': createWebsiteForUser,
//      'findAllWebsitesForUser': findAllWebsitesForUser,
//      'findWebsiteById': findWebsiteById,
//      'updateWebsite': updateWebsite,
//      'removePageFromWebsite': removePageFromWebsite,
//      'deleteWebsite': deleteWebsite
//      };
//      return api;*/
// }

var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

// api
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;

module.exports = websiteModel;

function deleteWebsiteFromUser(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(userId, websiteId);
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id)
        })
}

function findAllWebsites() {
    return websiteModel.find();
}