// (function () {
//     angular
//         .module("WebAppMaker")
//         .factory("PageService", PageService);
//
//     function PageService($http){
//         var services = {
//             'createPage' : createPage,
//             'findPageByWebsiteId' : findPageByWebsiteId,
//             'findPageById' : findPageById,
//             'updatePage' : updatePage,
//             'deletePage' : deletePage,
//             'deletePagesByWebsite' : deletePagesByWebsite
//         };
//         return services;
//
//         function createPage(websiteId, page){
//             var url = "/api/website/" + websiteId + "/page";
//             return $http.post(url, page);
//         }
//
//         function findPageById(pageId){
//             var url = "/api/page/" + pageId;
//             return $http.get(url);
//         }
//
//         function findPageByWebsiteId(websiteId) {
//             var url = "/api/website/" + websiteId + "/page";
//             return $http.get(url);
//         }
//
//         function updatePage(pageId, page){
//             var url = "/api/page/" + pageId;
//             return $http.put(url, page);
//         }
//
//         function deletePage(pageId) {
//             var url = "/api/page/" + pageId;
//             return $http.delete(url);
//         }
//
//         function deletePagesByWebsite(websiteId){
//             var url = "/api/website/" + websiteId + "/page";
//             return $http.delete(url);
//         }
//     }
// })();


(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {
        // var users = [
        //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
        //     {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
        //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
        //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
        // ];
        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return services;

        // function getNextId() {
        //     function getMaxId(maxId, currentId) {
        //         var current = parseInt(currentId._id);
        //         if (maxId > current) {
        //             return maxId;
        //         } else {
        //             return current + 1;
        //         }
        //     }
        //     return users.reduce(getMaxId, 0).toString();
        // }

        function createUser(user) {
            // var newUserId = getNextId();
            // var newUser = {
            //     _id: newUserId,
            //     username: user.username,
            //     password: user.password,
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     email: user.email
            // };
            // users.push(newUser);
            var url = "/api/user";
            return $http.post(url, user);

        }

        function findUserById(userId) {
            // for (u in users){
            //     var user = users[u];
            //     if(parseInt(user._id) === parseInt(userId)){
            //         return user;
            //     }
            // }
            // return null;
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            // for (u in users){
            //     var user = users[u];
            //     if(user.username === username){
            //         return user;
            //     }
            // }
            // return null;

        }

        // function findUserByCredentials(username, password) {
        //     for (u in users){
        //         var user = users[u];
        //         if((user.username === username) && (user.password === password)){
        //             return user;
        //         }
        //     }
        //     return null;
        // }

        function findUserByCredentials(username, password) {
            // var cred = {
            //     username: username
            // }
            var url = '/api/user';
            return $http.post(url, {username:username, password:password});
        }


        function updateUser(userId, user) {
            // var oldUser = findUserById(userId);
            // var index = users.indexOf(oldUser);
            // users[index].firstName = user.firstName;
            // users[index].lastName = user.lastName;
            // users[index].email = user.email;
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            // var oldUser = findUserById(userId);
            // var index = users.indexOf(oldUser);
            // users.splice(index);
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
    }
})();