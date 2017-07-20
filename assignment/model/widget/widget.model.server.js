module.exports = function(mongoose, pageModel) {
    var widgetSchema = require('./widget.schema.server.js')(mongoose);
    var widgetModel = mongoose.model('widgetModel', widgetSchema);

    var api = {
     'createWidget': createWidget,
     'findAllWidgetsForPage': findAllWidgetsForPage,
     'findWidgetById': findWidgetById,
     'updateWidget': updateWidget,
     'deleteWidget': deleteWidget,
     'reorderWidget': reorderWidget
     };

     return api;

     function createWidget(pageId, widget) {
         // console.log("in model create widget");
         // console.log("widget: " + widget);
         widget._page = pageId;
         // console.log(widget._page);
         return widgetModel.create(widget)
             .then(function (widget) {
                 // console.log(widget);
                 return pageModel
                     .addWidgetToPage(pageId, widget._id);
             });
     }

     function findAllWidgetsForPage(pageId) {
         // return widgetModel
         //     .find({_page: pageId})
         //     .populate('_page')
         //     .exec();

         // change to find widgets in page.widgets
         return pageModel
             .findPageById(pageId)
             .populate('widgets')
             .then(
                 function (page) {
                     // console.log(page.widgets);
                     return page.widgets;
                 }
             )
     }

     function findWidgetById(widgetId) {
         return widgetModel.findById(widgetId);
     }

     function updateWidget(widgetId, widget) {
         return widgetModel.update({
             _id: widgetId
         }, {
             name: widget.name,
             text: widget.text,
             placeholder: widget.placeholder,
             description: widget.description,
             url: widget.url,
             width: widget.width,
             size: widget.size
         });
     }

     function deleteWidget(widgetId) {
         var pageId = widgetModel.findById(widgetId)._page;

         return widgetModel
             .remove({_id: widgetId})
             .then(function (status) {
                 return pageModel
                     .removeWidgetFromPage(pageId, widgetId);
             })
     }

     function reorderWidget(pageId, start, end) {
         console.log(start + " " + end);
         return pageModel
             .findPageById(pageId)
             .then(
                 function (page) {
                     console.log(page.widgets);
                     // page.widgets;
                     if (start && end) {
                         console.log("come into if condition");
                         if (end >= page.widgets.length) {
                             var k = end - page.widgets.length;
                             while ((k--) + 1) {
                                 page.widgets.push(undefined);
                             }
                         }
                         page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                         // res.sendStatus(200); // for testing purposes
                         // return;
                         console.log(page.widgets);
                         return page.save();
                     }
                 }
             )
     }

};
