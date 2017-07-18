module.exports = function(app, models){

    var model = models.pageModel;
    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    // ];

    //POST calls
    app.post("/api/website/:wid/page", createPage);

    //GET calls
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);

    //PUT calls
    app.put("/api/page/:pid", updatePage);

    //DELETE calls
    app.delete("/api/page/:pid", deletePage);

    //API calls implementation
    function createPage(req, res) {
        var wid = req.params.wid;
        var page = req.body;

        model
            .createPage(wid, page)
            .then(
                function (page) {
                    if(page){
                        // console.log("in if branch");
                        res.json(page);
                        // res.send(200);
                    } else {
                        // console.log("in else branch");
                        page = null;
                        res.send(website);
                    }
                },
                function (error) {
                    // console.log("in error branch");
                    res.sendStatus(400).send("page service server, createPage error");
                }
            )

        // var newPage = {
        //     _id: new Date().getTime(),
        //     name: page.name,
        //     websiteId: wid,
        //     description: page.description
        // };
        // pages.push(newPage);
        //
        // res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.wid;

        model
            .findAllPagesForWebsite(wid)
            .then(
                function (pages) {
                    // console.log("in service: " + websites);
                    if(pages) {
                        res.json(pages);
                    } else {
                        pages = null;
                        res.send(pages);
                    }
                },
                function (error) {
                    res.sendStatus(400).send("page service server, findAllPagesForWebsite error");
                }
            )

        // var results = [];
        // for (p in pages) {
        //     if (String(pages[p].websiteId) === String(wid)) {
        //         results.push(pages[p]);
        //     }
        // }
        // res.send(results);
    }

    function findPageById(req, res) {
        var pid = req.params.pid;

        model
            .findPageById(pid)
            .then(
                function (page) {
                    if (page) {
                        res.json(page);
                    } else {
                        page = null;
                        res.send(page);
                    }
                },
                function (error) {
                    res.sendStatus(400).send("page service server, findPageById error");
                }
            );

        // for (p in pages) {
        //     var page = pages[p];
        //     if (String(page._id) === String(pid)) {
        //         res.status(200).send(page);
        //         return;
        //     }
        // }
        // res.status(404).send("Cannot find this page by ID");
    }

    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;

        model
            .updatePage(pid, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.status(400).send("page service server, updatePage error");
                }
            );

        // for (p in pages) {
        //     if (String(pages[p]._id) === String(pid)) {
        //         pages[p]=page;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pid = req.params.pid;

        if(pid){
            model
                .deleteUser(pid)
                .then(
                    function (status){
                        res.sendStatus(200);
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        } else{
            // Precondition Failed. Precondition is that the user exists.
            res.sendStatus(412);
        }
        // for (p in pages) {
        //     if (parseInt(pages[p]._id) === parseInt(pid)) {
        //         pages.splice(p, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
};