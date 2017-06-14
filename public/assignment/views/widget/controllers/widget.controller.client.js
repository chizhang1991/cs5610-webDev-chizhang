(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);

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

    function NewWidgetController() {

    }

    function EditWidgetController() {

    }
})();