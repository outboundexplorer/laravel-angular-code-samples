(function(){
        'use strict';

    // angularjs/testbox/app.js
        angular.module('multiple-requests', [])
            .controller('AppController', AppController)
            .service('Github', GithubService)
        ;

        function AppController(Github) {
            var app = this;

            Github.getAngularInfo()
                .then(function (angularInfo) {
                    console.log('angularInfo',angularInfo);
                    app.angularInfo = angularInfo;
                })
            ;
        }

        // Github is a data model that allows us to access the github information for a single Github account
        function GithubService($http, $q) {
            var github = this;
            var ANGULAR_USER = 'https://api.github.com/users/angular';
            var ANGULAR_REPOS = 'https://api.github.com/users/angular/repos';
            var ANGULAR_EVENTS = 'https://api.github.com/users/angular/events';

            function getUserData () {
                return $http
                    .get(ANGULAR_USER)
                    .then(function(responseData) {
                        // console.log('response data: ',responseData);
                        return {
                            name: responseData.data.name,
                            avatarUrl: responseData.data.avatar_url,
                            repoCount: responseData.data.public_repos
                        };
                    })
                    ;
            };

            // By assigning the getUserData method to the github model, we are now able to test this in isolation as we
            // will now be able to call this method from outside of the Github service.  Note that in the original video
            // the author has left the sliding_animation as ***github.getUserData = function getUserData()***.  There does not seem
            // to be anything wrong with this, but so far it does not seem like common practice.  It would seem as though
            // the original author had in fact forgotten to remodify this or felt that this was irrelevant.
            github.getUserData = function () {
                return $http
                    .get(ANGULAR_USER)
                    .then(function(responseData) {
                        return {
                            name: responseData.data.name,
                            avatarUrl: responseData.data.avatar_url,
                            repoCount: responseData.data.public_repos
                        };
                    })
                    ;
            };

            github.getUserRepos = function () {
                return $http
                    .get(ANGULAR_REPOS)
                    .then(function (reposData) {


                        // The lodash _.map() will iterate through the target collection of objects (reposData.data) and
                        // when used with a function for the second parameter, it will perform that function for each
                        // iteration.  In this case, it passes the data from the current iteration and then returns an
                        // object with the properties mapped to the values as shown below.
                        return _.map(reposData.data, function (data) {
                            return {
                                name: data.name,
                                description: data.description,
                                stars: data.stargazers_count,
                                forks: data.forks_count,
                                isFork: data.fork
                            }
                        });

                    })
                    ;
            };

            github.getUserEvents = function () {
                return $http
                    .get(ANGULAR_EVENTS)
                    .then(function (eventsData) {
                        return _.map(eventsData.data, function (data) {
                            return {
                                type: data.type,
                                user: data.actor.login,
                                avatarUrl: data.actor.avatar_url,
                                createdOn: data.created_at,
                                repo: data.repo.name
                            }
                        });
                    })
                    ;
            };

            github.getAngularInfo = function () {
                var userPromise = github.getUserData();
                console.log('userPromise: ',userPromise); // Promise object
                var userEventsPromise = github.getUserEvents();
                console.log('userEventsPromise', userEventsPromise); // Promise object
                var userReposPromise = github.getUserRepos();
                console.log('userReposPromise',userReposPromise);

                return $q.all([userPromise, userEventsPromise, userReposPromise])
                    .then(function(resultArray) {
                        var userData = resultArray[0];
                        var userEventsData = resultArray[1];
                        var userReposData = resultArray[2];

                        console.log('resultArray',resultArray); // [Object, Array[30],Array[30]]
                        console.log('userData',userData); // Object {name: "...", avatarUrl: "...", repoCount: 85}
                        console.log('userEventsData',userEventsData); //Array[30] ~ [Object, Object, Object...]
                        console.log('userReposData',userReposData);// Array[30] ~ [Object, Object, Object....]



                        // The data returned from Github is inconsistent for creating a single object that we can use
                        // to perform useful tasks on within our other parts of the application.  The data is returned
                        // as an object and two arrays of objects.  We can use the lodash function _.extend() to append the
                        // two arrays to become properties on the userData object.
                        var extendedObject = _.extend(userData, {
                            events: userEventsData,
                            repos: userReposData
                        });

                        console.log('extendedObject', extendedObject);
                        //Object {name: "...", avatarUrl: "...", repoCount: 85, events: Array[30], repos: Array[30]}

                        return extendedObject;
                    });
            }
        }

    })();

