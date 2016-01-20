/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Device = require("../lib/device");
var moment = require("moment");
var _ = require("underscore");
module.exports = {
    access: function(req, res){
        var advertisementId = req.param('advertisement');
        var clientId = req.param('client');
        var locationType = req.param('locationType');
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        var street = req.param('street');
        advertisement.find().populate("client").exec(function(err, adArr){
            var clientObj = {};
            for(var i=0; i<adArr.length; i++){
                clientObj[adArr[i].client.id] = adArr[i].client;
            }
            var values = [];
            for(var property in clientObj) {
                values.push(clientObj[property]);
            }
            clientArr = values;
            if(advertisementId==null){
                console.log("85");
                res.view('data-access', {adArr: adArr, clientArr: clientArr, accessCountMonth: null, accessCountDate: null, selectedClient: null, selectedAd: null});
                return;
            }else{
                console.log("88");
                var option = {};
                if(locationType&&locationType!="")
                    option.locationType = locationType;
                if(state&&state!="")
                    option.state = state;
                if(city&&city!="")
                    option.city = city;
                if(street&&street!="")
                    option.street = street;
                if(advertisementId!="")
                    option.advertisement = advertisementId;
                if(clientId!="")
                    option.client = clientId;
                var buttonAction = req.param('buttonAction');
                if(buttonAction=="accessMonth"){
                    var year = req.param("year");
                    var month = req.param("month");
                    var startOfMonthStr = month+"/"+"01"+"/"+year;
                    var startOfMonthDate = moment(startOfMonthStr, "MM/DD/YYYY").startOf('day').toDate();
                    var endOfMonthDate = moment(startOfMonthStr, "MM/DD/YYYY").endOf('month').toDate();
                    console.log(startOfMonthDate+" "+endOfMonthDate);
                    if(startOfMonthDate&&endOfMonthDate)
                        option.createdAt = {">": startOfMonthDate, "<": endOfMonthDate};
                    access.find(option).populate('advertisement').exec(function(err, accessArr){
                        accessObj = _.groupBy(accessArr, function(access){
                            console.log(access.createdAt.getDate());
                            return access.createdAt.getDate();
                        });
                        var accessCountMonth = {};
                        for(var property in accessObj) {
                            accessCountMonth[property] = accessObj[property].length;
                            var sum =0;
                            for(var i=0; i<accessObj[property].length; i++){
                                sum = sum + accessObj[property][i].advertisement.pricePerClick;
                                
                            }
                            accessCountMonth["price-"+property] = sum;
                            console.log("sum: "+sum);
                            console.log(accessCountMonth[property]);
                            console.log("115");
                        }
                        res.view('data-access', {adArr: adArr, clientArr: clientArr, accessCountMonth: accessCountMonth, accessCountDate: null, selectedClient: null, selectedAd: null});
                    });
                }else if(buttonAction=="accessDate"){
                    var dateStr = req.param('date');
                    var accessDateFrom = moment(dateStr, "MM/DD/YYYY").startOf('day').toDate();
                    var accessDateTo = moment(dateStr, "MM/DD/YYYY").endOf('day').toDate();
                    option.createdAt = {">": accessDateFrom, "<": accessDateTo};
                    console.log(option);
                    access.find(option).populate('advertisement').exec(function(err, accessArr){
                        accessObj = _.groupBy(accessArr, function(access){
                            return moment(access.createdAt).hour();
                        });
                        var accessCountDate = {};
                        for(var property in accessObj) {
                            accessCountDate[property] = accessObj[property].length;
                            var sum =0;
                            for(var i=0; i<accessObj[property].length; i++){
                                sum = sum + accessObj[property][i].advertisement.pricePerClick;
                                
                                
                            }
                            accessCountDate["price-"+property] = sum;
                            console.log("sum: "+sum);

                        }
                        res.view('data-access', {adArr: adArr, clientArr: clientArr, accessCountMonth: null, accessCountDate: accessCountDate, selectedClient: null, selectedAd: null});
                    });
                }
                
                
            }
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
        advertisement.find().populate("client").exec(function(err, adArr){
            var clientObj = {};
            for(var i=0; i<adArr.length; i++){
                clientObj[adArr[i].client.id] = adArr[i].client;
            }
            var values = [];
            for(var property in clientObj) {
            values.push(clientObj[property]);
            }
            clientArr = values;
            
            if(!city){
                res.view('data-access-region', {resultArr: [], clientArr: clientArr});
                return;
            }else{
                var option = {state: state, city: city, createdAt: {"<": dateTo, ">": dateFrom}};
                if(client){
                    option.client = client;
                }
                access.find(option).exec(function(err, resultArr){
                    if(err)
                            return res.serverError(err);
                    res.view('data-access-region', {resultArr: resultArr, clientArr: clientArr});
                });
            }
            
            
            
            
            
        });
        
    },
    categoryCompare: function(req, res){
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        var dateFromStr = req.param('dateFrom');
        var dateToStr = req.param('dateTo');
        var client = req.param('client');
        var category = req.param('category');
        dateFrom = moment(dateFromStr, "MM/DD/YYYY").startOf('day').toDate();
        dateTo = moment(dateToStr, "MM/DD/YYYY").endOf('day').toDate();
        advertisement.find().populate("client").exec(function(err, adArr){
            var clientObj = {};
            for(var i=0; i<adArr.length; i++){
                clientObj[adArr[i].client.id] = adArr[i].client;
            }
            var values = [];
            for(var property in clientObj) {
            values.push(clientObj[property]);
            }
            clientArr = values;
            
            if(city==null){
            res.view('data-category-compare', {resultArr: [], clientArr: clientArr});
            return;
            }
            else{
                var option = {state: state, createdAt: {"<": dateTo, ">": dateFrom}};
                if(client){
                    option.client = client;
                }
                if(city&&city!="")
                    option.city = city;
                option.category = category;
                access.find(option).populate('client').exec(function(err, resultArr){
                    if(err)
                            return res.serverError(err);
                    var accessClientObj = _.groupBy(resultArr, function(accessOne){
                        return accessOne.client.name;
                    });
                    var accessClient = {};
                    var accessClientArr = [];
                    for(var property in accessClientObj) {
                        accessClient = {};
                        accessClient.accessCount = accessClientObj[property].length;
                        accessClient.client = property;
                        accessClientArr.push(accessClient);
                    }
                    res.view('data-category-compare', {resultArr: accessClientArr, clientArr: clientArr});
                });
            }
            
        });
        
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
        advertisement.find().populate("client").exec(function(err, adArr){
            var clientObj = {};
            for(var i=0; i<adArr.length; i++){
                clientObj[adArr[i].client.id] = adArr[i].client;
            }
            var values = [];
            for(var property in clientObj) {
            values.push(clientObj[property]);
            }
            clientArr = values;
            
            if(!city){
            var option = {state: state, createdAt: {"<": dateTo, ">": dateFrom}};
                if(client){
                    option.client = client;
                }

                access.find(option).exec(function(err, resultArr){
                    if(err)
                            return res.serverError(err);
                    console.log(resultArr);
                    res.view('data-access-category', {resultArr: resultArr, clientArr: clientArr});
                    });
            }
            else{
                var option = {state: state, city: city, createdAt: {"<": dateTo, ">": dateFrom}};
                if(client){
                    option.client = client;
                }

                access.find(option).exec(function(err, resultArr){
                    if(err)
                            return res.serverError(err);
                    
                    res.view('data-access-category', {resultArr: resultArr, clientArr: clientArr});
            });
            }
        });
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
        var duration = req.param('duration');
        var option = {};
        var accessOption = {};
        if(locationType==null){
            res.view('data-access-device', {resultArr: []});
            return;
        }
        if(locationType&&locationType!=""){
            option.locationType = locationType;
            accessOption.locationType = locationType;
        }
        if (state&&state!="") {
            option.state = state;
            accessOption.state = state;
        }
        if (city&&city!="") {
            option.city = city;
            accessOption.city = city;
        }
        if(region&&region!=""){
            option.region = region;
            accessOption.region = region;
        }
        if(street&&street!=""){
            option.street = street;
            accessOption.street = street;
        }
        var dateFrom, dateTo;
        if(duration=="define"){
            var dateFromStr = req.param('dateFrom');
            var dateToStr = req.param('dateTo');
            dateFrom = moment(dateFromStr, "MM/DD/YYYY").startOf('day').toDate();
            dateTo = moment(dateToStr, "MM/DD/YYYY").endOf('day').toDate();
        }else{
            var dateTo = moment().toDate();
            duration = parseInt(duration);
            if(duration==NaN)
                duration = 0;
            var dateFrom = moment().subtract(duration, "days").toDate();

        }
        if(dateTo&&dateFrom)
            accessOption.createdAt = {"<": dateTo, ">": dateFrom};
        
        access.find(accessOption).exec(function(err, accessArr){
            var accessDevice = _.groupBy(accessArr, function(accessOne){
                return accessOne.device
            });
            Device.search(option, function(err, deviceArr){
            if(err)
                    return res.serverError(err);
            var accessCount = 0;
            for (var i=0; i<deviceArr.length; i++){
                console.log(accessDevice[deviceArr[i].id]);
                if(accessDevice[deviceArr[i].id]==undefined)
                    accessCount = 0;
                else
                    accessCount = accessDevice[deviceArr[i].id].length;
                deviceArr[i].accessCount = accessCount
            }   
            res.view('data-access-device', {resultArr: deviceArr});
            });
        });
        
        
    },
    
    prizeStock: function(req, res){
        var advertisementId = req.param('advertisement');
        advertisement.find().populate("client").exec(function(err, adArr){
            var clientObj = {};
            for(var i=0; i<adArr.length; i++){
                clientObj[adArr[i].client.id] = adArr[i].client;
            }
            var values = [];
            for(var property in clientObj) {
                values.push(clientObj[property]);
            }
            clientArr = values;
            if(advertisementId&&advertisementId!=""){
                
                advertisement.findOne({id: advertisementId}).exec(function(err, ad){
                    
                    res.view('data-prize-stock', {adArr: adArr, selectedAd: ad, clientArr: clientArr});
                    return;
                })
            }
            else{
                res.view('data-prize-stock', {adArr: adArr, selectedAd: null, clientArr: clientArr});
                return;
            }
        });
    },
    
    prizeWinner: function(req, res){
        var advertisementId = req.param('advertisement');
        var prize = req.param('prize');
        var find = {};
        var advertisementId = req.param('advertisement');
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        var street = req.param('street');
        var duration = req.param('duration');
        var dateFrom, dateTo;
        if(duration=="define"){
            var dateFromStr = req.param('dateFrom');
            var dateToStr = req.param('dateTo');
            dateFrom = moment(dateFromStr, "MM/DD/YYYY").startOf('day').toDate();
            dateTo = moment(dateToStr, "MM/DD/YYYY").endOf('day').toDate();
        }else{
            var dateTo = moment().toDate();
            duration = parseInt(duration);
            if(duration==NaN)
                duration = 0;
            var dateFrom = moment().subtract(duration, "days").toDate();
        }
        advertisement.find().populate("client").exec(function(err, adArr){
            var clientObj = {};
            for(var i=0; i<adArr.length; i++){
                clientObj[adArr[i].client.id] = adArr[i].client;
            }
            var values = [];
            for(var property in clientObj) {
                values.push(clientObj[property]);
            }
            clientArr = values;
            find.advertisement = advertisementId;
            if(prize&&prize!="")
                find.prize = prize;
            if(state&&state!="")
                find.state = state;
            if(city&&city!="")
                find.city = city;
            if(region&&region!="")
                find.region = region;
            if(street&&street!="")
                find.street = street;
            if(dateTo)
                find.createdAt = {"<": dateTo};
            if(dateFrom)
                find.createdAt = {">": dateFrom};

            PrizeCoupon.find(find).populate('appUser').exec(function(err, resultArr){
                if(err)
                        return res.serverError(err);
            res.view('data-prize-winner', {resultArr: resultArr, moment: moment, adArr: adArr, clientArr: clientArr});
        });
            
        });
        
    },
    prizeWinnerSearch: function(req, res){//to be removed
        
        advertisement.find().exec(function(err, advertisements){
            var advertisementId = req.param('advertisement');
            var prize = req.param('prize');
            
            var find = {};
            find.advertisement = advertisementId;
            if(prize!="")
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
                var threeMonthsAgo = moment().subtract(90, 'days').toDate();
                var todayStart = moment().startOf('day').toDate();
                var todayEnd = moment().endOf('day').toDate();
                AppUser.find({createdAt: {">": monthAgo}}).exec(function(err, newAppUserArr){
                    access.find({createdAt: {">": threeMonthsAgo, "<": todayStart}}).exec(function(err, accessArr){
                        
                        access.find({createdAt: {">=": todayStart, "<": todayEnd}}).exec(function(err, accessTodayArr){
                            var activeAppUserArr = [];
                            var normalAppUserArr = [];
                            while(accessArr.length){
                                var accessOne = accessArr.pop();
                                var appUserId = accessOne.appUser;
                                normalAppUserArr[appUserId] = null;
                                var normalAppUserKeys = Object.keys(normalAppUserArr);
                            }
                            while(accessTodayArr.length){
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
                            var normalUsers = normalAppUserKeys.length;
                            var activeUsers = activeAppUserKeys.length;
                            var inactiveUsers = totalUsers - normalUsers - activeUsers;
                            

                            res.view('data-AppUser-statistics', {totalUsers: totalUsers, maleUsers: maleUsers, femaleUsers: femaleUsers, newUsers: newUsers, oldUsers: oldUsers, activeUsers: activeUsers, inactiveUsers: inactiveUsers, normalUsers: normalUsers});
                        })
                    });
                    
                })
                
            })
        });
    }
    
    
};

