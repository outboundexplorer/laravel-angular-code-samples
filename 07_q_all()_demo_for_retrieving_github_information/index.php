<!DOCTYPE html>
<!-- /angularjs/sandbox/test01.php -->
<html ng-app="multiple-requests">
<head lang="en">
    <meta charset="UTF-8">
    <title>AngularJS Multiple HTTP Requests</title>
    <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css"/>
</head>
<body ng-controller="AppController as appVm">

<div class="container">
    <h2>{{appVm.angularInfo.name}}</h2>
    <div class="row">
        <div class="col-md-2">
            <img ng-src="{{appVm.angularInfo.avatarUrl}}" class="img-responsive"/>
        </div>
        <div class="col-md-10">
            <div class="col-md-6">
                <h3>Repos</h3>
                <div class="list-group">
                    <a ng-repeat="repo in appVm.angularInfo.repos" class="list-group-item">
                        {{repo.name}}
                    </a>
                </div>
            </div>
            <div class="col-md-6">
                <h3>Events</h3>
                <div class="list-group">
                    <a ng-repeat="event in appVm.angularInfo.events" class="list-group-item">
                        {{event.type}}
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/bower_components/lodash/lodash.min.js"></script>
<script src="/bower_components/angular/angular.js"></script>
<script src="/angularjs/07_q_all()_demo_for_retrieving_github_information/app.js"></script>
</body>
</html>