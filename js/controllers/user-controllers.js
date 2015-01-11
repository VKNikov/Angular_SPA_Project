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
            pageSize: 2
        };

        $scope.pageChanged = function() {
            adsService.getUserAdsWithPaging($scope.pageParams)
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
            adsService.publishAgain(adId, $scope.headers)
                .$promise
                .then(function(data) {
                    $scope.message.success('The ad is published again and is awaiting approval!', 'success');
                    $scope.myAds = null;
                    $route.reload();
                },
                function(data) {
                    $scope.message.failure('Operation unsuccessful!', 'error', data.data)
                })
        };

        $scope.deleteAd = function(ad) {
            $rootScope.currentAd = ad;
            $location.path('/user/userAds/deleteAd');
        };

        $scope.editAd = function(ad) {
            $rootScope.currentAd = ad;
            $location.path('/users/userAds/editAd');
        };
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
            townsService.getAllTowns()
                .$promise
                .then(function(data) {
                    $rootScope.towns = data;
                });

            categoriesService.getAllCategories()
                .$promise
                .then(function(data) {
                    $rootScope.categories = data;
                });

            $scope.message = notifyService;
            $scope.publishAd = function(adData) {
                var headers = authenticationService.getHeaders();
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
    .controller('UserEditProfileController', ['$scope', '$location', '$rootScope', 'townsService', 'categoriesService', 'adsService', 'notifyService', 'authenticationService',
        function($scope, $location, $rootScope, townsService, categoriesService, adsService, notifyService, authenticationService) {
            "use strict";

            $scope.message = notifyService;
            authenticationService.getUserProfile()
                .$promise
                .then(function(data) {
                    $scope.userData = data;
                });

            $rootScope.pageTitle = '- Edit User Profile';
            townsService.getAllTowns()
                .$promise
                .then(function(data) {
                    $rootScope.towns = data;
                });

            $scope.updateProfile = function(userData) {
                authenticationService.editUserProfile(userData)
                    .$promise
                    .then(function(data) {
                        $scope.message.success('Profile updated successfully!', 'success');
                        $location.path('user/userAds');
                    },
                    function(data) {
                        $scope.message.failure('Operation unsuccessful', 'error', data.data)
                    })
            };

            $scope.changePass = function(passData) {
                authenticationService.changePassword(passData)
                    .$promise
                    .then(function(data) {
                        $scope.message.success('Password changed successfully!', 'success');
                    },
                    function(data) {
                        $scope.message.failure('Could not change the password!', 'error', data.data);
                    })
            }
    }])
    .controller('UserDeleteAdController', ['$scope', '$rootScope', '$location', 'adsService', 'notifyService', 'authenticationService',
        function($scope,$rootScope, $location, adsService, notifyService, authenticationService) {
            "use strict";

            $rootScope.pageTitle = '- Delete Ad';
            $rootScope.myAds = null;
            $scope.headers = authenticationService.getHeaders();
            $scope.message = notifyService;
            $scope.confirmDelete = function(adId) {
                adsService.deleteAd(adId, $scope.headers)
                    .$promise
                    .then(function(data) {
                        $scope.message.success('Ad successfully deleted!', 'success');
                        $location.path('/user/userAds');
                    },
                    function(data) {
                        $scope.message.failure('Could not delete this ad!', 'error', data.data)
                    })
            }
    }])
    .controller('UserEditAdController', ['$scope', '$rootScope', '$location', 'adsService', 'notifyService', 'authenticationService', 'townsService', 'categoriesService',
        function($scope,$rootScope, $location, adsService, notifyService, authenticationService, townsService, categoriesService) {
            "use strict";

            $rootScope.pageTitle = '- Edit Ad';
            $scope.editedAd = {
                changeimage: false
            };
            townsService.getAllTowns()
                .$promise
                .then(function(data) {
                    $rootScope.towns = data;
                });

            categoriesService.getAllCategories()
                .$promise
                .then(function(data) {
                    $rootScope.categories = data;
                });

            $scope.message = notifyService;
            $scope.headers = authenticationService.getHeaders();
            $scope.editAd = function(editedAd) {
                adsService.editAd(editedAd, $scope.headers)
                    .$promise
                    .then(function(data) {
                        $scope.message.success('Ad edited successfully!', 'success')
                    },
                    function(data) {
                        $scope.message.failure('Ad edit failed!', 'error', data.data)
                    })
            }
    }]);