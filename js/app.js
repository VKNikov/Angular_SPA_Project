/**
 * Created by VKNikov on 28.12.2014 г..
 */

var app = angular.module('app', ["ngResource", "ngRoute", "validation.match"])
    .config(['$routeProvider', function($routeProvider) {
        "use strict";

        $routeProvider
            .when('/',
            {
                templateUrl: "views/home.html",
                controller: "MainController"
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
            .otherwise({redirectTo: '/'})
    }])
    .constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api/');



