/**
 * ProbabilityDrawController
 *
 * @description :: Server-side logic for managing Probabilitydraws
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
        var advertisementId = req.param("advertisement");
        advertisement.findOne({id: advertisementId}).exec(function(err, ad){
            ProbabilityDraw.find({advertisement: advertisementId}).exec(function(err, resultArr){
                if(err){
                    res.serverError(err);
                    return;
                }
                res.view('probability-draw', {resultArr: resultArr, advertisement: ad});
            });
            
        });
        
    },
    create: function(req, res){
        var advertisementId = req.param('advertisement');
        var firstPrizeProbability = req.param('firstPrizeProbability');
        var secondPrizeProbability = req.param('secondPrizeProbability');
        var thirdPrizeProbability = req.param('thirdPrizeProbability');
        var fourthPrizeProbability = req.param('thirdPrizeProbability');
        var fifthPrizeProbability = req.param('fifthPrizeProbability');
        
        ProbabilityDraw.create({advertisement: advertisementId, firstPrizeProbability: firstPrizeProbability, secondPrizeProbability: secondPrizeProbability, thirdPrizeProbability: thirdPrizeProbability, fourthPrizeProbability: fourthPrizeProbability, fifthPrizeProbability: fifthPrizeProbability }).exec(function(err, probDraw){
            if(err){
                console.log(err);
                res.serverError(err);
                return;
            }
            advertisement.update({id: advertisementId }, {probabilityDraw: probDraw.id }).exec(function(err, ad){
                res.redirect('/ProbabilityDraw/edit?advertisement='+advertisementId+"&probabilityDraw="+probDraw.id);
            });
            console.log("38");
        });
    },
    update: function(req, res){
        
        var advertisementId = req.param('advertisement');
        var probabilityDrawId = req.param('id');
        var firstPrizeProbability = req.param('firstPrizeProbability');
        var secondPrizeProbability = req.param('secondPrizeProbability');
        var thirdPrizeProbability = req.param('thirdPrizeProbability');
        var fourthPrizeProbability = req.param('thirdPrizeProbability');
        var fifthPrizeProbability = req.param('fifthPrizeProbability');
        ProbabilityDraw.update({id: probabilityDrawId}, { firstPrizeProbability: firstPrizeProbability, secondPrizeProbability: secondPrizeProbability, thirdPrizeProbability: thirdPrizeProbability, fourthPrizeProbability: fourthPrizeProbability, fifthPrizeProbability: fifthPrizeProbability }).exec(function(err, probDraw){
            if(err){
                console.log(err);
                res.serverError(err);
                return;
            }
            res.redirect('/ProbabilityDraw/edit?advertisement='+advertisementId+"&probabilityDraw="+probabilityDrawId);
        });
    },
    edit: function(req, res){
        var advertisementId = req.param('advertisement');
        var probabilityDrawId = req.param('probabilityDraw');
        advertisement.findOne({id: advertisementId}).exec(function(err, ad){
            var numberOfPrize = ad.numberOfPrize;
            if(probabilityDrawId==null)
            res.view('probability-draw-new', {advertisement: ad, numberOfPrize});
        else{
            ProbabilityDraw.findOne({id: probabilityDrawId}).exec(function(err, result){
                if(err){
                    res.serverError(err);
                    return;
                }   
                res.view('probability-draw-one', {result: result, numberOfPrize: numberOfPrize, advertisement: ad});
            });
        }
        });
    },
    destroy: function(req, res){
        var id = req.param("id");
        var advertisementId = req.param("advertisement");
        ProbabilityDraw.destroy({id: id}).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }      
            res.redirect('/ProbabilityDraw?advertisement='+advertisementId);
        })
    }
    
};
