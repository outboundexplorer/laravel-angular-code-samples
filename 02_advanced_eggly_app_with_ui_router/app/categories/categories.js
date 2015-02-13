angular.module('categories',[
    'eggly.models.categories'
])
    .config(function($stateProvider){
        $stateProvider
            .state('eggly.categories',{
                url: '/',
                views: {
                    // by using 'categories@' we are absolutely targetting the 'categories' view in root unnamed state.
                    'categories@': {
                        controller: 'CategoriesListController as categoriesListVm',
                        templateUrl: 'angularjs/02_advanced_eggly_app_with_ui_router/app/categories/categories.html'
                    },
                    'bookmarks@':{
                        controller: 'BookmarksListController as bookmarksListVm',
                        templateUrl: 'angularjs/02_advanced_eggly_app_with_ui_router/app/categories/bookmarks/bookmarks.html'
                    }
                }
            })
        ;
    })

    /*
    By injecting the CategoriesModel into the controller, we are able to remove the coupling with how this data is
    actually retrieved from the database or the cache.  All the controller cares about is that it is able to access
    the categories. It does this using the CategoriesModel.getCategories() method.
     */
    .controller('CategoriesListController', function (CategoriesModel){
        var vm = this;

        CategoriesModel.getCategories()
            .then(function(result){
                vm.categories = result;
                console.log('result', result);
            })
        ;
    })




    /*****
     We could have just simply specified that the $http request be carried out here in the controller, and directly
     defined the categoriesListScope using the $http service here within the controller.  The drawback to this method
     though is that the controller is tightly bound to the retrieval of the data from the database.

    .controller('CategoriesListController', function ($http){
        var categoriesListScope = this;

        $http
            .get('/angularjs/02_advanced_eggly_app_with_ui_router/data/categories.json')
            .then(function(result){
                categoriesListScope.categories = result.data;
            })
        ;
    })
    *****/

;