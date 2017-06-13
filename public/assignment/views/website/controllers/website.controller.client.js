(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.newWebsite = newWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
        init();

        function newWebsite(websiteName, websiteDesc) {
            if (websiteName === undefined || websiteName === null) {
                vm.error("Website name cannot be empty.");
                return;
            }
            var website = {
                name: websiteName,
                desc: websiteDesc
            };
            var websiteId = WebsiteService.createWebsite(vm.uid, website);
            website = WebsiteService.findWebsiteById(websiteId);
            $location.url("/user/" + vm.uid + "/website");
        }
    }

    function EditWebsiteController($routeParams, $location, $timeout, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite() {
            var update_website = {
                _id: $routeParams.wid,
                name: vm.website.name,
                developerId: vm.uid,
                desc: vm.website.desc
            };
            WebsiteService.updateWebsite(vm.websiteId, update_website);

            vm.updated = "Website changes saved!";

            $timeout(function () {
                vm.updated = null;
            }, 3000);
            // console.log("updated");
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/" + vm.uid + "/website");
        }
    }

})();