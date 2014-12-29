/**
 * Created by VKNikov on 29.12.2014 г..
 */

app.config(function($routeProvider) {
    "use strict";

    $routeProvider
        .when('/home',
        {
        templateUrl: "../views/home.html",
        controller: "HomeController"
        })
        .when('/login',
        {
            templateUrl: "../views/login.html",
            controller: "LoginController"
        })
        .when('/register',
        {
            templateUrl: "../views/login.html",
            controller: "RegisterController"
        })
        .otherwise({redirectTo: '/home'})

});