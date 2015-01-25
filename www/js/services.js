angular
    .module('services', [])

    .factory('$api', ['$http', function($http) {

        function _call(method) {
            return function(url, param) {
                var option = {
                    url: url,
                    method: method
                };
                if (method != 'GET' && param) {
                    option.data = param;
                } else {
                    option.params = param;
                }
                return $http(option);
            };
        }

        return {
            get: _call('GET'),
            post: _call('POST')
        };

    }])

    .factory('$data', ['$api', function($api) {

        var data = null;

        $api
            .get('data/data.json')
            .success(function(resp) {
                data = resp;
            });

        return {
            getClassTestIds: function(clazz) {
                return data['class' + clazz].split(',');
            },
            getTestById: function(id) {
                return data.tests[id];
            }
        };

    }])

    .factory('$localStorage', ['$rootScope', function($rootScope) {

        var storageText = window.localStorage.getItem('appStorage') || '{}';
        $rootScope.appStorage = JSON.parse(storageText);

        $rootScope.$watch('appStorage', function(newValue) {
            if (newValue) {
                window.localStorage.setItem('appStorage', JSON.stringify(newValue));
            }
        }, true);

        return $rootScope.appStorage;

    }])

    .factory('HintService', ['$ionicLoading', function($ionicLoading) {

        return {
            show: function(options) {
                $ionicLoading.show(options);
            },
            hide: function() {
                $ionicLoading.hide();
            }
        };

    }]);