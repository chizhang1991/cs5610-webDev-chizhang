// var mongoose = requier('mongoose');
//
module.exports = function(mongoose){
    var websiteSchema = require("../website/website.schema.server.js")(mongoose);

    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username : {type : String, required : true},
        password : {type : String, required : true},
        firstName : String,
        lastName : String,
        email : String,
        phone : String,
        websites : [{
            type: Schema.Types.ObjectId,
            ref : 'Website'
        }],
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection: 'user'});

    return userSchema;
};

// var mongoose = require('mongoose');
//
// var userSchema = mongoose.Schema({
//     username: {type: String, unique: true},
//     password: String,
//     firstName: String,
//     lastName: String,
//     email: String,
//     websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
//     dateCreated: {type: Date, default: Date.now}
// }, {collection: "user"});
//
// module.exports = userSchema;