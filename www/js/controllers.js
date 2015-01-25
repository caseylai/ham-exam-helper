angular
    .module('controllers', [])

    .controller('DataController', ['$scope', '$data', function($scope, $data) {

        $scope.$data = $data;

    }])

    .controller('IndexController', ['$scope', '$data', '$ionicHistory', function($scope, $data, $ionicHistory) {

        $ionicHistory.clearHistory();

        $scope.$data = $data;

    }])

    .controller('StudyController', ['$scope', '$data', '$localStorage', '$ionicPopup', function($scope, $data, $localStorage, $ionicPopup) {

        $scope.$data = $data;

        $scope.testIds = $data.getClassTestIds($data.clazz);
        $scope.testIndex = progress();
        if ($scope.testIndex) {
            $ionicPopup
                .confirm({
                    title: '学习进度',
                    template: '您以前学习到 ' + $scope.testIndex + ' 题，是否继续学习？',
                    buttons: [
                        {
                            text: '重新开始',
                            onTap: function() {
                                $scope.testIndex = 1;
                                prepareTest();
                            }
                        },
                        {
                            text: '继续学习',
                            type: 'button-positive'
                        }
                    ]
                });
        } else {
            $scope.testIndex = 1;
        }

        prepareTest();

        $scope.nextTest = function() {
            $scope.testIndex++;
            prepareTest();
        };

        $scope.previousTest = function() {
            $scope.testIndex--;
            prepareTest();
        };

        $scope.getProgress = function() {
            return ($scope.testIndex || 0) / $scope.testIds.length * 100 + '%';
        };

        $scope.markRightAnswer = function() {
            $scope.hiddenRightAnswer = false;
        };

        function prepareTest() {
            $scope.hiddenRightAnswer = true;
            $scope.test = $data.getTestById($scope.testIds[$scope.testIndex - 1]);
            $scope.rightChoice = $scope.test.choices[0];
            $scope.shuffledChoices = _.shuffleArray($scope.test.choices);
            progress($scope.testIndex);
        }

        function progress(index) {
            var key = 'progress-study-' + $data.clazz;
            if (typeof index == 'number') {
                $localStorage[key] = index;
            } else {
                return $localStorage[key];
            }
        }

    }])

    .controller('RandomTestController', ['$scope', '$data', '$localStorage', '$ionicPopup', '$timeout', '$state', function($scope, $data, $localStorage, $ionicPopup, $timeout, $state) {

        $scope.$data = $data;

        var testIds = $data.getClassTestIds($data.clazz);
        var TESTS_COUNT = 30;

        $scope.randomTestIds = _.shuffleArray(_.shuffleArray(testIds)).slice(0, TESTS_COUNT);
        $scope.testIndex = 1;
        $scope.models = [];
        $scope.models[TESTS_COUNT] = undefined;
        var results = [];

        prepareTest();

        $scope.$watch('models', function() {
            var isSelected = $scope.models[$scope.testIndex] !== undefined;
            if (isSelected) {
                var pass = $scope.models[$scope.testIndex] == $scope.rightChoice;
                if (pass) {
                    $timeout($scope.nextTest, 1000);
                } else {
                    $localStorage.failedTests = $localStorage.failedTests || {};
                    var failedCount = $localStorage.failedTests[$scope.test.id];
                    $localStorage.failedTests[$scope.test.id] = failedCount ? failedCount + 1 : 1;
                }
                results.push({
                    id: $scope.test.id,
                    pass: pass
                });
            }
        }, true);

        $scope.getProgress = function() {
            return ($scope.testIndex || 0) / $scope.randomTestIds.length * 100 + '%';
        };

        $scope.nextTest = function() {
            if ($scope.testIndex <= $scope.randomTestIds.length - 1) {
                $scope.testIndex++;
                prepareTest();
            } else {
                $data.testResults = results;
                $state.go('test-report');
            }
        };

        function prepareTest() {
            $scope.test = $data.getTestById($scope.randomTestIds[$scope.testIndex - 1]);
            $scope.rightChoice = $scope.test.choices[0];
            $scope.shuffledChoices = _.shuffleArray($scope.test.choices);
        }

    }])

    .controller('TestReportController', ['$scope', '$data', '$state', '$ionicHistory', function($scope, $data, $state, $ionicHistory) {

        $ionicHistory.clearHistory();

        $scope.$data = $data;
        $scope.passCount = 0;
        angular.forEach($data.testResults, function(r) {
            r.pass && $scope.passCount++;
        });

        $scope.gotoHomePage = function() {
            $state.go('index');
        };

    }]);