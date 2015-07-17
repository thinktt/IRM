/**
* Incident.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,

  attributes: {
  
  	reportedBy: {
  		model: 'user',
  		required: true
  	},

  	worker: {
  		model: 'worker',
      required: true
  	},

    comments: {
      collection: 'comment',
      via: 'incident'
    },

  	station: {
  		type: 'string'
  	},

  	shiftStart: {
  		type: 'string'
  	},

  	shiftArrive: {
  		type: 'string'
  	},

  	arrivalStatus: {
  		type: 'string'
  	},

  	type: {
  		type: 'string'
  	},

  	openStatus: {
  		type: 'string'
  	},

  	emailSent: {
  		type: 'string'
  	},

  	called: {
  		type: 'string'
  	},

  	reason: {
  		type: 'string'
  	},

  	status: {
  		type: 'string'
  	},

  	meetingDate: {
  		type: 'string'
  	},

  }
};

