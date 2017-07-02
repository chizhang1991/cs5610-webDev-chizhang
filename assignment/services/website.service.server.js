module.exports = function(app){

    var websites = [
        {_id: "123", name: "Facebook", developerId: "456", desc: "Test01"},
        {_id: "234", name: "Tweeter", developerId: "456", desc: "Test02"},
        {_id: "456", name: "Gizmodo", developerId: "456", desc: "Test03"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123", desc: "Test04"},
        {_id: "678", name: "Checkers", developerId: "123", desc: "Test05"},
        {_id: "789", name: "Chess", developerId: "234", desc: "Test06"}
    ];

    //POST Calls
    app.post('/api/user/:uid/website',createWebsite);

    //GET Calls
    app.get('/api/user/:uid/website',findAllWebsitesForUser);
    app.get('/api/website/:wid',findWebsiteById);

    //PUT Calls
    app.put('/api/website/:wid',updateWebsite);

    //DELETE Calls
    app.delete('/api/website/:websiteId',deleteWebsite);


    /*API calls implementation*/
    function createWebsite(req, res) {
        var uid = req.params.uid;
        var website = req.body;

        var newWebsite = {
            _id: new Date().getTime(),
            name: website.name,
            desc: website.desc,
            developerId: uid
        };
        websites.push(newWebsite);

        res.sendStatus(200);

        // var newWebsiteId = getNextId();
        // var newWebsite = {
        //     _id: newWebsiteId,
        //     name: website.name,
        //     desc: website.desc,
        //     developerId: userId
        // };
        // websites.push(newWebsite);
        // return newWebsiteId;
    }

    function findAllWebsitesForUser(req, res) {
        // var result = [];
        // for (w in websites) {
        //     var website = websites[w];
        //     if (parseInt(website.developerId) === parseInt(userId)) {
        //         result.push(website);
        //     }
        // }
        // return result;
        var uid = req.params.uid;
        // console.log(uid);
        var results = [];
        for (w in websites) {
            // var website = websites[w];
            if (String(websites[w].developerId) === String(uid)) {
                results.push(websites[w]);
            }
        }
        // console.log(results);
        res.send(results);
    }

    // function findUserById(req, res) {
    //
    //     var uid = req.params.uid;
    //
    //     for (u in users){
    //         var user = users[u];
    //         if(String(user._id) === String(uid)) {
    //             res.status(200).send(user);
    //             return;
    //         }
    //     }
    //     res.status(404).send("That user was not found by ID!");
    // }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        // console.log(wid);

        // var website = null;
        for (w in websites) {
            var website = websites[w];
            if (parseInt(website._id) === parseInt(wid)) {
                // website = websites[w];
                // break;
                res.status(200).send(website);
                return;
            }
        }
        // res.send(website);
        res.status(404).send("Cannot find this website by ID");
    }

    function updateWebsite(req, res) {

        var wid = req.params.wid;
        var website = req.body;

        for (w in websites) {
            if (parseInt(websites[w]._id) === parseInt(wid)) {
                websites[w].name=website.name;
                websites[w].desc=website.desc;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;
        for (w in websites) {
            if (parseInt(websites[w]._id) === parseInt(wid)) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};