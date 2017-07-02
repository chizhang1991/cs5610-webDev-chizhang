(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        // vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        WebsiteService
            .findWebsitesByUser(vm.uid)
            .then(renderWebsites);

        function renderWebsites(websites) {
            vm.websites = websites;
        }
    }

    function NewWebsiteController($routeParams, $timeout, WebsiteService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.newWebsite = newWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .then(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            vm.websites = websites;
        }

        function newWebsite(websiteName, websiteDesc) {
            if (websiteName === undefined || websiteName === null) {

                vm.error = "Website name cannot be empty.";

                $timeout(function () {
                    vm.error = null;
                }, 3000);

                return;
            }

            var website = {
                name: websiteName,
                desc: websiteDesc
            };
            // var websiteId = WebsiteService.createWebsite(vm.uid, website);
            return WebsiteService
                .createWebsite(vm.uid, website)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website");
                });

            // website = WebsiteService.findWebsiteById(websiteId);
            // $location.url("/user/" + vm.uid + "/website");
        }
    }

    function EditWebsiteController($routeParams, $location, $timeout, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        WebsiteService
            .findWebsitesByUser(vm.uid)
            .then(function (websites) {
                    vm.websites = websites;
                });

        WebsiteService
            .findWebsiteById(vm.wid)
            .then(function (website) {
                vm.website = website;
                // console.log(website);
            }, function (error) {
                vm.error = "Cannot find such a website";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            });

        // function init() {
        //     // WebsiteService
        //     //     .findWebsitesByUser(vm.uid)
        //     //     .then(renderWebsites);
        //     // WebsiteService
        //     //     .findWebsiteById(vm.wid)
        //     //     .then(function (website) {
        //     //         vm.website = website;
        //     //     });
        // }
        // init();

        // console.log(website);
        // function renderWebsites(websites) {
        //     vm.websites = websites;
        // }

        // WebsiteService
        //     .findWebsiteById(vm.wid)
        //     .then(function renderWebsite(website) {
        //         vm.website = website;
        //     });

        function updateWebsite(newWebsite) {
            // var update_website = {
            //     _id: $routeParams.wid,
            //     name: vm.website.name,
            //     developerId: vm.uid,
            //     desc: vm.website.desc
            // };
            WebsiteService.updateWebsite(vm.wid, newWebsite)
                .then(function () {
                    vm.updated = "Website changes saved!";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });

        }

        function deleteWebsite(website) {
            WebsiteService
                .deleteWebsite(website._id)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website");
                }, function (error) {
                    vm.error = "Unable to remove this website";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }
    }

})();