(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        // vm.pages = PageService.findPageByWebsiteId(vm.wid);
        PageService
            .findPageByWebsiteId(vm.wid)
            .then(renderPages);

        function renderPages(pages) {
            vm.pages = pages;
            // console.log(vm.pages);
        }
    }

    function NewPageController($routeParams, $timeout, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        vm.createPage = createPage;

        function createPage(pageName, pageTitle) {
            if (pageName === undefined || pageName === null) {
                vm.error = "Page name cannot be empty.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
                return;
            }

            var page = {
                name: pageName,
                description: pageTitle
            };

            PageService
                .createPage(vm.wid, page)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                });
        }
    }

    function EditPageController($routeParams, $location, $timeout, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pid)
                .then(function (page) {
                    vm.page = page;
                }, function (error) {
                    vm.error = "Cannot find that page by ID";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }
        init();

        function updatePage(newPage) {
            // var update_page = {
            //     _id: vm.pid,
            //     name: page.name,
            //     websiteId: vm.wid,
            //     description: page.des
            // };

            PageService
                .updatePage(vm.pid, newPage)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                });
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }
    }
})();