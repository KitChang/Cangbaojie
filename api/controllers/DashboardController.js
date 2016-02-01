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
            if(err){
                    res.serverError(err);
                    return;
            }
            var yesterdayStr = moment().subtract(1, 'days').format('MM/DD/YYYY');
            YesterdayData.findOne({date: yesterdayStr}).exec(function(err, yesterdayDataOne){
                if(err){
                    res.serverError(err);
                    return;
                }
                advertisement.find({limit: 5, sort: 'expiredDate DESC'}).populate('client').exec(function(err, advertisementsExpire){
                    if(err){
                        res.serverError(err);
                        return;
                    }
                    client.find({limit: 5, sort: 'account DESC'}).exec(function(err, clientsAccount){
                        if(err){
                            res.serverError(err);
                            return;
                        }
                        var durationDate = moment().subtract(30, 'days').toDate();
                        DeviceMonitor.find({limit: 5, sort: 'accessDate ASC', accessDate: {'<': durationDate}, verifiedDate: {"<": durationDate}}).exec(function(err, faultDevices){
                            if(err){
                                res.serverError(err);
                                return;
                            }
                            client.find({limit: 4, sort: 'accessCount ASC'}).exec(function(err, clientsAccess){
                                if(err){
                                    res.serverError(err);
                                    return;
                                }
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
            if(err){
                    res.serverError(err);
                    return;
            }
            var totalAppUsers = 0;
            if(appUsers)
                totalAppUsers = appUsers.length;
            var yesterdayStart = moment().subtract(1, 'days').startOf('day').toDate();
            var yesterdayEnd = moment().subtract(1, 'days').endOf('day').toDate();
            
            AppUser.find({createdAt: {'>=': yesterdayStart, '<': yesterdayEnd}}).exec(function(err, newAppUsers){
                if(err){
                    res.serverError(err);
                    return;
                }
                var totalNewAppUsers = newAppUsers.length;
                access.find({createdAt: {'>=': yesterdayStart, '<': yesterdayEnd}}).populate("advertisement").exec(function(err, accessArr){
                    if(err){
                        res.serverError(err);
                        return;
                    }
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
    initialDeviceMonitor: function(req, res){
        client.update({}, {accessCount: 0, payAccessCount: 0}).exec(function(err){
            if(err){
                    res.serverError(err);
                    return;
            }
            res.end();
        });
    },
    message: function(req, res){
        message.find({status: ['open', 'process'], limit: 5, sort: 'createdAt DESC'}).populate('client').exec(function(err, messages){
            if(err){
                    res.serverError(err);
                    return;
            }
            res.view('dashboard-message', {messages: messages, moment: moment});
        });
    },
   topupRequest: function(req, res){
        TopupRequest.find({status: ['open', 'process'], limit: 5, sort: 'createdAt DESC'}).populate('client').exec(function(err, requests){
            if(err){
                    res.serverError(err);
                    return;
            }
            res.view('dashboard-topup-request', {requests: requests, moment: moment});
        });
    }

    
};

