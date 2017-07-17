// module.exports = function(mongoose){
//     var pageSchema = require("../page/page.schema.server.js")(mongoose);
//
//     var Schema = mongoose.Schema;
//
//     var websiteSchema = new Schema({
//         _user : {type : Schema.Types.ObjectId, ref : 'User'},
//         name : {type : String, required : true},
//         description : String,
//         pages : [{
//             type : Schema.Types.ObjectId,
//             ref : 'Page'
//         }],
//         dateCreated : {
//             type : Date,
//             default: Date.now
//         }
//     }, {collection : 'website'});
//
//     return websiteSchema;
// };

var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "GraduateUserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'graduate_website'});

module.exports = websiteSchema;