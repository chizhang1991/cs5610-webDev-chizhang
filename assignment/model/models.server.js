// mongodb://<dbuser>:<dbpassword>@ds145892.mlab.com:45892/heroku_pxg85hjc

module.exports = function () {
    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://<cs5610-webdev>:<webdev>@ds145892.mlab.com:45892/heroku_pxg85hjc';
    } else {

    }
};

