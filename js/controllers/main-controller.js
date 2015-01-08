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
    .controller('RegisterController', ['$scope', '$location', 'authenticationService', 'notifyService', function($scope, $location, authenticationService, notifyService) {
        "use strict";
        //TODO
    }]);