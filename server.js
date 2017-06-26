// //using express with node js
// var express = require('express');
//
// //initialize app as an express application
// var app = express();
//
// // install, load, and configure body parser module
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
//
// app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname+'/public/assignment'));
//
// require("./public/assignment/app")(app);
//
// app.listen(app.get('port'), function() {
//     console.log('Node app is running on port', app.get('port'));
// });

//using express with node js
var express = require('express');
//initialize app as an express application
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/public/assignment'));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

// app.get('/api/user/:uid', function (req, res) {
//  var uid = req.params.uid;
//  console.log("get uri");
//  res.sendStatus(200);
//  });

//require("./temp/server_side_example/server_side/app.js")(app);
require("./assignment/app.js")(app);
