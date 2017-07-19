module.exports = function(app, models){

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    var model = models.widgetModel;
    // var widgets =
    //     [
    //         { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
    //         { _id: "321", widgetType: "HEADING", pageId: "432", size: 2, text: "GIZMODO"},
    //         { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    //         { _id: "876", widgetType: "YOUTUBE", pageId: "432", width: "100%",
    //             url: "https://youtu.be/AM2Ivdi9c4E" },
    //         { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
    //             url: "http://lorempixel.com/400/200/"},
    //         { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
    //         { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
    //
    //         { _id: "543", widgetType: "IMAGE", pageId: "432", width: "100%",
    //             url: "http://lorempixel.com/400/200/"},
    //         { _id: "987", widgetType: "HTML", pageId: "432", text: "<p>Lorem ipsum</p>"},
    //         { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    //         { _id: "654", widgetType: "HTML", pageId: "432", text: "<p>Lorem ipsum</p>"},
    //         { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
    //             url: "https://youtu.be/AM2Ivdi9c4E" },
    //         { _id: "432", widgetType: "HEADING", pageId: "432", size: 4, text: "Lorem ipsum"},
    //         { _id: "765", widgetType: "HEADING", pageId: "432", size: 4, text: "Lorem ipsum"}
    //     ];

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

    // reorder widget list
    app.put("/api/page/:pid/widget", reorderWidgets);

    // api implementation

    function createWidget(req, res) {
        var pid = req.params.pid;
        var widget = req.body;
        // console.log("in service: " + widget);

        model
            .createWidget(pid, widget)
            .then(
                function (widget) {
                    // console.log(widget);
                    if(widget){
                        // console.log("in if branch");
                        res.json(widget);
                        // res.send(200);
                    } else {
                        // console.log("in else branch");
                        widget = null;
                        res.send(widget);
                    }
                }
                ,
                function (error) {
                    console.log("in error branch");
                    res.sendStatus(400).send("widget service server, createWidget error");
                }
            )
        // var newWidget = {
        //     _id: new Date().getTime(),
        //     widgetType: widget.widgetType,
        //     pageId: pid,
        //     size: widget.size,
        //     text: widget.text,
        //     width: widget.width,
        //     url: widget.url
        // };
        // widgets.push(newWidget);
        //
        // res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;

        model
            .findAllWidgetsForPage(pid)
            .then(
                function (widgets) {
                    if(widgets) {
                        res.json(widgets);
                    } else {
                        widgets = null;
                        res.send(widgets);
                    }
                }, function (error) {
                    res.sendStatus(400).send("widget service server, findAllWidgetsForPage error");
                }
            )

        // result = [];
        // for (w in widgets) {
        //     var widget = widgets[w];
        //     if (parseInt(widget.pageId) === parseInt(pid)) {
        //         result.push(widget);
        //     }
        // }
        // res.send(result);
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        // console.log("in findWidgetById")

        model
            .findWidgetById(wgid)
            .then(
                function (widget) {
                    if (widget) {
                        res.json(widget);
                    } else {
                        widget = null;
                        res.send(widget);
                    }
                },
                function (error) {
                    res.sendStatus(400).send("widget service server, findWidgetById error");
                }
            );
        //
        // for (w in widgets) {
        //     var widget = widgets[w];
        //     if (parseInt(widget._id) === parseInt(wgid)) {
        //         res.status(200).send(widget);
        //         return;
        //     }
        // }
        // res.status(404).send("Cannot find this widget by id");
    }

    function updateWidget(req, res) {

        var wgid = req.params.wgid;
        var widget = req.body;

        model
            .updateWidget(wgid, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.status(400).send("widget service server, updateWidget error");
                }
            );
        // for (w in widgets) {
        //     if (String(widgets[w]._id) === String(wgid)) {
        //         widgets[w] = widget;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.Status(404).send("Cannot find widget to update");
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;

        if(wgid){
            model
                .deleteWidget(wgid)
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
        // for (w in widgets) {
        //     if (parseInt(widgets[w]._id) === parseInt(wgid)) {
        //         widgets.splice(w, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function uploadImage(req, res) {

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

        // widget = getWidgetById(widgetId);
        var url = 'uploads/'+filename;

        // when try to create a new image
        if (widgetId === undefined || widgetId === null || widgetId === '') {
            var widget = {
                widgetType: "IMAGE",
                url: url,
                width: width
            };

            model
                .createWidget(pageId, widget)
                .then(
                    function (widget) {
                        // console.log(widget);
                        if(widget){
                            // console.log("in if branch");
                            res.json(widget);
                            console.log("touch");
                            // res.send(200);
                        } else {
                            // console.log("in else branch");
                            widget = null;
                            res.send(widget);
                        }
                    }
                    ,
                    function (error) {
                        // console.log("in error branch");
                        res.sendStatus(400).send("widget service server, upload error");
                    }
                )
        } else {
            // when trying to edit existing image
            model
                .findWidgetById(widgetId)
                .then(
                    function (widget) {
                        widget.url = url;
                        model.updateWidget(widgetId, widget)
                            .then(
                                function (widget) {
                                    res.json(widget);
                                },
                                function (error) {
                                    res.status(400).send("widget service server, updateWidget error");
                                }
                            )
                    },
                    function (error) {
                        res.status(400).send("Cannot find widget by id");
                    }
                )
                // .updateWidget(widgetId, widget)
                // .then(
                //     function (widget) {
                //         res.json(widget);
                //     },
                //     function (error) {
                //         res.status(400).send("widget service server, updateWidget error");
                //     }
                // );
        }

        // function getWidgetById(widgetId) {
        //
        //     // when try to create a new image
        //     if (widgetId === undefined || widgetId === null || widgetId === '') {
        //         // console.log("come into the correct loop");
        //         // create a new widget, add to widgets
        //         var newWidget = {
        //             _id: new Date().getTime(),
        //             widgetType: "IMAGE",
        //             pageId: pageId,
        //             width: width
        //         };
        //         widgets.push(newWidget);
        //         return newWidget;
        //     }
        //
        //     // edit existing image
        //     for (w in widgets) {
        //         var widget = widgets[w];
        //         if (String(widget._id) === String(widgetId)) {
        //             return widget;
        //         }
        //     }
        //
        //     return null;
        // }

        var callbackUrl  = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
        res.redirect(callbackUrl);
    }

    function reorderWidgets(req, res) {
        // get widgets by pageId
        var pageId = req.params.pid;
        // var pageWidgets = [];
        // for (w in widgets) {
        //     var widget = widgets[w];
        //     if (parseInt(widget.pageId) === parseInt(pageId)) {
        //         pageWidgets.push(widget);
        //     }
        // }

        // index1 and index2 are index in pageWidgets
        var index1 = req.query.initial;
        var index2 = req.query.final;
        console.log("in service: " + index1 + " " + index2);

        // get the index of the widget in widgets
        // var initial = widgets.indexOf(pageWidgets[index1]);
        // var final = widgets.indexOf(pageWidgets[index2]);

        // reorder widgets
        // if (index1 && index2) {
        //     // console.log("come into if condition");
        //     if (final >= widgets.length) {
        //         var k = final - widgets.length;
        //         while ((k--) + 1) {
        //             widgets.push(undefined);
        //         }
        //     }
        //     widgets.splice(final, 0, widgets.splice(initial, 1)[0]);
        //     res.sendStatus(200); // for testing purposes
        //     return;
        // }
        // res.status(404).send("Cannot reorder widgets");

        model
            .reorderWidget(pageId, index1, index2);
    }

};