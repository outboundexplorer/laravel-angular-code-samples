<!DOCTYPE html>
<html ng-app="website" ng-cloak>
    <head>
        <meta charset="utf-8">
        <title>Egghead.io - Greensock TimelineLite</title>

        <link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/angularjs/01_sliding_animation_with_background_and_avatar/styles/timeline.greensock.css">
        <script src="/bower_components/jquery/dist/jquery.min.js"></script>
        <script src="/bower_components/angular/angular.min.js"></script>
        <script src="/bower_components/angular-animate/angular-animate.min.js"></script>
        <script src="/bower_components/greensock/src/minified/TweenMax.min.js"></script>
        <script src="/angularjs/01_sliding_animation_with_background_and_avatar/js/timeline.greensock.js"></script>
    </head>

    <body ng-controller="MainCtrl">

        <div class="slider">
            <div ng-repeat="slide in slides"
                 ng-hide="!isCurrentSlideIndex($index)"
                 class="slide slide-animation">
                <img class="nonDraggableImage" ng-src="{{slide.bg}}">
                <img class="nonDraggableImage avatar" ng-src="{{slide.avatar}}">
                <h1 class="title"><span>{{slide.title}}</span></h1>
                <h3 class="subtitle"><span>{{slide.subtitle}}</span></h3>
            </div>
        </div>

        <div class="nav">
            <div ng-repeat="slide in slides"
                 ng-class="{'active':isCurrentSlideIndex($index)}"
                 ng-click="setCurrentSlideIndex($index)">
                <h3>{{slide.title}}</h3>
            </div>
        </div>
    </body>
</html>