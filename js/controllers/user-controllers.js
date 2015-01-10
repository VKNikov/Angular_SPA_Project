/**
 * Created by VKNikov on 10.1.2015 г..
 */

app.controller('UserAdsController', ['$scope', '$rootScope', '$location', 'townsService', 'categoriesService', 'adsService', 'notifyService', 'authenticationService',
    function($scope, $rootScope, $location, townsService, categoriesService, adsService, notifyService, authenticationService) {
        "use strict";

        $rootScope.pageTitle = '- MyAds';
        $scope.message = notifyService;
        $scope.headers = authenticationService.getHeaders();
        adsService.getUserAds($scope.headers)
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
    .controller('UserAddNewAdController', ['$scope', '$location', 'townsService', 'categoriesService', 'adsService', 'notifyService',
        function($scope, $location, townsService, categoriesService, adsService, notifyService) {
            "use strict";

    }])
    .controller('UserEditProfileController', ['$scope', '$location', 'townsService', 'categoriesService', 'adsService', 'notifyService',
        function($scope, $location, townsService, categoriesService, adsService, notifyService) {
            "use strict";

    }]);