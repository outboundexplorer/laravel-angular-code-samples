<!DOCTYPE html>
<!-- /angularjs/sandbox/test01.php -->
<html>
<head>
    <meta charset="utf-8">
    <title>AngularJS test</title>

    <script src="/bower_components/angular/angular.min.js"></script>
    <script src="/angularjs/06_caching_the_model_instance/app.js"></script>
    <link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div ng-app="app">

    <div class="row" style="padding: 0px 40px 0px 40px">
        <h2>All controllers are siblings in this example.</h2>

        <hr/>

        <h4>(1A+1B) Object Literals: Isolated changes to data model and no sync.</h4>
        <div ng-controller="OneAController as oneAVm">
            <input ng-model="oneAVm.user.data">
            {{oneAVm.user.data}}
            <div updater user="oneAVm.user"></div>
        </div>
        <div ng-controller="OneBController as oneBVm">
            <input ng-model="oneBVm.user.data">
            {{oneBVm.user.data}}
            <div updater user="oneBVm.user"></div>
        </div>

        <br>
        <hr/>

        <h4>(2A+2B) Same Object Retrieved with injected Provider</h4>
        <div ng-controller="TwoAController as twoAVm">
            <input ng-model="twoAVm.user.data">
            {{twoAVm.user.data}}
            <div updater user="twoAVm.user"></div>
        </div>
        <div ng-controller="TwoBController as twoBVm">
            <input ng-model="twoBVm.user.data">
            {{twoBVm.user.data}}
            <div updater user="twoBVm.user"></div>
        </div>

        <br/>
        <hr/>

        <h4>(2C+2D) Same Object Retrieved with injected Service</h4>
        <div ng-controller="TwoCController as twoCVm">
            <input ng-model="twoCVm.user.data">
            {{twoCVm.user.data}}
            <div updater user="twoCVm.user"></div>
        </div>
        <div ng-controller="TwoDController as twoDVm">
            <input ng-model="twoDVm.user.data">
            {{twoDVm.user.data}}
            <div updater user="twoDVm.user"></div>
        </div>

        <br/>
        <hr/>

        <h4>(2E+2F) Same Object Retrieved with injected Factory</h4>
        <div ng-controller="TwoEController as twoEVm">
            <input ng-model="twoEVm.user.data">
            {{twoEVm.user.data}}
            <div updater user="twoEVm.user"></div>
        </div>
        <div ng-controller="TwoFController as twoFVm">
            <input ng-model="twoFVm.user.data">
            {{twoFVm.user.data}}
            <div updater user="twoFVm.user"></div>
        </div>

        <br/>
        <hr/>


        <h4>(3A+3B)Same data initially retrieved, but not synced as injected seperate instances of UserModelProvider</h4>
        <div ng-controller="ThreeAController as threeAVm">
            <input ng-model="threeAVm.user.data">
            {{threeAVm.user.data}}
            <div updater user="threeAVm.user"></div>
        </div>
        <div ng-controller="ThreeBController as threeBVm">
            <input ng-model="threeBVm.user.data">
            {{threeBVm.user.data}}
            <div updater user="threeBVm.user"></div>
        </div>

        <br/>
        <hr/>


        <h2>(4A+4B+4C+4D)Best practice for models:</h2>
        <h4>4A + 4C are same instance CachedUserModelProvider, 4B + D are also same instance</h4>
        <div ng-controller="FourAController as fourAVm">
            <input ng-model="fourAVm.user.data">
            {{fourAVm.user.data}}
            <div updater user="fourAVm.user"></div>
        </div>
        <div ng-controller="FourBController as fourBVm">
            <input ng-model="fourBVm.user.data">
            {{fourBVm.user.data}}
            <div updater user="fourBVm.user"></div>
        </div>
        <div ng-controller="FourCController as fourCVm">
            <input ng-model="fourCVm.user.data">
            {{fourCVm.user.data}}
            <div updater user="fourCVm.user"></div>
        </div>
        <div ng-controller="FourDController as fourDVm">
            <input ng-model="fourDVm.user.data">
            {{fourDVm.user.data}}
            <div updater user="fourDVm.user"></div>
        </div>
    </div>
</div>
</body>
</html>