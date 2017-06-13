(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($routeParams, PageService) {
        var vm = this;
        // vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams['wid'];
        vm.pages = PageService.findPageByWebsiteId(websiteId);
    }
    // function WebsiteListController($routeParams, WebsiteService) {
    //     var vm = this;
    //     vm.uid = $routeParams.uid;
    //     vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    // }

    function NewPageController() {

    }
    function EditPageController() {

    }
})();