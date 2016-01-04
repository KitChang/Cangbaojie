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
        var yesterdayDate = moment().subtract(1, 'days').toDate();
        request.find({status: ["open", "process"]}).populate('client').exec(function(err, requests){
            var yesterdayStr = moment().subtract(1, 'days').format('MM/DD/YYYY');
            YesterdayData.findOne({date: yesterdayStr}).exec(function(err, yesterdayDataOne){
                advertisement.find({limit: 5, sort: 'expiredDate DESC'}).populate('client').exec(function(err, advertisementsExpire){
                    client.find({limit: 5, sort: 'account DESC'}).exec(function(err, clientsAccount){
                        var durationDate = moment().subtract(30, 'days').toDate();
                        DeviceMonitor.find({limit: 5, sort: 'accessDate ASC', accessDate: {'<': durationDate}, verifiedDate: {"<": durationDate}}).exec(function(err, faultDevices){
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
        var yesterdayDate = moment().subtract(1, 'days').endOf('day').toDate();
        AppUser.find({createdAt: {'<': yesterdayDate}}).exec(function(err, appUsers){
            var totalAppUsers = 0;
            if(appUsers)
                totalAppUsers = appUsers.length;
            var yesterdayStart = moment().subtract(1, 'days').startOf('day').toDate();
            var yesterdayEnd = moment().subtract(1, 'days').endOf('day').toDate();
            
            AppUser.find({createdAt: {'>=': yesterdayStart, '<': yesterdayEnd}}).exec(function(err, newAppUsers){
                var totalNewAppUsers = newAppUsers.length;
                access.find({createdAt: {'>=': yesterdayStart, '<': yesterdayEnd}}).populate("advertisement").exec(function(err, accessArr){
                    var totalAccess = accessArr.length;
                    var accessOne;
                    var totalCharged = 0;
                    while(accessArr.length){
                        accessOne = accessArr.pop();
                        var ad = accessOne.advertisement;
                        if(ad!=null){
                            var pricePerClick = ad.pricePerClick;
                            totalCharged += pricePerClick;
                        }
                    }
                    YesterdayData.create({totalAppUsers: totalAppUsers, totalNewAppUsers: totalNewAppUsers, totalAccess: totalAccess, totalCharged: totalCharged, date:  yesterday}).exec(function(err, data){
                        if(err){
                            return res.serverError(err);
                        }
                        res.redirect("/");
                    });
                })
            })
        })
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
        DeviceMonitor.update({},{accessDate: past, verifiedDate: past }).exec(function(){
            res.end();
        })
    },
    destroyAccess: function(req, res){
        access.update({}, {appUser: "5681d2bc58b891ee3e2d386d"}).exec(function(err){
            res.end();
        });
    },
    message: function(req, res){
        message.find({status: ['open', 'process'], limit: 5, sort: 'createdAt ASC'}).populate('client').exec(function(err, messages){
            res.view('dashboard-message', {messages: messages, moment: moment});
        });
    },
   topupRequest: function(req, res){
        TopupRequest.find({status: ['open', 'process'], limit: 5, sort: 'createdAt ASC'}).populate('client').exec(function(err, requests){
            res.view('dashboard-topup-request', {requests: requests, moment: moment});
        });
    }

    
};

