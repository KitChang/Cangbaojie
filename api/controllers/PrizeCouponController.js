/**
 * PrizeCouponController
 *
 * @description :: Server-side logic for managing Prizecoupons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
        var advertisementId = req.param("advertisement");
        PrizeCoupon.find({advertisement: advertisementId}).populate('appUser').populate('advertisement').exec(function(err, resultArr){
            if(err){
                console.log(err);
                return;
            }
            res.view('prize-coupon', {resultArr: resultArr});
        });
    },
    advertisement: function(req, res){
        advertisement.find().populate('client').exec(function(err, resultArr){
            
            if(err){
                return res.serverError(err);
            }
            
            res.view('prize-coupon-advertisement', {resultArr: resultArr});
        })
    },
    destroy: function(req, res){
//        PrizeCoupon.destroy().exec(function(err){
//            res.end();
//            return;
//        });
    }
};

