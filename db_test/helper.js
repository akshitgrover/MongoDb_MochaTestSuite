var mongoose = require('mongoose');

var admin = mongoose.Schema({

	username:{
		type:'string',
	},
	password:{
		type:'string'
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