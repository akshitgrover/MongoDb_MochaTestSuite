var {users} = require('./helper.js');
var {ObjectId} = require('./helper.js').mongoose.Types;
var {admins} = require('./helper.js');
var expect = require('expect');

describe('Create Functions:',()=>{

	beforeEach((done)=>{

		users.remove({}).then(()=>{
			return admins.remove({})
		}).then(()=>{
			done();
		}).catch((err)=>{
			done(err);
		});

	});	

	it('Should Implement Class Based Create Method.',(done)=>{
		users.create({name:"akshitgrover"}).then((msg)=>{
			users.findOne({_id:msg._id}).then((result)=>{
				expect(result.name).toBe('akshitgrover');
			})
			var count = users.find({}).count().then((result)=>{
				expect(result).toBe(1);
				done();		
			},(err)=>{
				done(err);
			});
		});		
	});	

	it("Should Implement Password Validation Tests.",(done)=>{

		var admin = new admins({username:"akshitgrover"});
		var error = admin.validateSync().errors.password.message;
		expect(error).toBe("Password Is Required.");
		
		var admin = new admins({username:"akshitgrover",password:"1516"});
		var error = admin.validateSync().errors.password.message;
		expect(error).toBe("Password Should Be Of Greater Than 6 Characters Of Length.");

		done();

	});

	it("Should Implement Username Validation Tests.",(done)=>{

		var admin = new admins({username:"",password:"1516HUDA"});
		var error = admin.validateSync().errors.username.message;
		expect(error).toBe("Username Is Required.");
		done();

	});

	it("Should Handle Failed Insert",(done)=>{

		admins.create({username:"akshitgrover",password:""}).then((result)=>{
			done(result);
		}).catch((err)=>{
			admins.findOne({username:"akshitgrover"},(err,result)=>{
				if(err){
					return done(err);
				}
				expect(result).toBeFalsy();
				done();
			});
		})

	})

});