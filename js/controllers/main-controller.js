/**
 * Created by VKNikov on 30.12.2014 г..
 */

app.controller('MainController', ['$scope', 'authenticationService', function($scope, authenticationService) {
    "use strict";

    $scope.authentication = authenticationService;
    }])
    .controller('HomeController', ['$scope', '$rootScope', 'adsService', function($scope, $rootScope, adsService) {
        "use strict";

        //TODO
    }])
    .controller('LoginController', ['$scope', '$location', 'authenticationService', 'notifyService',  function($scope, $location, authenticationService, notifyService) {
        "use strict";
        //TODO
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
                    $scope.message.success("Registration successful!", "success")
                },
                function(data) {
                    console.log(data);
                    $scope.message.failure("Registration unsuccessful!", "error", data.data)
                });

        }
    }]);