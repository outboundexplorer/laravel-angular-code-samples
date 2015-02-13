angular.module('eggly.models.categories',[

])
    .service('CategoriesModel', function($http, $q){
        var model = this;
        var URLS = {
            FETCH: '/angularjs/02_advanced_eggly_app_with_ui_router/data/categories.json'
        };
        var categories;
        var currentCategory;

        /*
        The data returned from the $http resquest contains the following object map:
        {data: Array[4], status: 200, headers: function, config: Object, statusText: "OK"}
         As we are only wanting to work with the data, we need to extract this from the the result.
         */
        function extract(result){
            return result.data;
        }

        function cacheCategories(result){
            categories = extract(result);
            return categories;
        }

        /******REPLACED
        Of course we could have used a single function to retrieve the data and assign this to categories.  But by
        doing it this way we may have coupled our code too tightly that will affect the way we are able to implement
        this function further down the road??

        function cacheCategories(result){
            categories = result.data;
            return categories;
        }
        ******/



        /******REPLACED
         * Simple version that will use the $http service every time.   Note that we have not used this version
         * as we are using $q service for promises to be able to first check for whether there already exists the cached
         * data results and therefore reducing the need for a trip to the server.
         *
        model.getCategories = function(){
            return $http
                    .get(URLS.FETCH)
                    .then(cacheCategories);
        };
        ******/

        /******NOTES ON FUNCTION CALLS
        In the $http service call shown above and below.
                $http
                    ...
                    .then(cacheCategories);

        If this was written out in full and we were not passing in a function it would be:

                $http
                    ...
                    .then(function(){
                               categories = result.data;
                               return categories;
                    });

        What is important to note here is that we are passing in a closure and not passing in the result of the function.
        In other words, we are passing the function logic into the .then() method, we are not passing in the result.
        */

         /*
        In the model.getCategories() method, we are using the option of returning a promise if the categories
        data is already defined.
        */
        model.getCategories = function(){

            // first of all we check whether the categories is already defined.  If categories already exists then
            // return a promise object with the categories.  If the categories is not defined then we use the $http
            // service to carry out an AJAX request to the server.  Note that we are not passing in the results of
            // the cacheCategories function to the .then method, we are passing in a closure.
            return (categories) ? $q.when(categories)
                                : $http.get(URLS.FETCH).then(cacheCategories);
        };

        model.setCurrentCategory = function(categoryName){
            return model.getCategoryByName(categoryName)
                .then(function(category){
                    currentCategory = category;
                })
        };

        model.getCurrentCategory = function(){
            return currentCategory;
        };

        model.getCurrentCategoryName = function(){
            return currentCategory  ? currentCategory.name
                                    : '';
        };

        model.getCategoryByName = function(categoryName){

            // create a deferred object by using $q.defer()
            var deferred = $q.defer();

            function findCategory(){
                return _.find(categories, function(c){
                    return c.name == categoryName;
                })
            }

            // if categories exists then we are going to resolve using the deferred object.  If categories has not been
            // defined then we will call the getCategories() method and once that has been successfully defined we can
            // then proceed to resolve the deferred object.
            if (categories){
                deferred.resolve(findCategory());
            } else {
                model.getCategories()
                    .then(function(result){
                        deferred.resolve(findCategory());
                    })
            }

            // return the promise object on the deffered object
            return deferred.promise;

        }

    })
;