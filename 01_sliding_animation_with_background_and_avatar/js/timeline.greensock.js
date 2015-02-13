angular.module('website', ['ngAnimate'])
    .controller('MainCtrl', function ($scope) {
        $scope.slides = [
            {   bg: '/angularjs/01_sliding_animation_with_background_and_avatar/images/bg3.jpg',
                avatar: '/angularjs/01_sliding_animation_with_background_and_avatar/images/john.png',
                title: 'John Lindquist',
                subtitle: 'The Godfather'
            },
            {   bg: '/angularjs/01_sliding_animation_with_background_and_avatar/images/bg1.jpg',
                avatar: '/angularjs/01_sliding_animation_with_background_and_avatar/images/joel.png',
                title: 'Joel Hooks',
                subtitle: 'The Hustler'
            },
            {   bg: '/angularjs/01_sliding_animation_with_background_and_avatar/images/bg2.jpg',
                avatar: '/angularjs/01_sliding_animation_with_background_and_avatar/images/lukas.png',
                title: 'Lukas Ruebbelke',
                subtitle: 'The Cleaner'}
        ];

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };
    })
    .animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    var scope = element.scope(),
                        finishPoint = element.parent().width();

                    if(scope.direction !== 'right') finishPoint = -finishPoint;

                    TweenLite.to(element, 0.5, {left:finishPoint, ease: Ease.easeInOut, onComplete: done});
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    var scope = element.scope(),
                        startPoint = element.parent().width(),
                        tl = new TimelineLite();

                    if(scope.direction === 'right') startPoint = -startPoint;

                    tl.fromTo(element, 0.5, { left: startPoint}, {left:0, ease: Ease.easeInOut, onComplete: done})
                        .fromTo(element.find('.title'), 0.5, { left: -200, alpha: 0}, {left:0, alpha:1, ease:Ease.easeInOut} )
                        .fromTo(element.find('.subtitle'), 0.5, { left: -200, alpha: 0}, {left:0, alpha:1, ease:Ease.easeInOut} )
                        .fromTo(element.find('.avatar'), 0.5, { left: 800, alpha: 0}, {left:300, alpha:1, ease:Ease.easeInOut} );
                }
                else {
                    done();
                }
            }
        };
    }); 