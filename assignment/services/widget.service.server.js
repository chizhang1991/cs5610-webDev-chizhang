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

    // upload image
    app.post ("/api/upload", upload.single('file'), uploadImage);

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
        // var oldWidget = findWidgetById(widgetId);
        // var index = widgets.indexOf(oldWidget);
        // widgets[index].widgetType = widget.widgetType;
        // widgets[index].size = widget.size;
        // widgets[index].text = widget.text;

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
        res.sendStatus(404);
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var file = req.file;

        var uploadDetails = {
            originalname : file.originalname,
            filename : file.filename,
            fullpath : file.path,
            destination : file.destination,
            size : file.size,
            mimetype : file.mimetype
        };

        res.send(uploadDetails);
    }

};