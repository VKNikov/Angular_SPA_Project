/**
 * Created by VKNikov on 30.12.2014 г..
 */

app.controller('MainController', ['$scope', 'authenticationService', function($scope, authenticationService) {
    "use strict";

    //$scope.pageTitle = '';
    $scope.authentication = authenticationService;
    }])
    .controller('HomeController', ['$scope', '$rootScope', 'adsService', 'notifyService', function($scope, $rootScope, adsService, notifyService) {
        "use strict";

        $rootScope.pageTitle = '- Home';
        $scope.message = notifyService;
        adsService.getAllAds()
            .$promise
            .then(function (data) {
                $scope.ready = true;
                $scope.adsData = data;
            },
            function (data) {
                $scope.message.failure("There was an error!", "error", data.data);
            });

        $scope.pageParams = {
            startPage: 1,
            currentPage: 1,
            pageSize: 5
        };

        $scope.pageChanged = function() {
            adsService.getAdsWithPaging($scope.pageParams)
                .$promise
                .then(function(data) {
                    $scope.adsData = data;
                },
                function(data) {
                    $scope.message.failure("There was an error!", "error", data.data);
                });
        };

        $scope.filterParams = {};
        $scope.$on('categorySelectionChanged', function(event, categoryId) {
            $scope.filterParams.categoryId = categoryId;
            $scope.startPage = 1;
            adsService.getFilteredAds($scope.filterParams)
                .$promise
                .then(function(data) {
                    $scope.adsData = data;
                },
                function(data) {
                    $scope.message.failure("There was an error!", "error", data.data);
                });
        });

        $scope.$on('townSelectionChanged', function(event, townId) {
            $scope.filterParams.townId = townId;
            $scope.startPage = 1;
            adsService.getFilteredAds($scope.filterParams)
                .$promise
                .then(function(data) {
                    $scope.adsData = data;
                },
                function(data) {
                    $scope.message.failure("There was an error!", "error", data.data);
                });
        })
    }])
    .controller('LoginController', ['$scope', '$rootScope', '$location', 'authenticationService', 'notifyService',  function($scope, $rootScope, $location, authenticationService, notifyService) {
        "use strict";

        $rootScope.pageTitle = '- Login';
        $scope.message = notifyService;
        $scope.authenticate = authenticationService;
        $scope.login = function(userData) {
            $scope.authenticate.login(userData)
                .$promise
                .then(function(data) {
                    $scope.message.success("Login successful!", "success");
                    $scope.authenticate.saveCurrentUser(data);
                    $location.path('/');
                },
                function(data) {
                    $scope.message.failure("Login unsuccessful!", "error", data.data);
                });
        }
    }])
    .controller('RegisterController', ['$scope', '$rootScope', '$location', 'authenticationService', 'townsService', 'notifyService', function($scope, $rootScope, $location, authenticationService, townsService, notifyService) {
        "use strict";

        $rootScope.pageTitle = '- Registration';
        townsService.getAllTowns()
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
    .controller('RightSidebarController', ['$scope', '$rootScope', '$location', 'authenticationService', 'categoriesService', 'townsService', 'notifyService',
        function($scope, $rootScope, $location, authenticationService, categoriesService, townsService, notifyService) {
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

            $scope.categoryClicked = function(categoryId) {
                "use strict";
                $scope.selectedCategoryId = categoryId;
                $rootScope.$broadcast("categorySelectionChanged", categoryId);
            };

            $scope.townClicked = function(townId) {
                "use strict";
                $scope.selectedTownId = townId;
                $rootScope.$broadcast('townSelectionChanged', townId)
            }
    }]);