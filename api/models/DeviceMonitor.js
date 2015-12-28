/**
* DeviceMonitor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: "DeviceMonitor",
  attributes: {
    device: {type: 'string', required: true},
    accessDate: {type: 'date', required: true},
    status: {type: 'string', enum: ['open', 'end', 'process'], defaultsTo: 'open', required: true}
  }
};

