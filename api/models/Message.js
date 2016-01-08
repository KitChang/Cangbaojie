/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'message',
  attributes: {
      client: {model: 'client'},
      status: {type: 'string', enum: ['open', 'closed', 'process'], required: true},
      user: {model: 'User_client'},
      deleted: {
          type: 'boolean',
          required: true,
          defaultsTo: false
      }
  }
};

