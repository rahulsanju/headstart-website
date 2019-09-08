var express = require('express');
var router = express.Router();
var User = require('./Users');
var jwt = require('jsonwebtoken');
var secret = "narutoshippuden";




router.get('/participants',function(req,res){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://rahulmora007:Akagami%40123@cluster0-pb6fc.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        if(err){
            res.send(err);
        }else{
            const collection = client.db("headstart").collection("students");
            collection.find({}).sort({'time':1}).toArray( function(err,result){
                if(err){
                    res.json({
                        success : false,
                        message : "Error connecting to our servers!"
                    });
                }else{
                    res.json({
                        success : true,
                        data : result
                    });
                }
            });
            client.close();    
        }
    })
});


router.post('/login',function(req,res){
    var uname = req.body.username;
    var password = req.body.password;
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://rahulmora007:Akagami%40123@cluster0-pb6fc.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        if(err){
            res.send(err);
        }else{
            const collection = client.db("headstart").collection("admins");
            collection.findOne({'username':uname}, function(err,result){
                if(err){
                    res.json({
                        success : false,
                        message : "Error connecting to our servers!"
                    });
                }else{
                    if(result.password==password){
                        var token=jwt.sign({ username : result.username },secret,{expiresIn:'240000h'});
                        res.json({
                            success : true,
                            message: "User found!",
                            data : result,
                            token : token
                        })
                    }
                }
            });
            client.close();    
        }
    })
})



router.post('/a',function(req,res){
	var user = new User();
	user.StudentName = req.body.StudentName;
	user.College = req.body.College;
	user.EmailId = req.body.EmailId;
    user.Contact = req.body.Contact;
    var timeStamp = Math.floor(Date.now() / 1000);
    user.time = timeStamp;
	
	if (user.StudentName==""||user.StudentName==null||user.College==""||user.College==null||user.EmailId==""||user.EmailId==null||user.Contact==""||user.Contact==null)
	{
        
        res.json({
            success : false,
            message : "UserName, College,Email-Id or Contact are missing and are required to proceed"
        });
    }
    else if(!(/\d{10}$/.test(user.Contact))){
        
        res.json({
            success: false,
            message: "Inavalid contact no."
        });

    }
	else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.EmailId)){
	user.save(function(err){
		if(err){
            
            res.json({
                success: false,
                message: "User already exists!!"
            });
		}
		else{

            var token = jwt.sign({EmailId : user.EmailId},secret,{expiresIn:'1h'});


            
            res.json({
                success: true,
                message: "Yayy, All the Best!",
                token : token
            });
		}
	});
}
else {
    
    res.json({
        success: false,
        message: "Invalid Email!"
    });
}
});

router.get('/q/checkToken/:token',function(req,res){
    var token = req.params.token;
    if(token){
        jwt.verify(token,secret,function(err,decoded){
            if(err){
                res.json({success: false , message: 'Seems like your token is expired!'});
            }
            else{
                const MongoClient = require('mongodb').MongoClient;
                const uri = "mongodb+srv://rahulmora007:Akagami%40123@cluster0-pb6fc.mongodb.net/test?retryWrites=true&w=majority";
                const client = new MongoClient(uri, { useNewUrlParser: true });
                client.connect(err => {
                    if(err){
                        res.send(err);
                    }else{
                        const collection = client.db("headstart").collection("students");
                        
                        collection.find({'EmailId': decoded.EmailId,'round1':false}).toArray(function(err,result){
                            if(err){
                                res.json({
                                    success : false,
                                    message : "Error Connecting to our servers!"
                                });
                            }else if(result.length==0){
                                res.json({
                                    success : false,
                                    message : "Uh-oh! You've already taken the test. For any queries please contact us."
                                });
                            }else{
                                res.json({
                                    success : true,
                                    message : "roken verified!"
                                });
                            }
                        })    

                        client.close();    
                    }
            });

                
                
            }
        });

    }else{
        res.json({
            success : false,
            message : "Uh-oh, Your token is invalid!"
        })
    }
})

router.get('/q',function(req,res){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://rahulmora007:Akagami%40123@cluster0-pb6fc.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        if(err){
            res.send(err);
        }else{
            const collection = client.db("headstart").collection("questions");
            collection.find({}).toArray(function(err,result){
                if(err){
                    res.json({
                        success : false,
                        message : "Error connecting to our servers!"
                    });
                }else{
                    res.json({
                        success : true,
                        data : result
                    });
                }
            })
            client.close();    
        }
   });

    
})

router.post('/submitTest',function(req,res){
    var marks = req.body.marks;
    marks = parseInt(marks);
    var token = req.body.token;
    if(token){
        jwt.verify(token,secret,function(err,decoded){
            if(err){
                res.json({success: false , message: 'Seems like your token is expired!'});
            }
            else{
                var email = decoded.EmailId;
                const MongoClient = require('mongodb').MongoClient;
                const uri = "mongodb+srv://rahulmora007:Akagami%40123@cluster0-pb6fc.mongodb.net/test?retryWrites=true&w=majority";
                const client = new MongoClient(uri, { useNewUrlParser: true });
                client.connect(err => {
                    if(err){
                        res.send(err);
                    }else{
                        const collection = client.db("headstart").collection("students");
                        collection.update({'EmailId':email},{$set:{'round1Marks':marks,'round1':true}},function(err,result){
                            if(err){
                                res.json({
                                    success : true,
                                    message : "Cannot update your marks!"
                                });
                            }else{
                                res.json({
                                    success : true,
                                    message : "Succesfully updated your marks!"
                                });
                            }
                        })
                        client.close();    
                    }
                });
            }
        });
    }else{
        res.json({
            success :false,
            message : "Please prove a valid token"
        })
    }
    

});


module.exports = router;
