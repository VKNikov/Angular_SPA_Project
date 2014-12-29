/**
 * Created by VKNikov on 29.12.2014 г..
 */

//app.config(function($httpProvider) {
//    "use strict";
//
//    var login = function($location, $q, SessionService) {
//        var success = function(response) {
//            return response;
//        };
//
//        var error = function(response) {
//            return $q.reject(response);
//        }
//    };
//});

app.factory('requester', function($http) {
    "use strict";

    var ads = (function() {
        function getAllAds () {
            var request =
            {
                method: 'GET',
                url: 'http://softuni-ads.azurewebsites.net/api/ads'
            };

            $http(request)
                .success(function() {
                alert('Operation successful!');
            })
                .error(function() {
                    alert('There was an error!');
                })
        }

        function getAdsWithPaging() {

        }

        function getAdsWithFilter() {

        }

        function getAllCategories() {

        }

        function getAllTowns () {

        }

        return {
            getAllAds: getAllAds(),
            getAdsWithPaging: getAdsWithPaging(),
            getAdsWithFilter: getAdsWithFilter(),
            getAllCategories: getAllCategories(),
            getAllTowns: getAllTowns()
        }
    })();
});