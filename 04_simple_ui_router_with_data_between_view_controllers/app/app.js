// angularjs/app_06/app/FirstController.js
/*
 * It is recommended to wrap AngularJS components within IIFE as this will remove the variables from the global scope,
 * which helps to avoid variable collisions.  This is especially true when code is minified and bundled into a single
 * file for deployment to a production server.
 */
(function(){
    'use strict';

    /**
     * It is a good practice to use a named function instead of passing an anonymous function as a callback.  This
     * helps to produce much more readable code and is much easier to debug.
     */
    angular.module('app',['ui.router'])
        .config(config)
        .controller('FirstController', FirstController)
        .controller('SecondController', SecondController)
        .service('greeting', Greeting)
    ;

    function config($stateProvider){
        $stateProvider.state('index',{
            url:'',
            controller:'FirstController as firstVm',
            templateUrl: '/angularjs/04_simple_ui_router_with_data_between_view_controllers/app/first.html'
        });
        $stateProvider.state('second',{
            url:'/second',
            controller:'SecondController as secondVm',
            templateUrl: '/angularjs/04_simple_ui_router_with_data_between_view_controllers/app/second.html'
        });
    }

    function Greeting(){
        var greeting = this;

        greeting.message = "default";
    }

    function FirstController(greeting){

        // it is good practice to capture the context of this to avoid any unintended context changes of 'this'
        // vm just stands for ViewModel and can be used consistently for all controllers.
        var vm = this;

        vm.greeting = greeting;

    }

    function SecondController(greeting){

        // it is good practice to capture the context of this to avoid any unintended context changes of 'this'
        // vm just stands for ViewModel and can be used consistently for all controllers.
        var vm = this;

        vm.greeting = greeting;

    }

})();

