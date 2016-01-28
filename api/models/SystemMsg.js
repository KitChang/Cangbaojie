/**
* SystemMsg.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'SystemMsg',
  attributes: {
      title: {type: 'string', required: true},
      content: {type: 'string', required: true},
      expiredAt: {type: 'date'},
      effectiveAt: {type: 'date'},
      deleted: {
          type: 'boolean',
          required: true,
          defaultsTo: false
      }
  }
};

