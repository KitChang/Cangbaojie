/**
* AppUser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'AppUser',
  attributes: {
    authen_type: 'string',
        username: 'string',
        nickname: 'string',
        sex: 'string',
        phone: 'string'
  }
};
