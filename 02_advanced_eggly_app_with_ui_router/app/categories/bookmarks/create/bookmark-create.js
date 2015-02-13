angular.module("categories.bookmarks.create",[

])
    .config(function($stateProvider){
        $stateProvider
            .state('eggly.categories.bookmarks.create',{
                url: '/bookmarks/create',
                templateUrl: 'angularjs/02_advanced_eggly_app_with_ui_router/app/categories/bookmarks/create/bookmark-create.html',
                controller: 'CreateBookmarkController as createBookmarkVm'
            })
        ;
    })
    .controller('CreateBookmarkController', function($state, $stateParams, BookmarksModel){
        var vm = this;

        function returnToBookmarks(){
            $state.go('eggly.categories.bookmarks',{
                category: $stateParams.category
            })
        }

        function cancelCreating(){
            returnToBookmarks();
        }

        function createBookmark(bookmark){
            BookmarksModel.createBookmark(bookmark);
            returnToBookmarks();
        }

        function resetForm(){
            vm.newBookmark = {
                title: '',
                url: '',
                category: $stateParams.category
            }
        }

        vm.cancelCreating = cancelCreating;
        vm.createBookmark = createBookmark;

        resetForm();

    })
;