/**
* ClientImage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'ClientImage',
  attributes: {
      replaced: {type: 'boolean', defaultsTo: false, required:true},
      imagePublicId: {type: 'string', required: true},
      imageFormat: {type: 'string'},
      client: {model: 'client'}
  }
};

