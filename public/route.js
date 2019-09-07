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
    
    
    .otherwise({redirectTo:'/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
});
