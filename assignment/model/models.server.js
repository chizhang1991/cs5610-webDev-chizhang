
module.exports = function() {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://<cs5610-webdev>:<webdev>@ds145892.mlab.com:45892/heroku_pxg85hjc';
    }
    else
    {
        connectionString = connectionString = 'mongodb://localhost:27017/cs5610-webdev'
    }

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")(mongoose);
    var websiteModel = require("./website/website.model.server.js")(mongoose, userModel);
    var pageModel =  require("./page/page.model.server.js")(mongoose, websiteModel);
    var widgetModel = require("./widget/widget.model.server.js")(mongoose, pageModel);

    var models = {
        'userModel' : userModel,
        'websiteModel' : websiteModel,
        'pageModel' : pageModel,
        'widgetModel' : widgetModel
    };

    return models;
};

console.log("models.server.js is running");

