(function(){
    'use strict';

    angular
        .module('app', [])
        .directive('updater', updaterDirective)
        .controller('OneAController', OneAController)
        .controller('OneBController', OneBController)
        .controller('TwoAController', TwoAController)
        .controller('TwoBController', TwoBController)
        .controller('TwoCController', TwoCController)
        .controller('TwoDController', TwoDController)
        .controller('TwoEController', TwoEController)
        .controller('TwoFController', TwoFController)
        .controller('ThreeAController', ThreeAController)
        .controller('ThreeBController', ThreeAController)
        .controller('FourAController', FourAController)
        .controller('FourBController', FourBController)
        .controller('FourCController', FourCController)
        .controller('FourDController', FourDController)
        .provider('UserProvider', UserProvider)
        .service('UserService', UserService)
        .factory('UserFactory', UserFactory)
        .provider('UserModelProvider', UserModelProvider)
        .provider('CachedUserModelProvider', CachedUserModelProvider)
        .service('UserService', UserService)
    ;

    function updaterDirective() {
        return {
            scope: {
                user: '='
            },
            template: '<button>change <strong>User.data</strong> to "reset"</button>',
            link: function(scope, element) {
                element.on('click', function() {
                    scope.user.data = 'reset';
                    scope.$apply();
                });
            }
        };
    }

    // --------------------------------------------------
    // No provider; two objects.
    //
    // These two objects will not update each other
    // --------------------------------------------------
    function OneAController(){
        var vm = this;
        vm.user = { data: 'start' };
    }

    function OneBController(){
        var vm = this;
        vm.user = { data: 'start' };
    }


    // --------------------------------------------------
    // Provider UserProvider returns the same object
    //
    // The data will always be in sync and will allow different controllers to communicate with each other.  They
    // communicate via the injected User provider.  This however, is not very useful for production as if we need to
    // work with multiple Users in the same view, then we will not want all of their data to be matched up.
    //
    // IN this example, we have used factory, service or provider all to perform the same task.  In this kind of
    // use case, it makes little difference which one we use.
    // --------------------------------------------------
    function TwoAController(UserProvider){
        var vm = this;
        vm.user = UserProvider;
    }

    function TwoBController(UserProvider){
        var vm = this;
        vm.user = UserProvider;
    }

    function TwoCController(UserService){
        var vm = this;
        vm.user = UserService;
    }

    function TwoDController(UserService){
        var vm = this;
        vm.user = UserService;
    }

    function TwoEController(UserFactory){
        var vm = this;
        vm.user = UserFactory;
    }

    function TwoFController(UserFactory){
        var vm = this;
        vm.user = UserFactory;
    }

    function UserService(){
        this.data = 'start';
    }

    function UserFactory(){
        return {
            data: 'start'
        }
    }

    function UserProvider(){
        this.$get = function(){
            return {
                data: 'start'
            };
        };
    }


    // --------------------------------------------------
    // UserModel provider returns a constructor.
    //
    // Constructors make distinct objects and so basically the UserModel that is injected into controller is a seperate
    // instance each time.
    //
    // this.$get Closure returns a constructor ***function(){ this.data = 'start';};***
    // --------------------------------------------------
    function ThreeAController(UserModelProvider){
        var vm = this;
        vm.user = new UserModelProvider();
    }

    function ThreeBController(UserModelProvider){
        var vm = this;
        vm.user = new UserModelProvider();
    }

    function UserModelProvider(){
        this.$get = function() {
            return function() {
                this.data = 'start';
            };
        };
    }

    // --------------------------------------------------
    // CachedUserModel provider looks up the user by id and returns the same one, if it's already been
    // instantiated. The two models are kept in sync.
    //
    // This design now means we are able to dynamically inject the user model into the controller and allow for multiple
    // User models.
    //
    // Caching the models is good practice as if the data has been returned from a service like $http, this means that
    // we do not need to repeat this procedure.
    // --------------------------------------------------
    function FourAController(CachedUserModelProvider){
        var vm = this;
        vm.user = new CachedUserModelProvider(1);
    }

    function FourBController(CachedUserModelProvider){
        var vm = this;
        vm.user = new CachedUserModelProvider(2);
    }

    function FourCController(CachedUserModelProvider){
        var vm = this;
        vm.user = new CachedUserModelProvider(1);
    }

    function FourDController(CachedUserModelProvider){
        var vm = this;
        vm.user = new CachedUserModelProvider(2);
    }

    /*function CachedUserModelProvider(){
        this.$get = function() {
            var User = function (id) {
                if (User.cached[id]) {
                    return User.cached[id];
                }
                this.data = 'start';
                User.cached[id] = this;
            };

            // this will reset any previous caches.  It is not able to overwrite the newly created User.cached[id] that
            // has been declared within the User var Closure function.
            User.cached = {};
            return User;
        };
    }*/

    /* The below sliding_animation is the same, just included to show how console.log was used in helping understand the logic
*/
    function CachedUserModelProvider(){
        this.$get = function() {
            var User = function (id) {
                if (User.cached[id]) {
                    console.log(id, 'from the cache');
                    return User.cached[id];
                }
                this.data = 'start';
                User.cached[id] = this;
                console.log(id, 'newly created inside User Closure');
            };

            // this will reset any previous caches.  Note that the var User Closure is called after this so this is the
            // first thing called and will first clean everything up.
            User.cached = {};
            console.log('after cache reset');
            return User;
        };

        // console results:
        //
        // after cache reset
        // 1 "newly created inside User Closure"
        // 2 "newly created inside User Closure"
        // 1 "from the cache"
        // 2 "from the cache"
        //
    }

})();

