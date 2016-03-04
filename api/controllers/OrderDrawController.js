/**
 * OrderDrawController
 *
 * @description :: Server-side logic for managing Orderdraws
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
        var advertisementId = req.param("advertisement");
        advertisement.findOne({id: advertisementId}).exec(function(err, ad){
            if(err){
                res.serverError(err);
                return;
            }
            var drawCount = 0;
            if(ad){
                drawCount = ad.drawCount;
                if(typeof drawCount == undefined)
                    drawCount = 0;
            }
            OrderDraw.find({advertisement: advertisementId}).exec(function(err, resultArr){
            if(err){
                res.serverError(err);
                return;
            }
            res.view('order-draw', {resultArr: resultArr, drawCount: drawCount});
        });
        });

    },
    create: function(req, res){
        var advertisementId = req.param('advertisement');
        var drawCountLowerBound = req.param('drawCountLowerBound');
        var drawCountUpperBound = req.param('drawCountUpperBound');
        var firstPrizeRange = req.param('firstPrizeRange');
        var secondPrizeRange = req.param('secondPrizeRange');
        var thirdPrizeRange = req.param('thirdPrizeRange');
        var fourthPrizeRange = req.param('fourthPrizeRange');
        var fifthPrizeRange = req.param('fifthPrizeRange');
        advertisement.findOne({id: advertisementId}).exec(function(err, ad){
            if(err){
                res.serverError(err);
                return;
            }
            if(ad==null){
                res.serverError(err);
                return;
            }
            OrderDraw.create({advertisement: advertisementId, drawCountLowerBound: drawCountLowerBound, drawCountUpperBound: drawCountUpperBound, firstPrizeRange: firstPrizeRange, secondPrizeRange: secondPrizeRange, thirdPrizeRange: thirdPrizeRange, fourthPrizeRange: fourthPrizeRange, fifthPrizeRange: fifthPrizeRange}).exec(function(err){
                if(err){
                    res.serverError(err);
                    return;
                }

                res.redirect('/OrderDraw?advertisement='+advertisementId);
            });
        });
    },
    new: function(req, res){
        var advertisementId = req.param('advertisement');
				OrderDraw.find({advertisement: advertisementId}).exec(function(err, oDraw){
					var firstPrizeRangeSum = 0, secondPrizeRangeSum = 0, thirdPrizeRangeSum = 0, fourthPrizeRangeSum =0 , fifthPrizeRangeSum = 0;
					while(oDraw.length){
						var od = oDraw.pop();
						firstPrizeRangeSum += od.firstPrizeRange;
						secondPrizeRangeSum += od.secondPrizeRange;
						thirdPrizeRangeSum += od.thirdPrizeRange;
						fourthPrizeRangeSum += od.fourthPrizeRange;
						fifthPrizeRangeSum  += od.fifthPrizeRange;
					}
					advertisement.findOne({id: advertisementId}).exec(function(err, ad){
						  if(err){
	                res.serverError(err);
	                return;
	            }
							var firstPrizeQuantity = ad.firstPrizeQuantity;
							var secondPrizeQuantity = ad.secondPrizeQuantity;
							var thirdPrizeQuantity = ad.thirdPrizeQuantity;
							var fourthPrizeQuantity = ad.fourthPrizeQuantity;
							var fifthPrizeQuantity = ad.fifthPrizeQuantity;
	            res.view('order-draw-new', {advertisement: ad, firstPrizeRangeSum: firstPrizeRangeSum, secondPrizeRangeSum: secondPrizeRangeSum, thirdPrizeRangeSum: thirdPrizeRangeSum, fourthPrizeRangeSum: fourthPrizeRangeSum, fifthPrizeRangeSum: fifthPrizeRangeSum, firstPrizeQuantity: firstPrizeQuantity, secondPrizeQuantity: secondPrizeQuantity, thirdPrizeQuantity: thirdPrizeQuantity, fourthPrizeQuantity: fourthPrizeQuantity, fifthPrizeQuantity: fifthPrizeQuantity});
	        });
				});


    },
    destroy: function(req, res){
        var id = req.param("id");
        var advertisementId = req.param("advertisement");

        OrderDraw.destroy({id: id}).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }

            res.redirect('/OrderDraw?advertisement='+advertisementId);
        })
    }

};
