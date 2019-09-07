angular.module('mainController',['mainServices'])
.controller('mainCtrl',function(mainServiceFactory,$location,$scope,$timeout){
    app=this;
    
    app.sendDetails = function(studData){
        mainServiceFactory.sendDetails(studData).then(function(data){
            if(data.data.success){
                app.message = data.data.message;
                app.alert="alert-success";
                app.examWriter=studData.EmailId;
                var token = data.data.token;
                $timeout(function(){
                    $location.path('/onlineAssessment/'+token);
                },2000);
            }else{
                app.message = data.data.message;
                app.alert = "alert-danger";
            }
        });       

    }

    
})
.controller('testController',function($routeParams,$location,mainServiceFactory){
        app=this;
        var token = $routeParams.token;
        var checkArrayId=[];
        var checkArrayAns=[];


        mainServiceFactory.checkToken(token).then(function(data){
            if(data.data.success){
                document.getElementById('mainDiv').style.display="block";
                console.log(data.data.message);
                mainServiceFactory.getQuestions().then(function(data){
                    if(data.data.success){
                        app.q=data.data.data;
                        app.q.forEach(que => {
                            checkArrayId.push(que.qid);
                            checkArrayAns.push(que.qans);
                        });


                    }else{
                        
                        app.topAlert="alert-danger";
                        document.getElementById('topAlert').style.display="block";
                        app.topAlertMessage = data.data.message;
                        

                    }
                }); 
            }else{
                app.topAlert="alert-danger";
                document.getElementById('topAlert').style.display="block";
                app.topAlertMessage = data.data.message;
                console.log(data.data.message);
            }
        });

        app.submitTest = function(){
            var totalMarks=0;
            for(var i=0;i<checkArrayId.length;i++){
                var qid = document.getElementsByName(checkArrayId[i]);
                var userAns;
                for(var j = 0; j < qid.length; j++){
                    if(qid[j].checked){
                        userAns = qid[j].value;
                        if(userAns==checkArrayAns[i]){
                            totalMarks+=2;
                            break;
                        }
                    }
                }
            }
            var submit = {
                marks : totalMarks,
                token : token
            }
            mainServiceFactory.submitTest(submit).then(function(data){
                if(data.data.success){
                    $location.path('/thankyou');
                }else{
                    app.topAlert="alert-danger";
                    document.getElementById('topAlert').style.display="block";
                    app.topAlertMessage = data.data.message; 
                }
            });
        }

});