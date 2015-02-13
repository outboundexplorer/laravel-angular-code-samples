<!DOCTYPE html>
<!-- /angularjs/sandbox/test01.php -->
<html ng-app="app">
<head>
    <title> AngularJS</title>
    <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css">
</head>
<body>

<div class="container">

    <!-- Header -->
    <div ui-view="header" class="row"></div>

This should be the header
<div class="row">
    <!-- Sidebar/Nav -->
    <div ui-view="sidebar" class="col-xs-3"></div>
<!-- Content -->
<div ui-view="content" class="col-xs-9"></div>
</div>

<!-- Footer -->
<div ui-view="footer" class="row"></div>
</div>

<!-- compiled JavaScript -->
    <!-- Note angular script must be included before angular-ui-router script -->
    <script type="text/javascript" src="/bower_components/angular/angular.min.js"></script>
    <script type="text/javascript" src="/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script type="text/javascript" src="/angularjs/05_using_ui_router_to_switch_templates/app.js"></script>
    <script type="text/javascript" src="/angularjs/05_using_ui_router_to_switch_templates/alt-one/alt-one.js"></script>
    <script type="text/javascript" src="/angularjs/05_using_ui_router_to_switch_templates/alt-two/alt-two.js"></script>
    <script type="text/javascript" src="/angularjs/05_using_ui_router_to_switch_templates/alt-three/alt-three.js"></script>
</body>
</html>