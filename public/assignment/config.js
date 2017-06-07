(function () {
    angular
        .module("WhiteBoardApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/login",
                    {
                        templateUrl: "/views/user/login.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/register",
                    {
                        templateUrl: "/views/user/register.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid",
                    {
                        templateUrl: "/views/user/profile.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid/website",
                    {
                        templateUrl: "/views/website/website-list.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid/website/new",
                    {
                        templateUrl: "/views/website/website-new.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid/website/:wid",
                    {
                        templateUrl: "/views/website/website-edit.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid/website/:wid/page",
                    {
                        templateUrl: "/views/page/page-list.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid/website/:wid/page/new",
                    {
                        templateUrl: "/views/page/page-new.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid/website/:wid/page/:pid",
                    {
                        templateUrl: "/views/page/page-edit.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid/website/:wid/page/:pid/widget",
                    {
                        templateUrl: "/views/page/widget-list.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid/website/:wid/page/:pid/widget/new",
                    {
                        templateUrl: "/views/page/widget-chooser.view.client.html",
                        // controller: "courseList.controller"
                    })
                .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",
                    {
                        templateUrl: "/views/page/widget-edit.view.client.html",
                        // controller: "courseList.controller"
                    })
        });
})();