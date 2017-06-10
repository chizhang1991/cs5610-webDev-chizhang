(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
    }
})();