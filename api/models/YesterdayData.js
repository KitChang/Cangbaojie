/**
* YesterdayData.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'YesterdayData', 
  attributes: {
      totalAppUsers: {type: 'integer'},
      totalNewAppUsers: {type: 'integer'},
      totalAccess: {type: 'integer'},
      totalChargedAccess: {type: 'float'},
      date: {type: 'string', unique: true}
  }
};

