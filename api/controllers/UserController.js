/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	signUp: function(req, res){
		var username = req.param('username');
		var password = req.param('password');
		var email = req.param('email');
		var encryptedPassword;
		
		require('machinepack-passwords').encryptPassword({
			password: password
		}).exec({
			
			error: function(err) {
				return res.negotiate(err);
			},
			
			success: function(encryptedPassword) {
				User.create({
					username: username,
					encryptedPassword: encryptedPassword,
					email: email
				}, function(err, user){
					if(err) {
						return res.negotiate(err);
					} else {
						//store in session and return stripped down user info
						req.session.me = _.pick(user, ['firstName', 'id', 'lab']);
						res.ok(req.session.me);
					} 
				});
			}
		
		});
	},

	signIn: function(req, res) {
		var username = req.param('username');
		var password = req.param('password');

		User
		.findOne({username: username})
		.then(function(user) {

			if(!user) return res.notFound({status: 'user not found'});

			require('machinepack-passwords').checkPassword({
				passwordAttempt: password,
				encryptedPassword: user.encryptedPassword
			})
			.exec({
				error: function(err) {
					res.negotiate(err); 
				},

				success: function() {
						//store stripped down user info in session and return it
						req.session.me = _.pick(user, ['firstName', 'id', 'lab']);
						res.ok(req.session.me);
				},
				
				incorrect: function() {
					res.notFound({status: 'bad password'}); 
				}
			});

		})
		.catch(function(err) {
			res.negotiate(err); 
		});
	},

	signOut: function(req, res) {
		req.session.destroy(function(err){
			if(err) {
				return res.negotiate(err);
			} else {
				return res.ok({status: 'user signed out'});
			}
		});
	},

	checkUserStatus: function(req, res) {
		if (!req.session.me) {
			return res.ok({status: 'not signed in'});
		} else {
			//if session.me exist then return it 
			return res.ok(req.session.me);
		} 
	},

	getBasicData: function(req, res) {
		if (!req.session.me) {
			return res.ok('not signed in'); 
		}
		else {
			User
			.findOne({id: req.session.me})
			.then(function(user){
				if(_.isEmpty(user)) {
					return res.notFound('No such user'); 
				} else {
					//strip out exess user data and password info!!
					user = _.pick(user, ['firstName', 'id', 'lab']);
					return res.ok(user);
				}
			}) 
			.catch(function(err){
			res.negotiate(err); 
		});
		}
	}

	
};

