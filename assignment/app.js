// module.exports = function(app) {
//     // var models = require("./model/models.server.js")();
//
//     require("./services/user.service.server.js")(app);
//     require("./services/website.service.server.js")(app);
//     require("./services/page.service.server.js")(app);
//     require("./services/widget.service.server.js")(app);
// };
//
// console.log("server side app.js is running");

module.exports = function(app){
    var models = require("./model/models.server.js")();

    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server")(app, models);
    require("./services/widget.service.server")(app, models);
};

console.log("server side app.js is running");