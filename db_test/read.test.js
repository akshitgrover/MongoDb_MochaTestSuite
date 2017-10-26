var {users} = require('./helper.js');
var {ObjectId} = require('./helper.js').mongoose.Types;

var expect = require('expect');


describe('Read Functions:',()=>{

	let id_1,id_2;

	beforeEach((done)=>{

		users.remove({}).then((result)=>{
			users.create([{name:'akshitgrover'},{name:'Deathadder'}]).then((result)=>{
				id_1 = result[0]._id;
				id_2 = result[1]._id;
				done();
			},(err)=>{
				done(err);
			});
		},(err)=>{
			done(err);
		});

	});

	it('Should Implement Class Based FindOne Method.',(done)=>{

		users.findOne({name:'Deathadder'}).then((result)=>{
	
			expect(result._id).toEqual(id_2);
			return users.findOne({_id:id_1});
	
		}).then((result)=>{

			expect(result.name).toBe('akshitgrover');
			done();

		}).catch((err)=>{
	
			done(err);
	
		});

	});

});