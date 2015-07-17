/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

  attributes: {
  	by: {
  		model: 'user' //User ID
  	},

  	incident: {
  		model: 'incident'
  	},

 		subject: {
 			type: 'string'
 		},

 		body: {
 			type: 'string'
 		}

  }
};

