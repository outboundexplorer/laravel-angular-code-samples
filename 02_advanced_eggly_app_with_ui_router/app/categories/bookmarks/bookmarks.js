angular.module('categories.bookmarks',[
    'eggly.models.bookmarks',
    'eggly.models.categories',
    'categories.bookmarks.create',
    'categories.bookmarks.edit'
])
    .config(function($stateProvider){
        $stateProvider
            .state('eggly.categories.bookmarks', {
                url: 'categories/:category',
                views: {
                    'bookmarks@':{
                        templateUrl: '/angularjs/02_advanced_eggly_app_with_ui_router/app/categories/bookmarks/bookmarks.html',
                        controller: 'BookmarksListController as bookmarksListVm'
                    }
                }
            })
        ;
    })
    .controller('BookmarksListController', function($stateParams, BookmarksModel, CategoriesModel){
        // As we have injected $stateParams into this function, we now have access to the property as defined
        // on the url by 'categories/:category'
        var vm = this;

        CategoriesModel.setCurrentCategory($stateParams.category);

        BookmarksModel.getBookmarks()
            .then(function(result){
                vm.bookmarks = result;
            })
        ;

        function isSelectedBookmark(bookmarkId){
            return vm.editedBookmark !== null && vm.editedBookmark.id === bookmarkId;
        }
        vm.isSelectedBookmark = isSelectedBookmark;

        vm.getCurrentCategory = CategoriesModel.getCurrentCategory;
        vm.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
        vm.deleteBookmark = BookmarksModel.deleteBookmark;
    })
;
