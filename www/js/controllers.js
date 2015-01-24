angular
    .module('controllers', [])

    .controller('IndexController', ['$scope', '$data', function($scope, $data) {

        $scope.setConfig = function(clazz, style) {
            $data.clazz = clazz;
            $data.style = style;
        };

    }])

    .controller('StudyController', ['$scope', '$data', '$localStorage', '$ionicPopup', function($scope, $data, $localStorage, $ionicPopup) {

        $scope.$data = $data;
        $data.clazz = $data.clazz || 'A';

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
            _.shuffleArray($scope.test.choices);
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

    }]);