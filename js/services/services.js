/**
 * Created by VKNikov on 6.1.2015 г..
 */

app.factory('authenticationService', ['$resource', '$location', '$http', 'baseUrl', function($resource, $location, $http, baseUrl) {
    "use strict";
    var user;
    var key = 'user';

    function userLogin(user) {
        var resource = $resource(baseUrl + "user/login");
        return resource.save(angular.toJson(user))
    }

    function userLogout() {
        $location.path('/');
        localStorage.removeItem(key)
    }

    function userRegister(user) {
        var resource = $resource(baseUrl + "user/register");
        return resource.save(user);
    }

    function isLoggedIn() {
        var currentUser = angular.fromJson(localStorage.getItem(key));
        if (currentUser) {
            return currentUser.access_token !== undefined;
        }

        return false;
    }

    function isAdmin() {
        var resource = $resource(baseUrl + 'admin/ads');
        var currentUser = angular.fromJson(localStorage.getItem(key));
        if (currentUser) {
            return currentUser.isAdmin == "true";
        }

        return false;
    }

    function getHeaders() {
        var headers = {};
        var userData = getUserData();
        if(userData) {
            headers['Authorization'] = 'Bearer ' + userData.access_token;
        }

        return headers;
    }

    function getUserProfile() {
        $http.defaults.headers.get = this.getHeaders();
        var resource = $resource(baseUrl + "user/profile");
        return resource.get();
    }

    function editUserProfile(userData) {
        $http.defaults.headers.common = this.getHeaders();
        var resource = $resource(baseUrl + "user/profile", null, {update: {method: 'PUT'}});

        return resource.update(userData);
    }

    function changePassword(passData) {
        console.log(passData);
        $http.defaults.headers.common = this.getHeaders();
        var resource = $resource(baseUrl + "user/changepassword", null, {update: {method: 'PUT'}});

        return resource.update(passData);
    }

    function saveUserData(data) {
        //localStorageServiceProvider.set(key, data);
        localStorage.setItem(key, angular.toJson(data));
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
        saveCurrentUser: saveUserData,
        getUserProfile: getUserProfile,
        editUserProfile: editUserProfile,
        changePassword: changePassword
    }
}])
    .factory('adsService', ['$resource', '$http', 'baseUrl', function($resource, $http, baseUrl) {
        "use strict";

        function getAllAds() {
            var resource = $resource(baseUrl + "ads:adId", {adId: '@id'}, {update: {method: 'PUT'}});
            return resource.get();
        }

        function getAdsWithPaging(pageParams) {
            var resource = $resource(baseUrl + 'ads?pagesize=' +  pageParams.pageSize + '&startpage=' + pageParams.currentPage);
            return resource.get();
        }

        function getFilteredAds(filterParams) {
            var resource = $resource(baseUrl + 'ads?');
            var params = filterParams;
            if(!params) {
                params = {}
            }
            return resource.get(params);
        }

        function getUserAds(headers) {
            $http.defaults.headers.get = headers;
            var resource = $resource(baseUrl + 'user/ads');

            return resource.get();
        }

        function getUserAdsWIthPaging(pageParams) {
            var resource = $resource(baseUrl + 'user/ads?pagesize=' +  pageParams.pageSize + '&startpage=' + pageParams.currentPage);
            return resource.get();
        }

        function getUserAdsByStatus(status) {
            var resource = $resource(baseUrl + 'user/ads?');
            var adsStatus = status;
            if(!adsStatus) {
                adsStatus = {}
            }

            return resource.get(adsStatus);
        }

        function editAd(adId, ad) {
            var resource = $resource(baseUrl + "ads:adId", {adId: '@id'}, {update: {method: 'PUT'}});
            return resource.update({ id: adId}, ad);
        }

        function getAdById(adId) {
            var resource = $resource(baseUrl + "ads:adId", {adId: '@id'}, {update: {method: 'PUT'}});
            return resource.get({id: adId});
        }

        function deactivateAd(adId, headers) {
            $http.defaults.headers.common = headers;
            var resource = $resource(baseUrl + 'user/ads/deactivate/' + adId, null, {update: {method: 'PUT'}});

            return resource.update();
        }

        function publishAgain(adId, headers) {
            $http.defaults.headers.common = headers;
            var resource = $resource(baseUrl + 'user/ads/publishagain/' + adId, null, {update: {method: 'PUT'}});

            return resource.update();
        }

        function createAd(ad, headers) {
            $http.defaults.headers.common = headers;
            var resource = $resource(baseUrl + 'user/ads');
            //return resource.addNewAd(ad, headers);

            return resource.save(ad);
        }

        function deleteAdById(adId, headers) {
            $http.defaults.headers.common = headers;
            var resource = $resource(baseUrl + 'user/ads/' + adId);

            return resource.delete();
        }

        return {
            getAllAds: getAllAds,
            getAdsWithPaging: getAdsWithPaging,
            getFilteredAds: getFilteredAds,
            getUserAds: getUserAds,
            getUserAdsByStatus: getUserAdsByStatus,
            postNewAd: createAd,
            deactivateAd: deactivateAd,
            getUserAdsWithPaging: getUserAdsWIthPaging,
            publishAgain: publishAgain,
            deleteAd: deleteAdById
        }
    }])
    .factory('categoriesService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";

        var resource = $resource(baseUrl + 'categories');

        function getAllCategories(condition) {
            if(condition == 'true') {
                return resource.query();
            }

            return resource.get();
        }

        return {
            getAllCategories: getAllCategories
        }
    }])
    .factory('townsService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";

        var resource = $resource(baseUrl + 'towns');

        function getAllTowns(condition) {
            if(condition == 'true') {
                return resource.query();
            }

            return resource.get();
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

