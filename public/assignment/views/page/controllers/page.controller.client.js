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

    function NewPageController($routeParams, $timeout, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        vm.createPage = createPage;

        function createPage(pageName, pageTitle) {
            if (pageName === undefined || pageName === null) {
                vm.error("Website name cannot be empty.");
                return
            }
            var page = {
                name: pageName,
                description: pageTitle
            }
            PageService.createPage(vm.wid, page);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }

    }
    // function NewWebsiteController($routeParams, WebsiteService, $location) {
    //     var vm = this;
    //     vm.uid = $routeParams.uid;
    //     vm.newWebsite = newWebsite;
    //
    //     function init() {
    //         vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
    //     }
    //     init();
    //
    //     function newWebsite(websiteName, websiteDesc) {
    //         if (websiteName === undefined || websiteName === null) {
    //             vm.error("Website name cannot be empty.");
    //             return;
    //         }
    //         var website = {
    //             name: websiteName,
    //             desc: websiteDesc
    //         };
    //         var websiteId = WebsiteService.createWebsite(vm.uid, website);
    //         website = WebsiteService.findWebsiteById(websiteId);
    //         $location.url("/user/" + vm.uid + "/website");
    //     }
    // }

    function EditPageController() {

    }
})();