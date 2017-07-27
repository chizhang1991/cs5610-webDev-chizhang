(function () {
    angular
        .module("WebAppMaker")
        .controller("HomepageController", HomepageController);

    function HomepageController(currentUser) {
        // console.log(currentUser);
        var vm = this;
        vm.currentUser = currentUser;
    }
})();