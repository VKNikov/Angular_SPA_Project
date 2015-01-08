/**
 * Created by VKNikov on 28.12.2014 г..
 */

var app = angular.module('app', ["ngResource", "ngRoute", "validation.match", "LocalStorageModule"])
    .config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
        "use strict";

        $routeProvider
            .when('/',
            {
                templateUrl: "views/home.html",
                controller: "HomeController"
            })
            .when('/login',
            {
                templateUrl: "views/login.html",
                controller: "LoginController"
            })
            .when('/register',
            {
                templateUrl: "views/register.html",
                controller: "RegisterController"
            })
            .otherwise({redirectTo: '/'});

        //localStorageServiceProvider.setStorageType('localStorage');
    }])
    .constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api/');



