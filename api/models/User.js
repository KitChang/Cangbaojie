/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'user',
  attributes: {
      deleted: {
          type: 'boolean',
          required: true,
          defaultsTo: false
      }
  }
};

