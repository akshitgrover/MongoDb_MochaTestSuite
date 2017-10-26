var mongoose = require('mongoose');

var admin = mongoose.Schema({

	username:{
		type:'string',
		required:[true,"Username Is Required."],
	},
	password:{
		type:'string',
		required:[true,"Password Is Required."],
		validate:{
			validator:function(){
				return this.password.length > 6;
			},
			message:'Password Should Be Of Greater Than 6 Characters Of Length.'
		}
	}

});

var users = mongoose.Schema({

	name:{
		type:'string',
	},

});

before(()=>{
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost:27017/MongoDbCast',{useMongoClient:true},(err,db)=>{
		if(err){
			process.exit(0);
		}
	});
});

module.exports = {
	users:mongoose.model('users',users),
	admins:mongoose.model('admins',admin),
	mongoose
}