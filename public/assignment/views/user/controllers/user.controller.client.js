(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            // var user = UserService.findUserByCredentials(username, password);
            UserService
                .findUserByCredentials(username, password)
                .then(login);
            
            function login(user) {
                console.log(user);
                if (user === null) {
                    vm.error = "Username does not exist.";
                } else {
                    $location.url("/user/" + user._id);
                }
            }

            // if (user === null) {
            //     vm.error = "Username does not exist.";
            // } else {
            //     $location.url("/user/" + user._id);
            // }
        }
    }

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === ""
                || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }
            // var user = UserService.findUserByUsername(username);
            UserService
                .findUserByUsername(username)
                .then(
                    function () {
                        vm.error = "Username already exists.";
                    },
                    function () {
                        var user = {
                            username: username,
                            password: password,
                            firstName: "",
                            lastName: "",
                            email: ""
                        };
                        // user = UserService.createUser(user);
                        // user = UserService.findUserByUsername(username);
                        // return the promise
                        return UserService
                            .createUser(user)
                            // .then(
                            //     function (user) {
                            //         $location.url("/user/" + user._id);
                            //     });
                        // $location.url("/user/" + user._id);
                    })
                .then(
                    function (user) {
                        $location.url("/user/" + user._id);
                    });;
            
            // function didFind() {
            //     vm.error = "Username already exists.";
            // }

            // function notFind() {
            //     user = {
            //         username: username,
            //         password: password,
            //         firstName: "",
            //         lastName: "",
            //         email: ""
            //     };
            //     // user = UserService.createUser(user);
            //     // user = UserService.findUserByUsername(username);
            //     // return the promise
            //     return UserService
            //         .createUser(user)
            //         .then(
            //             function (user) {
            //                 $location.url("/user/" + user._id);
            //             });
            //     // $location.url("/user/" + user._id);
            // }

            // if (user === null) {
            //     user = {
            //         username: username,
            //         password: password,
            //         firstName: "",
            //         lastName: "",
            //         email: ""
            //     };
            //     UserService.createUser(user);
            //     user = UserService.findUserByUsername(username);
            //     $location.url("/user/" + user._id);
            // }
            // else {
            //     vm.error = "Username already exists.";
            // }
        }
    }

    function ProfileController($routeParams, $timeout, UserService) {
        var vm = this;
        vm.uid = $routeParams.uid;

        vm.updateUser = updateUser;

        UserService.findUserById(vm.uid)
            .then(renderUser, userError);

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    vm.updated = "Profile changes saved!";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });

            // var updata_user = {
            //     _id: vm.uid,
            //     firstName: vm.user.firstName,
            //     lastName: vm.user.lastName,
            //     email: vm.user.email
            // };
            // UserService.updateUser(vm.uid, updata_user);
            // vm.updated = "Profile changes saved!";
            // $timeout(function () {
            //     vm.updated = null;
            // }, 3000);
        }


        function renderUser(user) {
            vm.user = user;
        }
        // console.log(vm.user);
        
        function userError(error) {
            vm.error = "User not found";
        }

        // // vm.user = UserService.findUserById(vm.uid);
        // vm.username = vm.user.username;
        // vm.firstName = vm.user.firstName;
        // vm.lastName = vm.user.lastName;
        // vm.email = vm.user.email;
        // // console.log(vm.username);
        //

        // function updateUser() {
        //     var update_user = {
        //         _id: $routeParams.uid,
        //         firstName: vm.firstName,
        //         lastName: vm.lastName,
        //         email: vm.email
        //     };
        //     UserService.updateUser($routeParams.uid, update_user);
        //     vm.updated = "Profile changes saved!";
        //
        //     $timeout(function () {
        //         vm.updated = null;
        //     }, 3000);
        // }
    }
})();