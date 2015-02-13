<!doctype html>
<html ng-app="eggly">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Eggly</title>
    <link rel="stylesheet" href="/angularjs/02_advanced_eggly_app_with_ui_router/assets/css/normalize.css">
    <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/angularjs/02_advanced_eggly_app_with_ui_router/assets/css/eggly.css">
    <link rel="stylesheet" href="/angularjs/02_advanced_eggly_app_with_ui_router/assets/css/animations.css">
    <script src="/bower_components/jquery/dist/jquery.min.js"></script>
    <script src="/bower_components/lodash/lodash.min.js"></script>
    <script src="/bower_components/angular/angular.min.js"></script>
    <script src="/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="/bower_components/angular-animate/angular-animate.min.js"></script>
    <script src="/angularjs/02_advanced_eggly_app_with_ui_router/app/app.js"></script>
    <script src="/angularjs/02_advanced_eggly_app_with_ui_router/app/categories/bookmarks/create/bookmark-create.js"></script>
    <script src="/angularjs/02_advanced_eggly_app_with_ui_router/app/categories/bookmarks/edit/bookmark-edit.js"></script>
    <script src="/angularjs/02_advanced_eggly_app_with_ui_router/app/categories/bookmarks/bookmarks.js"></script>
    <script src="/angularjs/02_advanced_eggly_app_with_ui_router/app/categories/categories.js"></script>
    <script src="/angularjs/02_advanced_eggly_app_with_ui_router/app/common/models/category-model.js"></script>
    <script src="/angularjs/02_advanced_eggly_app_with_ui_router/app/common/models/bookmark-model.js"></script>
</head>
<body ng-cloak>
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3 col-md-2 sidebar" ui-view="categories">

        </div> <!-- filter:{category:currentCategory.name}" -->
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" ui-view="bookmarks">
        </div>
    </div>
</div>

</body>
</html>