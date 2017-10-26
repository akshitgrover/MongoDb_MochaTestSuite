var {admins} = require('./helper.js');
var {ObjectId} = require('./helper.js');

var expect = require('expect');

describe('Update Function:',()=>{

	let id_1,id_2;

	beforeEach((done)=>{
		
		admins.remove({}).then((result)=>{

			admins.create([{username:"akshit",password:"1516"},{username:"Deathadder",password:"123"}]).then((result)=>{
				id_1 = result[0]._id;
				id_2 = result[1]._id;
				done();
			}).catch((err)=>{
				done(err);
			})

		}).catch((err)=>{
			done(err);
		});

	})

	it('Should Implement Set And Save Method.',(done)=>{

		admins.findOne({_id:id_2}).then((result)=>{
			result.set({password:"1516"});
			return result.save();
		}).then((result)=>{
			admins.findOne({_id:id_2}).then((result)=>{
				expect(result.password).toBe("1516");
				done();
			}).catch((err)=>{
				done(err);
			})
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Implement Model Instance Update Method.",(done)=>{

		admins.findOne({_id:id_1}).then((result)=>{
			return result.update({username:"akshitgrover"});
		}).then((result)=>{
			admins.findOne({username:"akshitgrover"}).then((result)=>{
				expect(result.password).toBe("1516");
				done();
			}).catch((err)=>{
				done(err);
			})
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Implement Class Based Update Method.",(done)=>{

		admins.update({_id:id_2},{password:"1516"}).then((result)=>{
			expect(result.n).toBe(1);
			done();
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Implement Class Based FindById And Update Method.",(done)=>{

		admins.findByIdAndUpdate(id_1,{username:"akshitgrover"}).then((result)=>{
			admins.findById(id_1).then((result)=>{
				expect(result.username).toBe("akshitgrover");
				done();
			}).catch((err)=>{
				done(err);
			})
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Implement Class Based FindOne And Remove Method.",(done)=>{

		admins.findOneAndUpdate({username:"Deathadder"},{password:"1516"}).then((result)=>{
			admins.findOne({username:"Deathadder"}).then((result)=>{
				expect(result.password).toBe("1516");
				done();
			}).catch((err)=>{
				done(err);
			})
		}).catch((err)=>{
			done(err);
		});

	});

});