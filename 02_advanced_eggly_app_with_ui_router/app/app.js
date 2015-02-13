angular.module('eggly',[
    'ui.router',
    'ngAnimate',
    'categories.bookmarks',
    'categories'
])
.config(function($stateProvider, $urlRouterProvider){

    /*
    Define a top-level abstract state that defines the base layout and also any additional information that you want the
    child states to draw from.  Below we have created a state that can be used as a starting point for the additional
    states that we are going to define.  We define an abstract state by setting abstract: true
     */
    $stateProvider
        .state('eggly', {
            url: '',
            abstract: true
        })
    ;

    /*
    We are also using $urlRouterProvider to set up a fallback to redirect the user
     */
    $urlRouterProvider.otherwise('/');
})
    /*.controller('MainController', function($scope, $state){


        /*
         In the original demo of this code, the objects on the $scope were created in the following way.  However,
         this would appear to be JSON syntax.  As these are just standard javascript objects, this would suggest that
         there is no need for double quotes around the object key.  However, as this data is often returned from the
         server in JSON format, it is goot to see how it can work both ways.

         $scope.categories = [
                {"id": 0, "name": "Development"},
                {"id": 1, "name": "Design"}
         ];
         */

/*

        $scope.currentCategory = null;

        /*
         {{ filter_expression | filter : expression : comparator}}

         exceptEmptyComparator will allow us to return results from undefined values.  As when the currentCategory.name
         is undefined, the filter will not return any matches.  Instead, when the currentCategory.name
         (i.e. the expected parameter) is undefined, we want to return true (that is return all elements).  If the
         currentCategory.name is defined, then we want to perform a strict match and only return those items where the
         expected result, matches the actual dataset.
         */
  /*      $scope.exceptEmptyComparator = function(actual,expected){
            if (expected === undefined) {
                return true;
            }
            return angular.equals(actual, expected);
        };



        /*
         If we define the function as shown below.  We must then add this to the scope in order to make the function
         public and available to the view. If we do not use this, the method is private and only accessible
         from within this script.

         Alternatively, we could have directly defined the function on the $scope as shown below.

         $scope.setCurrentCategory = function(category){
            $scope.currentCategory = category;
         };

         In addition to the original code, i was getting an error when i clicked on the 'Eggly' icon.  I think that
         this is because, by clicking on the setCurrentCategory when there is no category to pass into the function,
         then category is undefined and will return an error.  By checking for this, we can instead simply set the
         current category to null, which will therefore allow our filter function to work with this null value by using
         our myComparer() function.

         function setCurrentCategory(category){
            if (angular.isUndefined(category)){
                $scope.currentCategory = null;
            } else {
                $scope.currentCategory = category;
            }
         }

         Alternatively, we could have set this to null by using a resetCategory() function as shown here:

         $scope.resetCategory = function(){
            $scope.currentCategory = null;
         };

         Alternatively, we could just simply change the ng-click directive:
         ng-click="setCurrentCategory(null)"

         */
    /*    function setCurrentCategory(category){
            $scope.currentCategory = category;

            // This is one method of going to the target state.  The first parameter of the $state.go() method
            // is the target state.  The second parameter is an object map of the parameter that we are passing in.
            // When i was using this, two issues that i found were that the mouse icon hand for clicking disappeared
            // when using $state.go.  Also, when i clicked on the Eggly Logo, that last valid category was still
            // indicated at the top.  But this could easily be sorted by removing the <h1> tags from the
            // bookmarks.html file.
            // Note that when we used ui-sref directive in the category.html file, we were able to show the proper
            // mouse icon (little hand) for clickable events.
            //
            //$state.go('eggly.categories.bookmarks', {category:category.name});

            // If we have started editing or creating within a category and we then click another category,
            // the editing/creating window will still be open and this is now incorrect.  When we click another
            // category, we are calling the setCurrentCategory(category) button, so if we add the cancelCreating()
            // and cancelEditing() here, then we will not have this problem.  Of course in a new application, it
            // might seem appropriate to also perform some other actions such as saving the data or warning the
            // user that they have not saved their work.
            cancelCreating();
            cancelEditing();
        }



        function isCurrentCategory(category){
            return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }

        $scope.setCurrentCategory = setCurrentCategory;
        $scope.isCurrentCategory = isCurrentCategory;



        //--------------------------------------------------------------------------------------------------------------
        // CREATING AND EDITING STATES
        //--------------------------------------------------------------------------------------------------------------

        // These two variables are used to set up some default states
        $scope.isCreating = false;
        $scope.isEditing = false;

        // Below are some convenience methods to manage the isCreating and isEditing variables.


        // Ensure that we are only creating and not editing
        function startCreating(){
            $scope.isCreating = true;
            $scope.isEditing = false;

            // reset the createForm and make sure that we have the most current currentCategory
            resetCreateForm();
        }

        function cancelCreating(){
            $scope.isCreating = false;
        }

        // Ensure that we are only editing and not creating
        function startEditing(){
            $scope.isCreating = false;
            $scope.isEditing = true;
        }

        function cancelEditing(){
            $scope.isEditing = false;
            $scope.setEditedBookmark(null);
        }

        /*
        The shouldShowCreating() function will return true when both of the requirements are met.
        $scope.currentCategory must be defined && $scope.isEditing is set to false
         */
      /*  function showCreator(){
            return $scope.currentCategory && !$scope.isEditing;
        }

        /*
         The shouldShowEditing() function will return true when both of the requirements are met.
         $scope.isEditing is set to true && $scope.isCreating is set to false
         */
       /* function showEditor(){
            return $scope.isEditing && !$scope.isCreating;
        }

        $scope.startCreating = startCreating;
        $scope.cancelCreating = cancelCreating;
        $scope.startEditing = startEditing;
        $scope.cancelEditing = cancelEditing;
        $scope.showEditor = showEditor;
        $scope.showCreator = showCreator;


        //--------------------------------------------------------------------------------------------------------------
        // CRUD
        //--------------------------------------------------------------------------------------------------------------

        // This is a private function that is not available on the view
        function resetCreateForm(){
            $scope.newBookmark = {
                title: '',
                url: '',
                category: $scope.currentCategory.name
            }
        }

        $scope.createBookmark = function(bookmark){

            // we need to establish a unique ID for the new bookmark, as so far this project is not complicated, we
            // can just use the length to establish a unique ID.  In a real project, we would need to use a far more
            // advanced method.
            bookmark.id = $scope.bookmarks.length;

            // we have now created an object with the properties of title, url, category and id.
            // We can now push this object to the $scope.bookmarks array.
            $scope.bookmarks.push(bookmark);

            // reset the create form so that the next time we have a new bookmark, there are no persistent values.
            resetCreateForm();
        };

        $scope.editedBookmark = null;

        /*
        If we do not use a copy of the bookmark when we are editing, as the information in the editor is bound
        to $scope, what happens is that the bookmark object within the bookmarks collection is immediately modified.
        Perhaps this is not a problem, but if the user decides to cancel the editor.  This will simply remove the
        editing state from the application and hide and reset the editing form.  Any changes that have been made have
        already modified the selected bookmark object and this is a problem.  If however, we make a copy of the
        bookmark object, we can make our changes within the copy and once we are happy with the changes then push them
        back to the main collection and overwrite the original target object.
         */
       /* $scope.setEditedBookmark =  function(bookmark){
            $scope.editedBookmark = angular.copy(bookmark);
        };


        /*
        When we have finished editing our copy of the bookmark in the editor, we can use lodash to loop through the
        $scope.bookmarks array and find the index position where b.id (the bookmark in the bookmarks array) and
        bookmark.id (the copy of bookmark currently in the editor) are equivalent.  Once we know the index in the
        $scope.bookmarks array where the copy bookmark should be put back, we can simply pass it back.
         */
       /* $scope.updateBookmark =  function(bookmark){
            var index = _.findIndex($scope.bookmarks, function(b){
                return b.id == bookmark.id;
            });

            $scope.bookmarks[index] = bookmark;

            // perform a little cleaning
            $scope.editedBookmark = null;
            $scope.isEditing = false;
        };

        /*
        This will return true so long as the two criteria have been met:
        1) $scope.editedBookmark !== null (a bookmark has been selected for editing)
        2) $scope.editedBookmark.id === bookmarkId (the currently being edited bookmark matches the current bookmark)
         */
      /*  function isSelectedBookmark(bookmarkId){
            return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
        }
        $scope.isSelectedBookmark = isSelectedBookmark;

        /*
        This is using the lodash _.remove method to loop through the $scope.bookmarks array and and remove the bookmark
        from the collection if the bookmark.id that is passed into the deleteBookmark(bookmark) function matches the
        b.id from iterating the $scope.bookmarks collection.  Note that we could have labeled 'b' anything.  A good
        practice might be to use the initial letter of the target object.
         */
      /*  function deleteBookmark(bookmark){
            _.remove($scope.bookmarks, function(b){
                return b.id == bookmark.id;
            });
        }
        $scope.deleteBookmark = deleteBookmark;

    })
*/
;
