// mongodb://<dbuser>:<dbpassword>@ds145892.mlab.com:45892/heroku_pxg85hjc

// module.exports = function (mongoose) {
//
//     if (process.env.MONGODB_URI) {
//         connectionString = 'mongodb://<cs5610-webdev>:<webdev>@ds145892.mlab.com:45892/heroku_pxg85hjc';
//     }
//     // else {
//     //     console.log("connect to local");
//     //     var mongoose = require('mongoose');
//     //     mongoose.connect('mongodb://localhost/cs5610-webdev');
//     //     mongoose.Promise = require('q').Promise;
//     // }
//
//     var models = {
//         User: require('./user/user.model.server')(mongoose),
//         Website: require('./website/website.model.server')(mongoose, models),
//         Page: require('./page/page.model.server')(mongoose),
//         Widget: require('./widget/widget.model.server')(mongoose)
//     };
//     return models;
// };

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
    var websiteModel = require("./website/website.model.server.js")(mongoose);
    var pageModel =  require("./page/page.model.server.js")(mongoose);
    var widgetModel = require("./widget/widget.model.server.js")(mongoose);

    var models = {
        'userModel' : userModel,
        'websiteModel' : websiteModel,
        'pageModel' : pageModel,
        'widgetModel' : widgetModel
    };

    return models;
};

console.log("models.server.js is running");

