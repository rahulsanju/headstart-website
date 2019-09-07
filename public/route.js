var app = angular.module('appRoute',['ngRoute']);

app.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when('/',{
        templateUrl : '/views/home.html'
    })
    .when('/onlineAssessment/:token',{
        templateUrl : 'views/onlineAssessment.html',
        controller : 'testController',
        controllerAs : 'test'
    })
    .when('/userDetails',{
        templateUrl : 'views/11.html'
    })
    .when('/thankyou',{
        templateUrl : 'views/thankYou.html'
    })
    .when('/login',{
        templateUrl : 'views/userpages/userlogin.html'
    })
    .when('/headstartqwerty/dashboard',{
        templateUrl : 'views/userpages/dashboard.html',
        controller : 'userController',
        controllerAs : 'user'
    })
    
    
    .otherwise({redirectTo:'/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
});
