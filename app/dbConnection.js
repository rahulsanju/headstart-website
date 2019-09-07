const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rahulmora007:Akagami%40123@cluster0-pb6fc.mongodb.net/headstart";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(function(err) {
	if(err){
		throw err;
	}else{
		
		console.log("Connected to atlas databse!");
	}
  
  // perform actions on the collection object
  
  client.close();
});

module.exports=client;