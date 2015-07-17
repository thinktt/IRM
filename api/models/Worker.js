/**
* Worker.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,

  attributes: {
  	lab: {
  		type: 'string'
  	},
  	
  	name: {
  		type: 'string'
  	},

  	schedulerID: {
  		type: 'number'
  	},

  	incidents: {
  		collection: 'incident',
  		via: 'worker'
  	}

  }
};

