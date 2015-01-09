/**
 * Created by VKNikov on 30.12.2014 г..
 */

app.controller('MainController', ['$scope', 'authenticationService', function($scope, authenticationService) {
    "use strict";

    $scope.authentication = authenticationService;
    }])
    .controller('HomeController', ['$scope', '$rootScope', 'adsService', 'notifyService', function($scope, $rootScope, adsService, notifyService) {
        "use strict";

        $scope.message = notifyService;
        adsService.getAllAds()
            .$promise
            .then(function(data) {
                console.log(data);
                $scope.adsData = data;
            },
            function(data) {
                $scope.message.failure("There was an error!", "error", data.data);
            });

        $scope.startPage = 1;
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.pageChanged = function() {
            adsService.getAdsWithPaging($scope.pageSize, $scope.currentPage)
                .$promise
                .then(function(data) {
                    console.log(data);
                    $scope.adsData = data;
                },
                function(data) {
                    $scope.message.failure("There was an error!", "error", data.data);
                });
        }
    }])
    .controller('LoginController', ['$scope', '$location', 'authenticationService', 'notifyService',  function($scope, $location, authenticationService, notifyService) {
        "use strict";

        $scope.message = notifyService;
        $scope.authenticate = authenticationService;
        $scope.login = function(userData) {
            $scope.authenticate.login(userData)
                .$promise
                .then(function(data) {
                    $scope.message.success("Login successful!", "success");
                    $scope.authenticate.saveCurrentUser(data)
                },
                function(data) {
                    $scope.message.failure("Login unsuccessful!", "error", data.data);
                });
        }
    }])
    .controller('RegisterController', ['$scope', '$location', 'authenticationService', 'adsService', 'notifyService', function($scope, $location, authenticationService, adsService, notifyService) {
        "use strict";

        adsService.getAllTowns()
            .$promise
            .then(function(data) {
                $scope.towns = data;
            });

        $scope.authenticate = authenticationService;
        $scope.message = notifyService;
        $scope.register = function(userData) {
            $scope.authenticate.register(userData)
                .$promise
                .then(function(data) {
                    $scope.message.success("Registration successful!", "success");
                },
                function(data) {
                    $scope.message.failure("Registration unsuccessful!", "error", data.data)
                });

        }
    }])
    .controller('RightSidebarController', ['$scope', '$location', 'authenticationService', 'categoriesService', 'townsService', 'notifyService',
        function($scope, $location, authenticationService, categoriesService, townsService, notifyService) {
            categoriesService.getAllCategories()
                .$promise
                .then(function(data) {
                    "use strict";
                    $scope.categories = data;
                },
                function(data) {
                "use strict";
                notifyService.failure('Cannot load categories!', 'error', data)
            });
            townsService.getAllTowns()
                .$promise
                .then(function(data) {
                    "use strict";
                    $scope.towns = data;
                },
                function(data) {
                    "use strict";
                    notifyService.failure('Cannot load towns!', 'error', data)
                });
    }]);