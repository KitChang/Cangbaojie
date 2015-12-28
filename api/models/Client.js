/**
* Client.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'client',
  attributes: {
      name: {type: 'string', required: true},
      contactPerson: {type: 'string'},
      mobilePhone: {type: 'string'},
      phone: {type: 'string'},
      fax: {type: 'string'},
      email: {type: 'string'},
      address: {type: 'string'},
      companyIntroduction: {type: 'string', required: true},
      account: {type: 'float', required: true, defaultsTo: 0.00},
      accessCount: {type: 'integer', defaultsTo: 0, required: true}
  }
};
