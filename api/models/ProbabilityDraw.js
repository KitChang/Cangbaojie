/**
* ProbabilityDraw.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'ProbabilityDraw',
  attributes: {
      firstPrizeProbability: {type: 'float', defaultsTo: 0.0, required: true},
      secondPrizeProbability: {type: 'float', defaultsTo: 0.0, required: true},
      thirdPrizeProbability: {type: 'float', defaultsTo: 0.0, required: true},
      fourthPrizeProbability: {type: 'float', defaultsTo: 0.0, required: true},
      fifthPrizeProbability: {type: 'float', defaultsTo: 0.0, required: true}
  }
};

