angular.module('categories.bookmarks.edit',[

])
    .config(function($stateProvider){
        $stateProvider
            .state('eggly.categories.bookmarks.edit',{
                url:'/bookmarks/:bookmarkId/edit',
                templateUrl: 'angularjs/02_advanced_eggly_app_with_ui_router/app/categories/bookmarks/edit/bookmark-edit.html',
                controller: 'EditBookmarkController as editBookmarkVm'
            })
        ;
    })
    .controller('EditBookmarkController',function($state, $stateParams, BookmarksModel){

        var vm = this;

        function returnToBookmarks(){
            $state.go('eggly.categories.bookmarks', {
                category: $stateParams.category
            })
        }

        function cancelEditing(){
            returnToBookmarks();
        }

        BookmarksModel.getBookmarkById($stateParams.bookmarkId)
            .then(function(bookmark){
                if(bookmark){
                    vm.bookmark = bookmark;
                    vm.editedBookmark = angular.copy(vm.bookmark);
                } else {
                    returnToBookmarks();
                }

            })
        ;

        function updatedBookmark(){
            vm.bookmark = angular.copy(vm.editedBookmark);
            BookmarksModel.updateBookmark(vm.bookmark);
            returnToBookmarks();
        }

        vm.cancelEditing = cancelEditing;
        vm.updateBookmark = updatedBookmark;

    })
;