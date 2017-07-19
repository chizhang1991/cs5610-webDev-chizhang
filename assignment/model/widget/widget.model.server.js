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
         console.log("in model create widget");
         // console.log("widget: " + widget);
         widget._page = pageId;
         // console.log(widget._page);
         return widgetModel.create(widget)
             .then(function (widget) {
                 console.log(widget);
                 return pageModel
                     .addWidgetToPage(pageId, widget._id);
             });
     }

     function findAllWidgetsForPage(pageId) {
         return widgetModel
             .find({_page: pageId})
             .populate('_page')
             .exec();
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
             height: widget.height,
             rows: widget.rows,
             size: widget.size,
             class: widget.class,
             icon: widget.icon
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

     }
};
