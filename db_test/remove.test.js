var {users} = require('./helper.js');
var {ObjectId} = require('./helper.js').mongoose.Types;

var expect = require('expect');

describe('Remove Functions:',()=>{

	let user;

	beforeEach((done)=>{
		users.remove({}).then((result)=>{
			users.create({name:'akshitgrover'}).then((result)=>{
				user = result;
				done();
			},(err)=>{
				done(err);
			})
		},(err)=>{
			done(err);
		});
	});

	it('Should Implement Model Instance Remove Method.',(done)=>{
		
		user.remove().then((msg)=>{
			users.findOne({name:user.name}).then((result)=>{
				expect(result).toBeFalsy();
				done();
			}).catch((err)=>{
				done(err);
			})
		}).catch((err)=>{
			done(err);
		});

	});

	it('Should Implement Class Based Remove Method.',(done)=>{

		users.remove({name:user.name}).then((result)=>{
			users.findOne({name:user.name}).then((result)=>{
				expect(result).toBeFalsy();
				done();
			}).catch((err)=>{
				done(err);
			})
		}).catch((err)=>{
			done(err);
		});

	});

	it('Should Implement Class Based FindById And Remove Method.',(done)=>{

		users.findByIdAndRemove({_id:user._id}).then((result)=>{
			users.findOne({_id:user._id}).then((result)=>{
				expect(result).toBeFalsy();
				done();
			}).catch((err)=>{
				done(err);
			});
		}).catch((err)=>{
			done(err);
		});

	});

	it('Should Implement Class Based FindOne And Remove Method.',(done)=>{

		users.findOneAndRemove({name:user.name}).then((result)=>{
			users.findOne({_id:user._id}).then((result)=>{
				expect(result).toBeFalsy();
				done();
			}).catch((err)=>{
				done(err);
			});
		}).catch((err)=>{
			done(err);
		});

	});

});