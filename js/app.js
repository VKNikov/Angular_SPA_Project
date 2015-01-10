/**
 * Created by VKNikov on 28.12.2014 г..
 */

var app = angular.module('app', ['ngResource', 'ngRoute', 'validation.match', 'LocalStorageModule', 'ui.bootstrap'])
    .config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
        "use strict";

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController'
            })
            .when('/user/userAds', {
                templateUrl: 'views/home.html',
                controller: 'UserAdsController'
            })
            .when('/user/publishAd', {
                templateUrl: 'views/user/publishNewAd.html',
                controller: 'UserAddNewAdController'
            })
            .when('/user/editProfile', {
                templateUrl: 'view/user/editProfile.html',
                controller: 'UserEditProfileController'
            })
            .otherwise({redirectTo: '/'});

        //localStorageServiceProvider.setStorageType('localStorage');
    }])
    .constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api/')
    //.constant('baseUrl', 'http://localhost:1337/api/')
    .run(['$rootScope', '$location', 'authenticationService', function ($rootScope, $location, authenticationService) {
        $rootScope.$on('$locationChangeStart', function (event) {
            if ($location.path().indexOf("/user/") != -1 && !authenticationService.isLoggedIn()) {
                // Authorization check: anonymous site visitors cannot access user routes
                $location.path("/");
            }
        });
    }]);



