// angularjs/sandbox/app.js
(function(){
    'use strict';

    angular.module('app',[
        'ui-router-named-views.alt-one',
        'ui-router-named-views.alt-two',
        'ui-router-named-views.alt-three',
        'ui.router'
    ])
        .config(config)
    ;

    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('app',{
                url: '/',
                views: {
                    'header': {
                        templateUrl:'/angularjs/05_using_ui_router_to_switch_templates/templates/header.html'
                    },
                    'sidebar': {
                        templateUrl: '/angularjs/05_using_ui_router_to_switch_templates/templates/sidebar.html'
                    },
                    'content': {
                        templateUrl: '/angularjs/05_using_ui_router_to_switch_templates/templates/content.html'
                    },
                    'footer': {
                        templateUrl: '/angularjs/05_using_ui_router_to_switch_templates/templates/footer.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('/')
    }
})();