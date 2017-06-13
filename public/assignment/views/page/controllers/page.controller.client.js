(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pages = PageService.findPageByWebsiteId(vm.wid);
    }

    function NewPageController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
    }
    function EditPageController() {

    }
})();