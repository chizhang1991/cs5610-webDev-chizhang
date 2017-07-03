(function () {
    angular
        .module("WbdvDirective", [])
        .directive("wbdvSortable", wbdvSortable)
        .directive("hello", helloTag);
    

    function wbdvSortable() {

        function linkFunction(scope, element, attrs) {
            $(element).sortable();
        }

        return{
            link: linkFunction
        }
        // function linker(scope, element, attrs) {
        //     $(element).sortable();
        //
        //     // $(element).sortable({
        //     //     // start: function (event, ui) {
        //     //     //     start = ui.item.index();
        //     //     //     // console.log();
        //     //     // },
        //     //     // stop: function (event, ui) {
        //     //     //     end = ui.item.index();
        //     //     //     scope.callback({
        //     //     //         start: start,
        //     //     //         end: end
        //     //     //     })
        //     //     // }
        //     // });
        // }
        //
        // return {
        //     link: linker
        //     // callback: '&'
        // }
    }
    
    function helloTag() {
        
        function linkFunction(scope, element, attrs) {
            console.log(element);
            element.html('goodbye');
        }
        // alert("hello from directive");
        return {
            template: "<h1>Hello from directive</h1>",
            link: linkFunction
        }
    }
})();