// mongodb://<dbuser>:<dbpassword>@ds145892.mlab.com:45892/heroku_pxg85hjc

module.exports = function (mongoose) {

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://<cs5610-webdev>:<webdev>@ds145892.mlab.com:45892/heroku_pxg85hjc';
    }
    // else {
    //     console.log("connect to local");
    //     var mongoose = require('mongoose');
    //     mongoose.connect('mongodb://localhost/cs5610-webdev');
    //     mongoose.Promise = require('q').Promise;
    // }

    var models = {
        User: require('./user/user.model.server')(mongoose),
        Website: require('./website/website.model.server')(mongoose),
        Page: require('./page/page.model.server')(mongoose),
        Widget: require('./widget/widget.model.server')(mongoose)
    };
    return models;
};

console.log("models.server.js is running");

