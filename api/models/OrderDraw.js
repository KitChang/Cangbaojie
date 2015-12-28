/**
* OrderDraw.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  identity: 'OrderDraw',
  attributes: {
      advertisement: {
          model: 'advertisement'
      },
    drawCountLowerBound: {type: 'integer', defaultsTo: 0},
    drawCountUpperBound: {type: 'integer', defaultsTo: 0},
    firstPrizeRange: {type: 'integer', defaultsTo: 0},
    secondPrizeRange: {type: 'integer', defaultsTo: 0},
    thirdPrizeRange: {type: 'integer', defaultsTo: 0},
    fourthPrizeRange: {type: 'integer', defaultsTo: 0},
    fifthPrizeRange: {type: 'integer', defaultsTo: 0}
  }
};

