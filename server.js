var express = require('express');
var app = express();
var port = 8080;

var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var sampleApis = require('./app/apis');

var router = express.Router();



app.use(morgan('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname+'/public/'));
app.use('/api',sampleApis);

//var db = require('./app/dbConnection');





mongoose.connect('mongodb+srv://rahulmora007:Akagami@123@cluster0-pb6fc.mongodb.net/headstart?retryWrites=true&w=majority',{
	useNewUrlParser: true
  },function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Connected to MongoAtlas!');
	}
});

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname+'/public/views/index.html'));
});


app.listen(port,function(){
	console.log('Server Running!!');
});
