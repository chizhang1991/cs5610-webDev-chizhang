module.exports = function(app) {
    var models = require("./model/models.server.js")();

    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);
};

console.log("server side app.js is running");
