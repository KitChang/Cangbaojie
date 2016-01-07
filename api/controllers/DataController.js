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
        var dateFromStr = req.param('dateFrom');
        var dateToStr = req.param('dateTo');
        var client = req.param('client');
        dateFrom = moment(dateFromStr, "MM/DD/YYYY").startOf('day').toDate();
        dateTo = moment(dateToStr, "MM/DD/YYYY").endOf('day').toDate();
        if(!city){
            res.view('data-access-region', {resultArr: []});
            return;
        }else{
            var option = {state: state, city: city, createdAt: {"<": dateTo, ">": dateFrom}};
            if(client){
                option.client = client;
            }
            access.find(option).exec(function(err, resultArr){
                if(err)
                        return res.serverError(err);
                res.view('data-access-region', {resultArr: resultArr});
        });
        }
    },
    accessCategory: function(req, res){
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        var dateFromStr = req.param('dateFrom');
        var dateToStr = req.param('dateTo');
        var client = req.param('client');
        dateFrom = moment(dateFromStr, "MM/DD/YYYY").startOf('day').toDate();
        dateTo = moment(dateToStr, "MM/DD/YYYY").endOf('day').toDate();
        if(!city){
            res.view('data-access-category', {resultArr: []});
            return;
        }
        else{
            var option = {state: state, city: city, createdAt: {"<": dateTo, ">": dateFrom}};
            if(client){
                option.client = client;
            }
            access.find(option).exec(function(err, resultArr){
                if(err)
                        return res.serverError(err);
                res.view('data-access-category', {resultArr: resultArr});
        });
        }
    },
    accessRegionClient: function(req, res){
          client.find().exec(function(err, resultArr){
            if(err)
                    return res.serverError(err);
            res.view('data-access-region-client', {resultArr: resultArr});
            });
    },
    accessCategoryClient: function(req, res){
          client.find().exec(function(err, resultArr){
            if(err)
                    return res.serverError(err);
            res.view('data-access-category-client', {resultArr: resultArr});
            });
    },
    accessStreet: function(req, res){
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        if(!city){
            res.view('data-access-street', {resultArr: []});
            return;
        }else{
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
    prizeStockClient: function(req, res){
          client.find().exec(function(err, resultArr){
            if(err)
                    return res.serverError(err);
            res.view('data-prize-stock-client', {resultArr: resultArr});
            });
    },
    prizeStock: function(req, res){
        var clientId = req.param('client');
        advertisement.find({client: clientId}).exec(function(err, ads){
            console.log("ads l:"+ads.length);
            res.view('data-prize-stock', {ads: ads, selectedAd: null});
        });
    },
    prizeStockSearch: function(req, res){
        var addId = req.param('advertisement');
        var clientId = req.param('client');
        console.log("client: "+clientId);
        advertisement.find({client: clientId}).exec(function(err, ads){
            console.log("ads l:"+ads.length);
            advertisement.findOne({id: addId}).exec(function(err, ad){
                console.log("ads l:"+ads.length);
                res.view('data-prize-stock', {ads: ads, selectedAd: ad});
            })
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
    },
    appUser: function (req, res){
        var sex = req.param("sex");
        var option = {};
        if(sex&&sex!=""){
            option.sex = sex;
        }
        AppUser.find(option).exec(function(err, appUserArr){
            res.view('data-AppUser', {appUserArr: appUserArr});
        });
    }, 
    appUserStatistics: function (req, res){
        AppUser.find().exec(function(err, appUserArr){
            AppUser.find({sex: "1"}).exec(function(err, maleAppUserArr){
                var monthAgo = moment().subtract(30, 'days').toDate();
                AppUser.find({createdAt: {">": monthAgo}}).exec(function(err, newAppUserArr){
                    access.find({createdAt: {">": monthAgo}}).exec(function(err, accessArr){
                        var activeAppUserArr = [];
                        while(accessArr.length){
                            var accessOne = accessArr.pop();
                            var appUserId = accessOne.appUser;
                            activeAppUserArr[appUserId] = null;
                            var activeAppUserKeys = Object.keys(activeAppUserArr);
                        }
                        var totalUsers = appUserArr.length;
                        var maleUsers = maleAppUserArr.length;
                        var femaleUsers = totalUsers - maleUsers;
                        var newUsers = newAppUserArr.length;
                        var oldUsers = totalUsers - newUsers;
                        var activeUsers = activeAppUserKeys.length;
                        var inactiveUsers = totalUsers - activeUsers;
                        
                        res.view('data-AppUser-statistics', {totalUsers: totalUsers, maleUsers: maleUsers, femaleUsers: femaleUsers, newUsers: newUsers, oldUsers: oldUsers, activeUsers: activeUsers, inactiveUsers: inactiveUsers});
                        
                        
                        
                        
                        
                    })
                })
                
            })
        });
    }
    
    
};

