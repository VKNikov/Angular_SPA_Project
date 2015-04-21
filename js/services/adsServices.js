/**
 * Created by VKNikov on 11.1.2015 г..
 */

app.factory('adsService', ['$resource', '$http', 'baseUrl', function($resource, $http, baseUrl) {
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

    function editAd(editedAd, headers) {
        $http.defaults.headers.common = headers;
        var resource = $resource(baseUrl + 'user/ads/' + editedAd.id, null, {update: {method: 'PUT'}});

        return resource.update(editedAd);
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
        deleteAd: deleteAdById,
        editAd: editAd
    };
}])
    .factory('categoriesService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";

        var resource = $resource(baseUrl + 'categories');

        function getAllCategories() {
            return resource.query();
        }

        return {
            getAllCategories: getAllCategories
        };
    }])
    .factory('townsService', ['$resource', 'baseUrl', function($resource, baseUrl) {
        "use strict";

        var resource = $resource(baseUrl + 'towns');

        function getAllTowns() {
            return resource.query();
        }

        return {
            getAllTowns: getAllTowns
        };
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
        };
    }]);