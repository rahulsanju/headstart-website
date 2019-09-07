var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	StudentName : { type:String, required: true,unique:true},
	College : {type:String , required:true},
	Contact : {type:String, required:true},
	EmailId :{type:String, required:true , unique:true},
	round1 : {type : Boolean, required: false, default:false},
	round2 : {type : Boolean, required: false, default:false},
	round3 : {type : Boolean, required: false, default:false},
	round4 : {type : Boolean, required: false, default:false},
	round5 : {type : Boolean, required: false, default:false},
	round1Marks : {type : String, required:false, default: "0"},
	moneypaid : {type : Number, required : false, default : 0},
	didpay : {type : Boolean, required : false, default : false},
	round1Marks : {type: Number,required: false, default : 0}
});
module.exports= mongoose.model ('Student',StudentSchema);