angular
    .module('ham-exam-helper', ['ionic', 'controllers', 'services', 'filters'])
    .run(function ($ionicPlatform) {
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
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

    });
