/**
* Request.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'request',
  attributes: {
      client: {model: 'client'},
      status: {type: 'string', enum: ['open', 'process', 'closed'], defaultsTo: 'open', required: true},
      state: {type: 'string', defaultsTo: ''},
      city: {type: 'string', defaultsTo: ''},
      region: {type: 'string', defaultsTo: ''},
      street: {type: 'string', defaultsTo: ''}
  }
};

