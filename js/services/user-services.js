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
}]);


