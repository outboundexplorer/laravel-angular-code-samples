<!doctype html>
<html ng-app="myApp">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Eggly</title>
    <link rel="stylesheet" href="/angularjs/03_basic_eggly_app_using_ng_if_for_showing_forms/assets/css/normalize.css">
    <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/angularjs/03_basic_eggly_app_using_ng_if_for_showing_forms/assets/css/eggly.css">
    <link rel="stylesheet" href="/angularjs/03_basic_eggly_app_using_ng_if_for_showing_forms/assets/css/animations.css">
    <script src="/bower_components/jquery/dist/jquery.min.js"></script>
    <script src="/bower_components/lodash/lodash.min.js"></script>
    <script src="/bower_components/ng-stats/dist/ng-stats.js"></script>
    <script src="/bower_components/angular/angular.min.js"></script>
    <script src="/angularjs/03_basic_eggly_app_using_ng_if_for_showing_forms/app.js"></script>
</head>
<body ng-cloak ng-controller="MainController">
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
            <a href="#" ng-click="setCurrentCategory(null)"><img class="logo" src="/angularjs/03_basic_eggly_app_using_ng_if_for_showing_forms/assets/image/eggly-logo.png"></a>
            <ul class="nav nav-sidebar">
                <!--
                We can use ng-class="{'active':isCurrentCategory(category)}" in order to indicate which
                menu item we are current looking at
                -->
                <li ng-repeat="category in categories" ng-class="{'active':isCurrentCategory(category)}">
                    <a href="#" ng-click="setCurrentCategory(category)">{{category.name}}</a>
                </li>
            </ul>
        </div> <!-- filter:{category:currentCategory.name}" -->
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div ng-class="{'active':isSelectedBookmark(bookmark.id)}"
                 ng-repeat="bookmark in bookmarks | filter:{category:currentCategory.name}:exceptEmptyComparator">
                <button type="button" ng-click="deleteBookmark(bookmark)" class="close">&times;</button>

                <!-- the button will allow two functions to be called when actioned.
                Firstly, we will call the setEditedBookmark(bookmark)function which will assign the current
                bookmark to the $scope.editedBookma rk.
                Secondly, the startEditing() function will be called to set the state to show the editor form.
                -->
                <button type="button" ng-click="setEditedBookmark(bookmark);startEditing()" class="btn btn-link">
                    <span class="glyphicon glyphicon-pencil"></span>
                </button>
                <a href="{{bookmark.url}}" target="_blank">{{bookmark.title}}</a>
            </div>
            <hr/>

            <!-- CREATING -->
            <!-- we use the ng-if="showCreator()" statement to add or remove this div from the DOM
                 We have set this up so that once we are inside a category, it will automatically show the
                 'Create a Boomark' button.
                 We can then use a second ng-if to actually enter the Create a Bookmark form -->
            <div ng-if="showCreator()">
                <button type="button" class="btn btn-link" ng-click="startCreating()">
                    <span class="glyphicon glyphicon-plus"></span>
                    Create a Bookmark
                </button>
                <form class="create-form" ng-show="isCreating" role="form" ng-submit="createBookmark(newBookmark)">
                    <div class="form-group">
                        <label for="newBookmarkTitle">Bookmark Title</label>
                        <input type="text" class="form-control" id="newBookmarkTitle" ng-model="newBookmark.title"/>
                    </div>
                    <div class="form-group">
                        <label for="newBookmarkURL">Bookmark URL</label>
                        <input type="text" class="form-control" id="newBookmarkURL" ng-model="newBookmark.url"/>
                    </div>
                    <button type="submit" class="btn btn-info btn-lg">
                        Create
                    </button>
                    <button type="button" class="btn btn-default btn-lg pull-right" ng-click="cancelCreating()">
                        Cancel
                    </button>
                </form>
            </div >

            <!-- EDITING -->
            <!-- we use the ng-if="showEditor()" statement to add or remove this div from the DOM -->
            <div ng-show="showEditor()">
                <h4>Editing {{editedBookmark.title}}</h4>
                <form class="edit-form" role="form" ng-submit="updateBookmark(editedBookmark)" novalidate>
                    <div class="form-group">
                        <label for="editedBookmarkTitle">Bookmark Title</label>
                        <input type="text" class="form-control" id="editedBookmarkTitle"
                               ng-model="editedBookmark.title" placeholder="Enter title"/>
                    </div>
                    <div class="form-group">
                        <label for="editedBookmarkURL">Bookmark URL</label>
                        <input type="text" class="form-control" id="editedBookmarkURL"
                               ng-model="editedBookmark.url" placeholder="Enter url"/>
                    </div>
                    <button type="submit" class="btn btn-info btn-lg">
                        Save
                    </button>
                    <button type="button" class="btn btn-default btn-lg pull-right" ng-click="cancelEditing()">
                        Cancel
                    </button>
                </form>
            </div>
            <div angular-stats
                 watch-count=".watch-count"
                 digest-length=".digest-length">
                <h2>Angular Stats</h2>
                Watch Count: <span class="watch-count"></span><br />
                Digest Cycle Length: <span class="digest-length"></span>
            </div>
        </div>
    </div>
</div>

</body>
</html>