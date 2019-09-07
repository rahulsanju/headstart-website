angular.module('mainServices',[])
.factory('mainServiceFactory',function($http){
    var mainService = {};
    mainService.sendDetails=function(studData){
        return $http.post('/api/a',studData);
    };

    mainService.checkToken = function(token){
        return $http.get('/api/q/checkToken/'+token);
    }

    mainService.getQuestions = function(){
        return $http.get('/api/q');
    }

    mainService.submitTest = function(submit){
        return $http.post('/api/submitTest',submit);
    }

    mainService.userLogin = function(data){
        return $http.post('/api/login',data);
    }
    mainService.getParticipants = function(){
        return $http.get('/api/participants');
    }

    return mainService;
});