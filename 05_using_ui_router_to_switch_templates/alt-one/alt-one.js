// angularjs/sandbox/alt-one/alt-one.js
(function(){
    'use strict';

    angular.module('ui-router-named-views.alt-one',[
        'ui.router'
    ])
        .config(config)
    ;

    function config($stateProvider, $urlRouterProvider){
        $stateProvider

            // We use 'app.alt-one' to tell the $stateProvider that this is a sub-state of the 'app' state
            .state('app.alt-one',{
                url:'alt-one',
                views: {

                    // We use 'content@' to tell the $stateProvider to override the content on the parent 'app' state.
                    // In other words, instead of inserting content.html into the main view, it will insert this
                    // template. As this is the only ui-view that has changed, the main view will continue to use the
                    // parent HTML templates.
                    'content@': {
                        templateUrl: '/angularjs/05_using_ui_router_to_switch_templates/alt-one/alt-one-content.html'
                    }
                }
            })
        ;
    }
})();