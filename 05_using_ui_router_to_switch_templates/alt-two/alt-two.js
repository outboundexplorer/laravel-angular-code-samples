// angularjs/sandbox/alt-two/alt-two.js
(function(){
    'use strict';

    angular.module('ui-router-named-views.alt-two',[
        'ui.router'
    ])
        .config(config)
    ;

    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('app.alt-two',{
                url:'alt-two',
                views: {
                    'content@': {
                        templateUrl: '/angularjs/05_using_ui_router_to_switch_templates/alt-two/alt-two-content.html'
                    },
                    'header@':{
                        templateUrl: '/angularjs/05_using_ui_router_to_switch_templates/alt-two/alt-two-header.html'
                    }
                }
            })
        ;
    }
})();