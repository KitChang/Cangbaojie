/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');
moment.locale('zh-cn');
module.exports = {
	dashboard: function(req, res){
        console.log(sails.config.ibeaconMacaoApiHost);
        var yesterdayUTC = moment().subtract(1, 'days').utc().format("YYYY-MM-DD HH:mm:ss");
        request.find({status: ["未审查", "处理中"]}).populate('client').populate('advertisement').exec(function(err, requests){
            var yesterdayStr = moment().subtract(1, 'days').format('MM/DD/YYYY');
            YesterdayData.findOne({date: yesterdayStr}).exec(function(err, yesterdayDataOne){
                advertisement.find({limit: 5, sort: 'expiredDate ASC'}).populate('client').exec(function(err, advertisementsExpire){
                    
                    client.find({limit: 5, sort: 'account DESC'}).exec(function(err, clientsAccount){
                        var durationStr = moment().subtract(30, 'days').utc().format("YYYY-MM-DD HH:mm:ss");
                        DeviceMonitor.find({limit: 5, sort: 'accessDate ASC', accessDate: {'<': durationStr}}).exec(function(err, faultDevices){
                            client.find({limit: 5, sort: 'accessCount ASC'}).exec(function(err, clientsAccess){
                                res.view('dashboard', {requests: requests, yesterdayData: yesterdayDataOne, advertisementsExpire: advertisementsExpire, moment: moment, clientsAccount: clientsAccount, faultDevices: faultDevices, clientsAccess: clientsAccess});
                            });
                        });
                    });
                });
            });
        });
    },
    generateYesterdayData: function(req, res){
        var yesterday = moment().subtract(1, 'days').format('MM/DD/YYYY');
        var yesterdayUTC = moment().subtract(1, 'days').utc().format("YYYY-MM-DD HH:mm:ss");
        AppUser.find({createdAt: {'<': yesterdayUTC}}).exec(function(err, appUsers){
            var totalAppUsers = appUsers.length;
            var moment = require('moment');
            var past = moment().subtract(10, 'days').utc().format("YYYY-MM-DD HH:mm:ss");
            AppUser.find({createdAt: {'>': past, '<': yesterdayUTC}}).exec(function(err, newAppUsers){
                var totalNewAppUsers = newAppUsers.length;
                access.find({createdAt: {'<': yesterdayUTC}}).populate("advertisement").exec(function(err, accessArr){
                    var totalAccess = accessArr.length;
                    var accessOne;
                    var totalChargedAccess = 0;
                    while(accessArr.length){
                        accessOne = accessArr.pop();
                        var ad = accessOne.advertisement;
                        if(ad!=null){
                            var pricePerClick = ad.pricePerClick;
                        console.log("price per click: "+pricePerClick);
                        if(isNaN(pricePerClick) || pricePerClick.replace(/ /g, "")==""){
                            pricePerClick = 0.00;
                        }else{
                            pricePerClick = parseFloat(pricePerClick);
                        }
                            totalChargedAccess += pricePerClick;
                        }
                    }
                    YesterdayData.create({totalAppUsers: totalAppUsers, totalNewAppUsers: totalNewAppUsers, totalAccess: totalAccess, totalChargedAccess: totalChargedAccess, date:  yesterday}).exec(function(err, data){
                        if(err){
                            return res.serverError(err);
                        }
                        res.redirect("/");
                    });
                })
            })
        })
    },
    payDeadline: function(req, res){
        var day = getRandom(1, 30);
        var deadLine = moment().subtract(day, 'days').toDate();
        var payDate = moment().subtract(30, 'days').toDate();
        var account = getRandom(10, 2000);
        client.update({}, {payDeadline: deadLine, payDate: payDate, account: account}).exec(function(err, clients){
            res.end();
            return;
            
        });
        
    },
    updateStreet: function(req, res){
        access.update({}, {street: "南屏镇"}).exec(function(err){
            res.end();
        });
    },
    updateRequestRead: function(req, res){
        request.update({}, {read: false}).exec(function(err){
           res.end(); 
        });
    },
    destroy: function(req, res){
        
        YesterdayData.destroy().exec(function(err){
            res.end();
        })
    },
    initialDeviceMonitor: function(req, res){
        client.update({}, {accessCount: 0, payAccessCount: 0}).exec(function(err){
            res.end();
        });
    },
        destroyDeviceMonitor: function(req, res){
        DeviceMonitor.destroy().exec(function(){
            res.end();
        })
        
    },
    faultDevice: function(req, res){
        var past = moment().subtract(32, 'days').toDate();
        DeviceMonitor.update({},{accessDate: past }).exec(function(){
            res.end();
        })
    }

    
};

