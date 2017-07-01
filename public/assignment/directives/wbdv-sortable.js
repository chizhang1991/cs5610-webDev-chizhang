(function () {
    angular
        .module("WbdvDirective", [])
        .directive("wbdvSortable", wbdvSortable);

    function wbdvSortable() {
        function linker(scope, element, attrs) {

            $(element).sortable({
                start: function (event, ui) {
                    start = ui.item.index();
                    console.log();
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    scope.callback({
                        start: start,
                        end: end
                    })
                }
            });
        }

        return {
            link: linker,
            callback: '&'
        };
    }
})();