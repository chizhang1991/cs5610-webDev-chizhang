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

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.uid);

        vm.newWebsite = newWebsite;
        function newWebsite(websiteName, websiteDesc) {
            if (websiteName === undefined || websiteName === null) {
                vm.error("Website name cannot be empty.");
                return;
            }
            var website = {
                name: websiteName,
                desc: websiteDesc
            }
            WebsiteService.createWebsite(uid, website);
        }
    }

    // function ProfileController($routeParams, $location, $timeout, UserService) {
    //     var vm = this;
    //     vm.user = UserService.findUserById($routeParams.uid);
    //     vm.username = vm.user.username;
    //     vm.firstName = vm.user.firstName;
    //     vm.lastName = vm.user.lastName;
    //     vm.email = vm.user.email;
    //     vm.updateUser = updateUser;
    //
    //     function updateUser() {
    //         var update_user = {
    //             _id: $routeParams.uid,
    //             firstName: vm.firstName,
    //             lastName: vm.lastName,
    //             email: vm.email
    //         };
    //         UserService.updateUser($routeParams.uid, update_user);
    //         vm.updated = "Profile changes saved!";
    //
    //         $timeout(function () {
    //             vm.updated = null;
    //         }, 3000);
    //     }
    // }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(uid);

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite

        function updateWebsite() {
            var update_website = {
                _id: $routeParams.uid,
            }
        }
        function deleteWebsite() {

        }
    }

})();