// angularjs/sandbox/alt-three/alt-three.js
(function(){
    'use strict';

    angular.module('ui-router-named-views.alt-three',[
        'ui.router'
    ])
        .config(config)
    ;

    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('app.alt-three',{
                url:'alt-two',
                views: {
                    'content@': {
                        templateUrl: '/angularjs/05_using_ui_router_to_switch_templates/alt-three/alt-three-content.html'
                    },
                    'header@':{
                        templateUrl: '/angularjs/05_using_ui_router_to_switch_templates/alt-three/alt-three-header.html'
                    },


                    // We have defined that this template should be used to replace the ui-view="one" inside of the
                    // 'app.alt-three' state templates.  For 'one@app.alt-three' and 'two@app.alt-three', the the
                    // ui-view has been placed within the alt-three-content.html template.  For 'three@app.alt-three',
                    // the ui-view has been placed within the alt-three-header.html template.
                    'one@app.alt-three':{
                        template: '<div class="alert-info">Sub One</div>'
                    },
                    'two@app.alt-three':{
                        template: '<div class="alert-info">Sub Two</div>'
                    },
                    'three@app.alt-three':{
                        template: '<div class="alert-info">Sub Three</div>'
                    }
                }
            })
        ;
    }
})();