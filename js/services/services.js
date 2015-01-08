/**
 * Created by VKNikov on 6.1.2015 г..
 */

app.factory('authenticationService', ['$resource', 'baseUrl', function($resource, baseUrl) {
    "use strict";

    var resource = $resource();

    function userLogin() {
        //TODO
    }

    function userLogout() {
        //TODO
    }

    function userRegister() {
        //TODO
    }

    function getCurrentUser() {
        //TODO
    }

    function isLoggedIn() {
        //TODO
    }

    function isAdmin() {
        //TODO
    }

    function getHeaders() {
        //TODO
    }

    return {
        login: userLogin(),
        logout: userLogout(),
        register: userRegister(),
        getCurrentUser: getCurrentUser(),
        isLoggedIn: isLoggedIn(),
        isAdmin: isAdmin(),
        getHeaders: getHeaders()
    }
}])
    .factory('adsService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";
        var resource = $resource(url);

        function getAllAds() {
            return resource.query;
        }

        function getAdsWithFilter() {
            //TODO
        }

        function getAllCategories() {
            //TODO
        }

        function getAllTowns () {
            //TODO
        }

        return {
            getAllAds: getAllAds(),
            getAdsWithPaging: getAdsWithPaging(),
            getAdsWithFilter: getAdsWithFilter(),
            getAllCategories: getAllCategories(),
            getAllTowns: getAllTowns()
        }
    }])
    .factory('notifyService', [function() {
        "use strict";

        function showMsg(msg,type){
            noty({
                text        : msg,
                type        : type,
                dismissQueue: true,
                layout      : 'topCenter',
                theme       : 'defaultTheme',
                timeout: 5000
            });
        }

        function operationSuccessful(text, type) {
            showMsg(text, type);
        }

        function operationFailure(text, type, serverError) {
            var msg = text;
            // Collect errors to display from the server response
            var errors = [];
            if (serverError && serverError.error_description) {
                errors.push(serverError.error_description);
            }

            if (serverError && serverError.modelState) {
                var modelStateErrors = serverError.modelState;
                for (var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName =
                        propertyName.substr(propertyName.indexOf('.') + 1);
                    for (var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        errors.push(trimmedName + ' - ' + currentError);
                    }
                }
            }

            if (errors.length > 0) {
                msg = msg + ":<br>" + errors.join("<br>");
            }

            showMsg(msg, type);
        }

        function operationInfo(msg, type) {
            showMsg(msg, type);
        }

        return {
            info: operationInfo(),
            success: operationSuccessful(),
            failure: operationFailure()
        }
    }])
    .factory('townsService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";
        //TODO
    }])
    .factory('categoriesService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";
        //TODO
    }]);

