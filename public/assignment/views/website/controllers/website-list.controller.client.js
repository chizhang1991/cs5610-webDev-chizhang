(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)

    function WebsiteListController() {
        var vm = this;
        vm.userId = $routeParams["userId"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }
})();