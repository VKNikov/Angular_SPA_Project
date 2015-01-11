/**
 * Created by VKNikov on 10.1.2015 г..
 */

app.controller('UserAdsController', ['$scope', '$rootScope', '$location', '$route', 'townsService', 'categoriesService', 'adsService', 'notifyService', 'authenticationService',
    function($scope, $rootScope, $location, $route, townsService, categoriesService, adsService, notifyService, authenticationService) {
        "use strict";

        $rootScope.pageTitle = '- MyAds';
        $scope.message = notifyService;
        $scope.headers = authenticationService.getHeaders();
        adsService.getUserAds($scope.headers)
            .$promise
            .then(function (data) {
                $scope.ready = true;
                $scope.adsData = data;
                $rootScope.myAds = true;
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

        $scope.filterByAdsParams = {};
        $scope.$on('filterByAdsChanged', function(event, status) {
            $scope.filterByAdsParams.status = status;
            $scope.pageParams.startPage = 1;
            adsService.getUserAdsByStatus($scope.filterByAdsParams)
                .$promise
                .then(function(data) {
                    $scope.filterByAdsStatus = status;
                    $scope.adsData = data;
                    $scope.personalAds = null;
                },
                function(data) {
                    $scope.message.failure("There was an error!", "error", data.data);
                });
        });

        $scope.deactivateAd = function(adId) {
            adsService.deactivateAd(adId, $scope.headers)
                .$promise
                .then(function(data) {
                    $scope.message.success('The ad was successfully deactivated!', 'success');
                    $scope.myAds = null;
                    $route.reload();
                },
                function(data) {
                    $scope.message.failure('Operation unsuccessful!', 'error', data.data)
                })
        };

        $scope.publishAgain = function(adId) {
            adsService.deactivateAd(adId, $scope.headers)
                .$promise
                .then(function(data) {
                    $scope.message.success('The ad was successfully deactivated!', 'success');
                    $scope.myAds = null;
                    $route.reload();
                },
                function(data) {
                    $scope.message.failure('Operation unsuccessful!', 'error', data.data)
                })
        }
    }])
    .controller('UserAddNewAdController', ['$scope', '$rootScope', '$location', 'authenticationService', 'townsService', 'categoriesService', 'adsService', 'notifyService',
        function($scope, $rootScope, $location, authenticationService, townsService, categoriesService, adsService, notifyService) {
            "use strict";

            $rootScope.myAds = false;
            $rootScope.pageTitle = '- Publish New Ad';
            $scope.adData = {
                townId: null,
                categoryId: null
            };
            townsService.getAllTowns(true)
                .$promise
                .then(function(data) {
                    $scope.towns = data;
                });

            categoriesService.getAllCategories(true)
                .$promise
                .then(function(data) {
                    $scope.categories = data;
                });

            $scope.message = notifyService;
            $scope.publishAd = function(adData) {
                var headers = authenticationService.getHeaders();
                console.log(headers);
                adsService.postNewAd(adData, headers)
                    .$promise
                    .then(function(data) {
                        $scope.message.success('The ad was added successfully and is pending approval! When approved by one of our admins, it will be added to the site.', 'success');
                        $location.path('/user/userAds');
                    },
                    function(data) {
                        $scope.message.failure("Couldn't add this ad!", 'error', data.data);
                    })
            };

            $scope.fileSelected = function(fileInputField) {
                delete $scope.adData.imageDataUrl;
                var file = fileInputField.files[0];
                if (file.type.match(/image\/.*/)) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        $scope.adData.imageDataUrl = reader.result;
                        $(".image-box").html("<img src='" + reader.result + "'>");
                    };
                    reader.readAsDataURL(file);
                } else {
                    $(".image-box").html("<p>File type not supported!</p>");
                }
            };
        }])
    .controller('UserEditProfileController', ['$scope', '$location', 'townsService', 'categoriesService', 'adsService', 'notifyService',
        function($scope, $location, townsService, categoriesService, adsService, notifyService) {
            "use strict";

    }]);