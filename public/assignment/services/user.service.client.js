(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {
        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "setCurrentUser":setCurrentUser,
            "login":login,
            "logout" : logout,
            "register" : register
            // "checkLoggedIn" : checkLoggedIn
        };
        return services;

        // security
        // function login(user){
        //     return $http.post("/api/login", user);
        // }

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function logout() {
            var url = "api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function register(user) {
            var url = "api/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
        
        // function checkLoggedIn() {
        //     var deferred = $q.defer();
        //     var url = '/api/loggedin';
        //     return $http
        //         .get(url)
        //         .then(function(user) {
        //             $rootScope.errorMessage = null;
        //             if (user !== '0') {
        //                 $rootScope.currentUser = user;
        //                 deferred.resolve();
        //             } else {
        //                 $rootScope.error = "You need to log in.";
        //                 deferred.reject();
        //                 $location.url('/login');
        //             }
        //         });
        // }
        // security


        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
            // return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();