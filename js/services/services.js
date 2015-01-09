/**
 * Created by VKNikov on 6.1.2015 г..
 */

app.factory('authenticationService', ['$resource', 'baseUrl', function($resource, baseUrl) {
    "use strict";

    var key = 'user';

    function userLogin(user) {
        var resource = $resource(baseUrl + "user/login");
        return resource.save(angular.toJson(user))
    }

    function userLogout() {
        //TODO
    }

    function userRegister(user) {
        var resource = $resource(baseUrl + "user/register");
        return resource.save(user);
    }

    function isLoggedIn() {
        //TODO
    }

    function isAdmin() {
        //TODO
    }

    function getHeaders() {
        var headers = {};
        var userData = getUserData();
        if(userData) {
            headers.Authorization = 'Bearer ' + userData.access_token;
        }
        return headers;
    }

    function saveUserData(data) {
        //localStorageServiceProvider.set(key, data);
        localStorage.setItem(key, data);
    }

    function getUserData() {
        //localStorageServiceProvider.get(key);
        return angular.fromJson(localStorage.getItem(key));
    }

    return {
        login: userLogin,
        logout: userLogout,
        register: userRegister,
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        getHeaders: getHeaders,
        getCurrentUser: getUserData,
        saveCurrentUser: saveUserData
    }
}])
    .factory('adsService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";

        function getAllAds() {
            var resource = $resource(baseUrl + "ads:adId", {adId: '@id'}, {update: {method: 'PUT'}});
            return resource.get();
        }

        function getAdsWithPaging(pageSize, nextPage) {
            var resource = $resource(baseUrl + 'ads?pagesize=' +  pageSize + '&startpage=' + nextPage);
            return resource.get();
        }

        function getAdsWithFilter() {
            //TODO
        }

        function editAd(adId, ad) {
            return resource.update({ id: adId}, ad);
        }

        function getAdById(adId) {
            return resource.query({id: adId});
        }

        function addAd(ad) {
            return resource.save(ad);
        }

        return {
            getAllAds: getAllAds,
            getAdsWithPaging: getAdsWithPaging,
            getAdsWithFilter: getAdsWithFilter
        }
    }])
    .factory('categoriesService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";

        var resource = $resource(baseUrl + 'categories');

        function getAllCategories() {
            return resource.query();
        }

        return {
            getAllCategories: getAllCategories
        }
    }])
    .factory('townsService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";

        var resource = $resource(baseUrl + 'towns');

        function getAllTowns () {
            return resource.query();
        }

        return {
            getAllTowns: getAllTowns
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
            if (serverError && serverError.message) {
                errors.push(serverError.message);
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
            info: operationInfo,
            success: operationSuccessful,
            failure: operationFailure
        }
    }]);

