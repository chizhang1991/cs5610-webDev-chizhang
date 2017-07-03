module.exports = function(app){

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    var widgets =
        [
            { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
            { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
                url: "http://lorempixel.com/400/200/"},
            { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
            { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E" },
            { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
        ];

    // POST call
    app.post("/api/page/:pid/widget", createWidget);

    // GET call
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);

    // PUT call
    app.put("/api/widget/:wgid", updateWidget);

    // DELETE call
    app.delete("/api/widget/:wgid", deleteWidget);

    // upload image
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    // api implementation

    function createWidget(req, res) {
        var pid = req.params.pid;
        var widget = req.body;

        var newWidget = {
            _id: new Date().getTime(),
            widgetType: widget.widgetType,
            pageId: pid,
            size: widget.size,
            text: widget.text,
            width: widget.width,
            url: widget.url
        };
        widgets.push(newWidget);

        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        result = [];
        for (w in widgets) {
            var widget = widgets[w];
            if (parseInt(widget.pageId) === parseInt(pid)) {
                result.push(widget);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;

        for (w in widgets) {
            var widget = widgets[w];
            if (parseInt(widget._id) === parseInt(wgid)) {
                res.status(200).send(widget);
                return;
            }
        }
        res.status(404).send("Cannot find this widget by id");
    }

    function updateWidget(req, res) {

        var wgid = req.params.wgid;
        var widget = req.body;
        for (w in widgets) {
            if (String(widgets[w]._id) === String(wgid)) {
                // websites[w].name=website.name;
                // websites[w].desc=website.desc;
                widgets[w] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.Status(404).send("Cannot find widget to update");
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        for (w in widgets) {
            if (parseInt(widgets[w]._id) === parseInt(wgid)) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    // function uploadImage(req, res) {
    //     var widgetId = req.body.widgetId;
    //     var width = req.body.width;
    //     var file = req.file;
    //
    //     var uploadDetails = {
    //         originalname : file.originalname,
    //         filename : file.filename,
    //         fullpath : file.path,
    //         destination : file.destination,
    //         size : file.size,
    //         mimetype : file.mimetype
    //     };
    //
    //     res.send(uploadDetails);
    // }

    function uploadImage(req, res) {
        // console.log(req);

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;

        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        // console.log(widgetId);
        widget = getWidgetById(widgetId);
        // console.log(widget);
        widget.url = '/uploads/'+filename;

        function getWidgetById(widgetId) {
            // console.log(widgetId);

            for (w in widgets) {
                var widget = widgets[w];
                // console.log(widget);
                if (String(widget._id) === String(widgetId)) {
                    return widget;
                }
            }
            return null;
        }

        var callbackUrl  = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
        res.redirect(callbackUrl);
    }

};