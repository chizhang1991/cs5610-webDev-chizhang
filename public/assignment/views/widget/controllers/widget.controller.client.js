(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);

        vm.trustThisContent = trustThisContent;
        function trustThisContent(html) {
            // diligence to scrub unsafe content
            $sce.trustAsHtml(html);
        }
    }

    function NewWidgetController() {

    }

    function EditWidgetController() {

    }
})();