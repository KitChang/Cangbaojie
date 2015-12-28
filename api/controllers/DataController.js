/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Device = require("../lib/device");
var moment = require("moment");
module.exports = {
	access: function(req, res){
        var id = req.param('id');
        advertisement.findOne({id: id}).exec(function(err, result){
            if(err)
                return res.serverError(err);
            access.find({advertisement: id}).exec(function(err, resultArr){
                if(err)
                    return res.serverError(err);
                res.view('data-access', {resultArr: resultArr, advertisement: result});
            });
        });
        
    },
    advertisement: function(req, res){
        advertisement.find().populate('client').populate('advertisementImage').exec(function(err, resultArr){
            if(err)
                    return res.serverError(err);
            res.view('data-access-advertisement', {resultArr: resultArr});
        });
    },
    accessRegion: function(req, res){
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        if(!city)
            res.view('data-access-region', {resultArr: []});
        else{
            access.find({state: state, city: city}).exec(function(err, resultArr){
                if(err)
                        return res.serverError(err);
                res.view('data-access-region', {resultArr: resultArr});
        });
        }
    },
    accessStreet: function(req, res){
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        if(!city)
            res.view('data-access-street', {resultArr: []});
        else{
            access.find({state: state, city: city, region: region}).exec(function(err, resultArr)             {
                if(err)
                        return res.serverError(err);
                res.view('data-access-street', {resultArr: resultArr});
            });
        }
    },
    accessDevice: function(req, res){
        var locationType = req.param('locationType');
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        var street = req.param('street');
        var option = {};
        if(locationType&&locationType!=""){
            option.locationType = locationType;
        }
        if (state&&state!="") {
            option.state = state;
        }
        if (city&&city!="") {
            option.city = city;
        }
        if(region&&region!=""){
            option.region = region;
        }
        if(street&&street!=""){
            option.street = street;
        }
        Device.search(option, function(err, resultArr){
            if(err)
                    return res.serverError(err);
            res.view('data-access-device', {resultArr: resultArr});
        });
        
    },
    
    prizeStockAdvertisement: function(req, res){
        advertisement.find().exec(function(err, resultArr){
            if(err)
                    return res.serverError(err);
            res.view('data-prize-stock-advertisement', {resultArr: resultArr});
        });
    },
    prizeWinnerAdvertisement: function(req, res){
          advertisement.find().populate('client').exec(function(err, resultArr){
            if(err)
                    return res.serverError(err);
            res.view('data-prize-winner-advertisement', {resultArr: resultArr});
            });
    },
    prizeWinner: function(req, res){
        var advertisementId = req.param('advertisement');
        PrizeCoupon.find({advertisement: advertisementId}).populate('appUser').exec(function(err, resultArr){
            if(err)
                    return res.serverError(err);
            
            res.view('data-prize-winner', {resultArr: resultArr, moment: moment});
        });
    },
    prizeWinnerSearch: function(req, res){
        
        advertisement.find().exec(function(err, advertisements){
            var advertisementId = req.param('advertisement');
            var prize = req.param('prize');
            
            var find = {};
            find.advertisement = advertisementId;
            if(prize!="all")
                find.prize = prize;
            winner.find(find).populate('app_user').exec(function(err, resultArr){
                if(err)
                    return res.serverError(err);
                res.view('data-prize-winner', {resultArr: resultArr, ads: advertisements, moment: moment});
            });
            
        });
    }
    
    
};

