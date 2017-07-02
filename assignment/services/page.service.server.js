module.exports = function(app){

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    //POST calls
    app.post("/api/website/:wid/page", createPage);

    //GET calls
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);

    //PUT calls
    app.put("/api/page/:pid", updatePage);

    //API calls implementation
    function createPage(req, res) {
        var wid = req.params.wid;
        var page = req.body;

        var newPage = {
            _id: new Date().getTime(),
            name: page.name,
            websiteId: wid,
            description: page.description
        };
        pages.push(newPage);

        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.wid;
        var results = [];
        for (p in pages) {
            if (String(pages[p].websiteId) === String(wid)) {
                results.push(pages[p]);
            }
        }
        // console.log(results);
        res.send(results);
    }

    function findPageById(req, res) {
        var pid = req.params.pid;

        for (p in pages) {
            var page = pages[p];
            if (String(page._id) === String(pid)) {
                res.status(200).send(page);
                return;
            }
        }
        res.status(404).send("Cannot find this page by ID");
    }

    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;

        for (p in pages) {
            if (String(pages[p]._id) === String(pid)) {
                pages[p]=page;
                // websites[w].desc=website.desc;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};