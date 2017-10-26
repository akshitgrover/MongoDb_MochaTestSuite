var {users} = require('./helper.js');
var {ObjectId} = require('./helper.js').mongoose.Types;

var expect = require('expect');

describe('Create Functions:',()=>{

	beforeEach((done)=>{

		users.remove({}).then(()=>{
			done();
		},(err)=>{
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

});