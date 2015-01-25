angular
    .module('ham-exam-helper', ['ionic', 'controllers', 'services', 'filters'])
    .run(function ($ionicPlatform, $ionicHistory, HintService) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            navigator.splashscreen && navigator.splashscreen.hide();

            $ionicPlatform.registerBackButtonAction((function() {
                var flag = false;
                return function() {
                    var backView = $ionicHistory.backView();
                    if (backView) {
                        $ionicHistory.goBack();
                    } else if (! flag) {
                        flag = true;
                        HintService.show({
                            template: '连按两次返回退出应用',
                            noBackdrop: true,
                            duration: 1000
                        });
                        setTimeout(function() {
                            flag = false;
                        }, 1000);
                    } else {
                        ionic.Platform.exitApp();
                    }
                };
            })(), 1000);
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('index', {
                url: '/',
                templateUrl: 'templates/index.html',
                controller: 'IndexController'
            })

            .state('study', {
                url: '/study',
                templateUrl: 'templates/study.html',
                controller: 'StudyController'
            })

            .state('random-test', {
                url: '/random-test',
                templateUrl: 'templates/random-test.html',
                controller: 'RandomTestController'
            })

            .state('test-report', {
                url: '/test-report',
                templateUrl: 'templates/test-report.html',
                controller: 'TestReportController'
            })

            .state('test-view', {
                url: '/test-view',
                templateUrl: 'templates/test-view.html',
                controller: 'DataController'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

    });
