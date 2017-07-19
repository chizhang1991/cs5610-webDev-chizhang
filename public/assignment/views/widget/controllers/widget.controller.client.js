(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        WidgetService
            .findWidgetsByPageId(vm.pid)
            .then(renderWidgets);

        function renderWidgets(widgets) {
            vm.widgets = widgets;
        }

        vm.trustThisContent = trustThisContent;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;

        function trustThisContent(html) {
            // diligence to scrub unsafe content
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(youtubeLink) {
            var embedUrl = "https://www.youtube.com/embed/";
            var youtubeLinkParts = youtubeLink.split('/');
            var id = youtubeLinkParts[youtubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }

    function NewWidgetController($routeParams) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
    }

    function CreateWidgetController($routeParams, $location, $timeout, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wtype = $routeParams.wtype;

        vm.createWidget = createWidget;

        function createWidget(name, size, width, text, url) {

            if (vm.wtype === "HEADING") {
                if (size === undefined || text === undefined || size === null || text === null) {
                    vm.error = "Heading name and size cannot be empty.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                    return;
                }
            }
            if (vm.wtype === "IMAGE" || vm.wtype === "YOUTUBE") {
                if (url === undefined || url === null) {
                    vm.error = "Width and url cannot be empty.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                    return;
                }
            }
            if (vm.wtype === "HTML") {
                if (text === undefined || text === null) {
                    vm.error = "HTML text cannot be empty.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                    return;
                }
            }

            var widget = {
                widgetType: vm.wtype,
                name: name,
                size: size,
                width: width,
                text: text,
                url: url
            };

            WidgetService
                .createWidget(vm.pid, widget)
                .then(function () {
                    console.log("to correct branch");
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }
    }

    function EditWidgetController($routeParams, $location, $timeout, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        WidgetService
            .findWidgetById(vm.wgid)
            .then(function (widget) {
                vm.widget = widget;
            }, function (error) {
                vm.error = "Cannot find this widget by id";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            });

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        
        function updateWidget(newWidget) {
            WidgetService
                .updateWidget(vm.wgid, newWidget)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                }, function (error) {
                    vm.error = "Cannot find widget to update.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }

        function deleteWidget(widget) {
            WidgetService
                .deleteWidget(widget._id)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                }, function (error) {
                    vm.error = "Cannot find widget to delete.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                })
        }
    }
    
    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        console.log(vm.wgid);

        vm.selectPhoto = selectPhoto;

        vm.searchPhotos = function(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        };

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var newWidget = {
                widgetType: "IMAGE",
                url: url
            };

            // wgid is useless -- to be revised
            // image edit and image create cannot work together
            if (vm.wgid === null || vm.wgid === undefined) {
                WidgetService
                    .createWidget(vm.pid, newWidget)
                    .then(function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    })
            } else {
                WidgetService
                    .updateWidget(vm.wgid, newWidget)
                    .then(function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    })
            }
            // WidgetService
            //     .updateWidget(vm.wgid, photo)
            //     .then(function () {
            //         $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            //     });
        }

    }
})();