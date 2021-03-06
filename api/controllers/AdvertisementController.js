/**
 * AdvertisementController
 *
 * @description :: Server-side logic for managing advertisements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Device = require("../lib/device");
var moment = require("moment");
var _ = require("underscore");
var fs = require("fs");
var path = require('path');
var uuid = require('node-uuid');
module.exports = {
	find: function(req, res){
            advertisement.find({deleted: false}).populate('client').populate('advertisementImage').exec (function(err, resultArr){
            if(err){
                return res.serverError(err);
            }
            res.view('advertisement', {resultArr: resultArr});
            });
    },
    findOne: function(req, res){
        var id = req.param("id");
        advertisement.findOne({id: id, deleted: false}).populate('advertisementImage').populate('probabilityDraw').populate('shareImage').exec(function(err, result)          {
            if(err){
                return res.serverError(err);
            }
						if(!result){
							res.end();
							return;
						}
            res.view('advertisement-one', {result: result, moment: moment});
        });
    },
    new: function(req, res){
        res.view('advertisement-new');
    },
    create: function(req, res){
        var client = req.param('client');
        var title = req.param('title');
        var description = req.param('description');
        var category = req.param('category');
        var expiredDate = req.param('expiredDate');
        if(expiredDate==null){
            return;
        }
        expiredDate = expiredDate.replace(/\//g, "");
        expiredDate = moment(expiredDate, "MMDDYYYY").startOf('day').toDate();
        var effectiveDate = req.param('effectiveDate');
        effectiveDate = effectiveDate.replace(/\//g, "");
        effectiveDate = moment(effectiveDate, "MMDDYYYY").startOf('day').toDate();
        var drawPerformInterval = req.param('drawPerformInterval');
        var pricePerClick = req.param('pricePerClick');
        var drawType = req.param('drawType');
        var firstPrize = req.param('firstPrize');
        var secondPrize = req.param('secondPrize');
        var thirdPrize = req.param('thirdPrize');
        var fourthPrize = req.param('fourthPrize');
        var fifthPrize = req.param('fifthPrize');
        var firstPrizeQuantity = req.param('firstPrizeQuantity');
        var secondPrizeQuantity = req.param('secondPrizeQuantity');
        var thirdPrizeQuantity = req.param('thirdPrizeQuantity');
        var fourthPrizeQuantity = req.param('fourthPrizeQuantity');
        var fifthPrizeQuantity = req.param('fifthPrizeQuantity');
        var drawCouponExpiredTime_day = req.param("drawCouponExpiredTime_day");
        var drawCouponExpiredTime_hour = req.param("drawCouponExpiredTime_hour");
        var drawCouponExpiredTime_minute = req.param("drawCouponExpiredTime_minute");
        var drawCouponExpiredTime_second = req.param("drawCouponExpiredTime_second");
        var drawPerformInterval_day = req.param("drawPerformInterval_day");
        var drawPerformInterval_hour = req.param("drawPerformInterval_hour");
        var drawPerformInterval_minute = req.param("drawPerformInterval_minute");
        var drawPerformInterval_second = req.param("drawPerformInterval_second");
        var drawCouponExpiredTime = req.param('drawCouponExpiredTime');
        var drawPerformInterval = req.param('drawPerformInterval');
        var numberOfPrize = req.param('numberOfPrize');
        var indexUrl = req.param('indexUrl');
        advertisement.create({
            client: client,
            title: title,
            description: description,
            category: category,
            effectiveDate: effectiveDate,
            expiredDate: expiredDate,
            pricePerClick: pricePerClick,
            drawType: drawType,
            drawCouponExpiredTime: drawCouponExpiredTime,
            drawCouponExpiredTime_day: drawCouponExpiredTime_day,
            drawCouponExpiredTime_hour: drawCouponExpiredTime_hour,
            drawCouponExpiredTime_minute: drawCouponExpiredTime_minute,
            drawCouponExpiredTime_second: drawCouponExpiredTime_second,
            drawPerformInterval: drawPerformInterval,
            drawPerformInterval_day: drawPerformInterval_day,
            drawPerformInterval_hour: drawPerformInterval_hour,
            drawPerformInterval_minute: drawPerformInterval_minute,
            drawPerformInterval_second: drawPerformInterval_second,
            advertisementImage: null,
            numberOfPrize: numberOfPrize,
            firstPrize: firstPrize,
            secondPrize: secondPrize,
            thirdPrize: thirdPrize,
            fourthPrize: fourthPrize,
            fifthPrize: fifthPrize,
            firstPrizeQuantity: firstPrizeQuantity,
            secondPrizeQuantity: secondPrizeQuantity,
            thirdPrizeQuantity: thirdPrizeQuantity,
            fourthPrizeQuantity: fourthPrizeQuantity,
            fifthPrizeQuantity: fifthPrizeQuantity,
            firstPrizeQuantityRemain: firstPrizeQuantity,
            secondPrizeQuantityRemain: secondPrizeQuantity,
            thirdPrizeQuantityRemain: thirdPrizeQuantity,
            fourthPrizeQuantityRemain: fourthPrizeQuantity,
            fifthPrizeQuantityRemain: fifthPrizeQuantity,
            indexUrl: indexUrl
        }).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }
            res.redirect("/advertisement/"+result.id);
        });
    },
    update: function(req, res){
        var id = req.param("id");
        advertisement.findOne({id: id}).exec(function(err, ad){
						if(err||!ad){
							res.end();
							return;
						}
            var drawType = ad.drawType;
            var title = req.param('title');
            var category = req.param('category');
            var description = req.param('description');
            var expiredDate = req.param('expiredDate');
            expiredDate = expiredDate.replace(/\//g, "");
            expiredDate = moment(expiredDate, "MMDDYYYY").startOf('day').toDate();
            var effectiveDate = req.param('effectiveDate');
            effectiveDate = effectiveDate.replace(/\//g, "");
            effectiveDate = moment(effectiveDate, "MMDDYYYY").startOf('day').toDate();
            var pricePerClick = req.param('pricePerClick');
            var drawType = req.param('drawType');
            var firstPrize = req.param('firstPrize');
            var secondPrize = req.param('secondPrize');
            var thirdPrize = req.param('thirdPrize');
            var fourthPrize = req.param('fourthPrize');
            var fifthPrize = req.param('fifthPrize');
            var firstPrizeQuantity = req.param('firstPrizeQuantity');
            var secondPrizeQuantity = req.param('secondPrizeQuantity');
            var thirdPrizeQuantity = req.param('thirdPrizeQuantity');
            var fourthPrizeQuantity = req.param('fourthPrizeQuantity');
            var fifthPrizeQuantity = req.param('fifthPrizeQuantity');
            var drawCouponExpiredTime_day = req.param("drawCouponExpiredTime_day");
            var drawCouponExpiredTime_hour = req.param("drawCouponExpiredTime_hour");
            var drawCouponExpiredTime_minute = req.param("drawCouponExpiredTime_minute");
            var drawCouponExpiredTime_second = req.param("drawCouponExpiredTime_second");
            var drawPerformInterval_day = req.param("drawPerformInterval_day");
            var drawPerformInterval_hour = req.param("drawPerformInterval_hour");
            var drawPerformInterval_minute = req.param("drawPerformInterval_minute");
            var drawPerformInterval_second = req.param("drawPerformInterval_second");
            var drawCouponExpiredTime = req.param('drawCouponExpiredTime');
            var drawPerformInterval = req.param('drawPerformInterval');
            var indexUrl = req.param('indexUrl');
            var shareTitle = req.param('shareTitle');
            var shareContent = req.param('shareContent');
            var shareLink = req.param('shareLink');
            option =
            {
                title: title,
                category: category,
                description: description,
                effectiveDate: effectiveDate,
                expiredDate: expiredDate,
                pricePerClick: pricePerClick,
                drawCouponExpiredTime: drawCouponExpiredTime,
                drawPerformInterval: drawPerformInterval,
                drawCouponExpiredTime: drawCouponExpiredTime,
                drawCouponExpiredTime_day: drawCouponExpiredTime_day,
                drawCouponExpiredTime_hour: drawCouponExpiredTime_hour,
                drawCouponExpiredTime_minute: drawCouponExpiredTime_minute,
                drawCouponExpiredTime_second: drawCouponExpiredTime_second,
                drawPerformInterval_day: drawPerformInterval_day,
                drawPerformInterval_hour: drawPerformInterval_hour,
                drawPerformInterval_minute: drawPerformInterval_minute,
                drawPerformInterval_second: drawPerformInterval_second,
                indexUrl: indexUrl,
                shareTitle: shareTitle,
                shareContent: shareContent,
                shareLink: shareLink
            };
            if(ad.status=="draft"){
                option.firstPrize = firstPrize;
                option.secondPrize = secondPrize;
                option.thirdPrize = thirdPrize;
                option.fourthPrize = fourthPrize;
                option.fifthPrize = fifthPrize;
                option.firstPrizeQuantity = firstPrizeQuantity;
                option.secondPrizeQuantity = secondPrizeQuantity;
                option.thirdPrizeQuantity = thirdPrizeQuantity;
                option.fourthPrizeQuantity = fourthPrizeQuantity;
                option.fifthPrizeQuantity = fifthPrizeQuantity;
                option.firstPrizeQuantityRemain = firstPrizeQuantity;
                option.secondPrizeQuantityRemain = secondPrizeQuantity;
                option.thirdPrizeQuantityRemain = thirdPrizeQuantity;
                option.fourthPrizeQuantityRemain = fourthPrizeQuantity;
                option.fifthPrizeQuantityRemain = fifthPrizeQuantity;
            }
            advertisement.update({id: id}, option
            ).exec(function(err, result){
                if(err){
                    res.serverError(err);
                    return;
                }
                res.redirect('/advertisement/'+id);
            });

        });

    },

    updateQuiz: function(req, res){
        var id = req.param('id');
        var question = req.param('question');
        var questionAnswer = req.param('questionAnswer');
        var questionArr = [];
        for(var i=0; i<question.length; i++){
            var questionObj = {};
            questionObj.question = question[i];
            questionObj.questionOption = req.param('questionOption_'+i);
            questionObj.questionAnswer = questionAnswer[i];
            questionArr.push(questionObj);
        }
        advertisement.update({id: id}, {quiz: questionArr}).exec(function(){
            res.redirect('/advertisement/'+id+'/quiz');
        });
    },
    quiz: function(req, res){
        var id = req.param('id');
        advertisement.findOne({id: id}).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }
						if(!result){
							res.end();
							return;
						}
            res.view('quiz', {quiz: result.quiz});
        });
    },

    prize: function(req, res){
        var id = req.param("id");
        advertisement.findOne({id: id}).populate("client").exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }
						if(!result){
							res.end();
							return;
						}
            var redeemAddress = result.client.address;
            var companyIntroduction = result.client.companyIntroduction;
						companyIntroduction = companyIntroduction.trim();
            res.view('prize', {result: result, moment: moment, redeemAddress: redeemAddress, companyIntroduction: companyIntroduction});
        })
    },
    updatePrize: function(req, res){
        var id = req.param('id');
        var highCode = req.param('highCode');
        var lowCode = req.param('lowCode');
        var prizeCouponExpiredDuration = req.param("prizeCouponExpiredDuration");
        var prizeCouponExpiredDate = req.param('prizeCouponExpiredDate');
        prizeCouponExpiredDate = prizeCouponExpiredDate.replace(/\//g, "");
        prizeCouponExpiredDate = moment(prizeCouponExpiredDate, "MMDDYYYY").startOf('day').toDate();
        var prizeCouponExpiredType = req.param("prizeCouponExpiredType");
        if(prizeCouponExpiredType=="duration"){
            prizeCouponExpiredDate = new Date();
        }else if(prizeCouponExpiredType=="date"){
            prizeCouponExpiredDuration = 0;
        }else{
            return res.serverError();
        }
        var redeemLocation = req.param("redeemLocation");
        var companyIntroduction = req.param("companyIntroduction");
        advertisement.update({id: id},
        {
            prizeCouponExpiredType: prizeCouponExpiredType,
            prizeCouponExpiredDuration: prizeCouponExpiredDuration,
            prizeCouponExpiredDate: prizeCouponExpiredDate,
            redeemLocation: redeemLocation,
            companyIntroduction: companyIntroduction,
            highCode: highCode,
            lowCode: lowCode
        }).exec(function(err){
            if(err){
                res.serverError(err);
                return;
            }
            res.redirect('/advertisement/'+id+'/prize');
        });
    },
    deploy: function(req, res){
        var id = req.param('id');
        advertisement.findOne({id: id}).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }
						if(!result){
							res.end();
							return;
						}
            var deviceArr = result.device;
            option = {};
            var deviceId_concat = "";
            if(deviceArr!=null && deviceArr instanceof Array){
                if(deviceArr.length==0)
                    deviceArr = "-1";
            }else{
                deviceArr = "-1";
            }
            Device.search({id: deviceArr}, function(err, devices){
                if(err){
                    res.serverError(err);
                    return;
                }
                res.view('advertisement-deploy', {devices: devices, result: result});
            });
        });
    },

    device: function(req, res){
        Device.search({}, function(err, resultArr){
            if(err){
                return res.serverError(err);
            }
            res.view('advertisement-device', {resultArr: resultArr});
        })
    },
    searchDevice: function(req, res){
        var locationType = req.param('locationType');
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        var street = req.param('street');
        var option = {};
        if(locationType!=null&&locationType!=""){
            option.locationType = locationType;
        }
        if (state!=null&state!="") {
            option.state = state;
        }
        if (city!=null&&city!="") {
            option.city = city;
        }
        if(region!=null&&region!=""){
            option.region = region;
        }
        if(street!=null&&street!=""){
            option.street = street;
        }
        Device.search(option, function(err, resultArr){
            if(err){
                return res.serverError(err);
            }else{
                res.view('advertisement-device', {resultArr: resultArr});
            }
        })

    },
    addDevice: function(req, res){
        var id = req.param('id');
        var deviceIds = req.param('device');
        advertisement.findOne({id: id}).exec(function(err, ad){
            if(err){
                res.serverError(err);
                return;
            }
						if(!ad){
							res.end();
							return;
						}
            var deviceArr = ad.device;
            if(!deviceArr||deviceArr==undefined)
                deviceArr = [];
            if(deviceIds!=null)
            for(var i=0; i<deviceIds.length; i++){
                var duplicate = false;
                for(var j=0; j<deviceArr.length; j++){
                    if(deviceIds[i]==deviceArr[j])
                        duplicate = true;
                }
                if(!duplicate){
                    deviceArr.push(deviceIds[i]);
                }
            }
            advertisement.update({id: id}, {device: deviceArr}).exec(function(err){
                if(err){
                    res.serverError(err);
                    return;
                }
                res.redirect('/advertisement/'+id+"/deploy");

            })
        });
    },
    removeDevice: function(req, res){
        var id = req.param('id');
        var deviceIds = req.param('device');
        advertisement.findOne({id: id}).exec(function(err, ad){
            if(err){
                res.serverError(err);
                return;
            }
						if(!ad){
							res.end();
							return;
						}
            var deviceArr = ad.device;
            if(!deviceArr||deviceArr==undefined)
                deviceArr = [];
            if(deviceIds!=null)
                while(deviceIds.length){
                    deviceArr = _.without(deviceArr, deviceIds.pop());
                }
            advertisement.update({id: id}, {device: deviceArr}).exec(function(err){
                if(err){
                    res.serverError(err);
                    return;
                }
                res.redirect('/advertisement/'+id+"/deploy");
                res.end();
            })
        });
    },

    client: function(req, res){
        client.find().exec(function(err, resultArr){
            if(err){
                return res.serverError(err);
            }
            res.view('advertisement-client', {resultArr: resultArr});
        })
    },
    advertisementImage: function(req, res){
        req.file('advertisementImage').upload(function (err, files) {
        var advertisementId = req.param("id");

        if(!files||files.length==0){
            res.end();
						return;
        }
        image_path = files[0].fd;
        var imagePublicId = null;
        var imageFormat = null;
        fs.readFile(image_path, function (err, data) {
            var imageUUID = uuid.v1();
            var ext = path.extname(image_path).split(".")[1];
            var uploadPath = "/uploads/"+imageUUID+"."+ext;
            var filename = path.join(process.cwd(), uploadPath);
            if(err){
                res.serverError(err);
                return;
            }
            fs.writeFile(filename, data, function (err) {
                if(err){
                    res.serverError(err);
                    return;
                }
                imagePublicId = imageUUID;
                imageFormat = ext;
								//need to check for existence of ad
                AdvertisementImage.update({advertisement: advertisementId}, {replaced: true}).exec(function(err){
                    AdvertisementImage.create({imagePublicId: imagePublicId, imageFormat: imageFormat, advertisement: advertisementId}).exec(function(err, doc){
                        advertisement.update({id: advertisementId}, {advertisementImage: doc.id}).exec(function(err){
                            if(err){
                                return res.serverError(err);
                            }
                            res.redirect("/advertisement/"+advertisementId);
                        });
                    })
                });
            });
        });
        });
    },
    publish: function(req, res){
        var id = req.param("id");
        advertisement.findOne({id: id}).populate("probabilityDraw").exec(function(err, ad){
            if(err){
                res.serverError(err);
                return;
            }
						if(!ad){
							res.end();
							return;
						}
            var numberOfPrize = ad.numberOfPrize;
            var option = {};
            var checkFail = false;
            var message = [];
            var drawType = ad.drawType;
            var prob;
            if(drawType==""||(drawType!="probability"&&drawType!="order"))
                checkFail = true;
            if(drawType=="probability"&&!ad.probabilityDraw){
                checkFail = true;
                message.push("几率抽奖未设");
            }
            OrderDraw.find({advertisement: id}).exec(function(err, orderArr){
                if(err){
                    res.serverError(err);
                    return;
                }
                if(drawType=="order"&&!orderArr.length){
                    checkFail = true;
                    message.push("排序抽奖未设");
                }
                if(drawType=="order"){
                    var order;
                    while(orderArr.length){
                        order = orderArr.pop();
                        if(order.drawCountLowerBound<0 || order.drawCountUpperBound<0 || order.drawCountLowerBound > order.drawCountUpperBound){
                            checkFail = true;
                            message.push("排序访问数数据设定有误");
                        }
                        if(order.firstPrizeRange<0 || order.secondPrizeRange < 0 || order.thirdPrizeRange <0 || order.fourthPrizeRange < 0 || order.fifthPrizeRange < 0){
                            checkFail = true;
                            message.push("排序奖品数值范围数据设定有误");
                        }
                        var sum = order.firstPrizeRange + order.secondPrizeRange + order.thirdPrizeRange + order.fourthPrizeRange + order.fifthPrizeRange;
                        var dif = order.drawCountUpperBound - order.drawCountLowerBound + 1;
                        if(sum > dif){
                            checkFail = true;
                            message.push("排序数据设定有误");
                        }
                        if(checkFail==true){
                            break;
                        }
                    }
                }
                if(ad.probabilityDraw)
                    prob = ad.probabilityDraw;

                if(numberOfPrize == 2){
                    if(ad.firstPrizeQuantity <= 0 || ad.firstPrizeQuantityRemain <= 0 || ad.firstPrize.trim() == "")
                        checkFail = true;
                    if(ad.secondPrizeQuantity <= 0 || ad.secondPrizeQuantityRemain <= 0 || ad.secondPrize.trim() == "")
                        checkFail = true;
                    if(drawType=="probability"&&prob){
                        if(prob.firstPrizeProbability < 0 || prob.secondPrizeProbability < 0)
                            checkFail = true;
                        if(prob.firstPrizeProbability > 100 || prob.secondPrizeProbability > 100)
                            checkFail = true;
                    }
                }
                if(numberOfPrize == 3){
                    if(ad.firstPrizeQuantity <= 0 || ad.firstPrizeQuantityRemain <= 0 || ad.firstPrize.trim() == "")
                        checkFail = true;
                    if(ad.secondPrizeQuantity <= 0 || ad.secondPrizeQuantityRemain <= 0 || ad.secondPrize.trim() == "")
                        checkFail = true;
                    if(ad.thirdPrizeQuantity <= 0 || ad.thirdPrizeQuantityRemain <= 0 || ad.thirdPrize.trim() == "")
                        checkFail = true;
                    if(drawType=="probability"&&prob){
                        if(prob.firstPrizeProbability < 0 || prob.secondPrizeProbability < 0 || prob.thirdPrizeProbability < 0)
                            checkFail = true;
                        if(prob.firstPrizeProbability > 100 || prob.secondPrizeProbability > 100 || prob.thirdPrizeProbability > 100)
                            checkFail = true;
                    }
                }
                if(numberOfPrize == 4){
                    if(ad.firstPrizeQuantity <= 0 || ad.firstPrizeQuantityRemain <= 0 || ad.firstPrize.trim() == "")
                        checkFail = true;
                    if(ad.secondPrizeQuantity <= 0 || ad.secondPrizeQuantityRemain <= 0 || ad.secondPrize.trim() == "")
                        checkFail = true;
                    if(ad.thirdPrizeQuantity <= 0 || ad.thirdPrizeQuantityRemain <= 0 || ad.thirdPrize.trim() == "")
                        checkFail = true;
                    if(ad.fourthPrizeQuantity <= 0 || ad.fourthPrizeQuantityRemain <= 0 || ad.fourthPrize.trim() == "")
                        checkFail = true;
                    if(drawType=="probability"&&prob){
                        if(prob.firstPrizeProbability < 0 || prob.secondPrizeProbability < 0 || prob.thirdPrizeProbability < 0 || prob.fourthPrizeProbability < 0)
                            checkFail = true;
                        if(prob.firstPrizeProbability > 100 || prob.secondPrizeProbability > 100 || prob.thirdPrizeProbability > 100 || prob.fourthPrizeProbability > 100)
                            checkFail = true;
                    }
                }
                if(numberOfPrize == 5){
                    if(ad.firstPrizeQuantity <= 0 || ad.firstPrizeQuantityRemain <= 0 || ad.firstPrize.trim() == "")
                        checkFail = true;
                    if(ad.secondPrizeQuantity <= 0 || ad.secondPrizeQuantityRemain <= 0 || ad.secondPrize.trim() == "")
                        checkFail = true;
                    if(ad.thirdPrizeQuantity <= 0 || ad.thirdPrizeQuantityRemain <= 0 || ad.thirdPrize.trim() == "")
                        checkFail = true;
                    if(ad.fourthPrizeQuantity <= 0 || ad.fourthPrizeQuantityRemain <= 0 || ad.fourthPrize.trim() == "")
                        checkFail = true;
                    if(ad.fifthPrizeQuantity <= 0 || ad.fifthPrizeQuantityRemain <= 0 || ad.fifthPrize.trim() == "")
                        checkFail = true;
                    if(drawType=="probability"&&prob){
                        if(prob.firstPrizeProbability < 0 || prob.secondPrizeProbability < 0 || prob.thirdPrizeProbability < 0 || prob.fourthPrizeProbability < 0 || prob.fifthPrizeProbability < 0)
                            checkFail = true;
                        if(prob.firstPrizeProbability > 100 || prob.secondPrizeProbability > 100 || prob.thirdPrizeProbability > 100 || prob.fourthPrizeProbability > 100 || prob.fifthPrizeProbability > 100)
                            checkFail = true;
                    }
                };
                if(checkFail == true){
                    message.push("奖项数据有误");
                }
                var prizeCouponExpiredType = ad.prizeCouponExpiredType;
                var highCode = ad.highCode;
                var lowCode = ad.lowCode;
                if(prizeCouponExpiredType==""){
                    checkFail = true;
                    message.push("领奖有效日期未设");
                }
                if(numberOfPrize==3||numberOfPrize==4||numberOfPrize==5){
                    if(lowCode == ""){
                        checkFail = true;
                        message.push("一般领奖码未设");
                    }
                }
                if(highCode==""){
                    checkFail = true
                    message.push("高级领奖码未设");
                }
                if(checkFail){
                    var messageStr = message.join(',')+"";
                    res.redirect('/advertisement/'+id+"?message="+encodeURIComponent(messageStr));
                    return;
                }
                if(numberOfPrize == 2){
                    option.thirdPrizeQuantityRemain = 0;
                    option.thirdPrizeQuantity = 0;
                    option.thirdPrize = "";
                    option.fourthPrizeQuantityRemain = 0;
                    option.fourthPrizeQuantity = 0;
                    option.fourthPrize = "";
                    option.fifthPrizeQuantity = 0;
                    option.fifthPrizeQuantityRemain = 0;
                    option.fifthPrize = "";
                }else if(numberOfPrize == 3){
                    option.fourthPrizeQuantityRemain = 0;
                    option.fourthPrizeQuantity = 0;
                    option.fourthPrize = "";
                    option.fifthPrizeQuantity = 0;
                    option.fifthPrizeQuantityRemain = 0;
                    option.fifthPrize = "";
                }else if(numberOfPrize == 4){
                    option.fifthPrizeQuantity = 0;
                    option.fifthPrizeQuantityRemain = 0;
                    option.fifthPrize = "";
                }

                option.status = "publish";

                advertisement.update({id: id}, option).exec(function(err){
                    if(err){
                        res.serverError(err);
                        return;
                    }
                    res.redirect('/advertisement/'+id);
                })
            });


        });
    },
    destroy: function(req, res){
        var id= req.param('id');
        advertisement.update({id: id}, {deleted: true}).exec(function(err){
            res.redirect('/advertisement');
        });
    },
    expiredDateReminder: function(req, res){
        advertisement.find({limit: 5, sort: 'expiredDate DESC'}).populate('client').exec(function(err, advertisements){
            if(err){
                res.serverError(err);
                return;
            }
            res.view('expired-date-reminder', {advertisements: advertisements, moment: moment});
        });
    },
    getJSON: function(req, res){
        var clientId = req.param('client');
        var option = {};
        if(clientId!="")
            option.client = clientId;
        option.deleted = false;
        advertisement.find(option).exec(function(err, ads){
            if(err){
                res.serverError(err);
                return;
            }
            res.json(ads);
        })
    },
    shareImage: function(req, res){
        req.file('shareImage').upload(function (err, files) {
        var advertisementId = req.param("id");
        if(!files||files.length==0){
            return res.serverError(err);
        }
        image_path = files[0].fd;
        var imagePublicId = null;
        var imageFormat = null;
        fs.readFile(image_path, function (err, data) {
            if(err){
                res.serverError(err);
                return;
            }
            var imageUUID = uuid.v1();
            var ext = path.extname(image_path).split(".")[1];
            var uploadPath = "/uploads/"+imageUUID+"."+ext;
            var filename = path.join(process.cwd(), uploadPath);
            fs.writeFile(filename, data, function (err) {
                if(err){
                    res.serverError(err);
                    return;
                }
                imagePublicId = imageUUID;
                imageFormat = ext;
								//need check existence of ad
                ShareImage.update({advertisement: advertisementId}, {replaced: true}).exec(function(err){
                    ShareImage.create({imagePublicId: imagePublicId, imageFormat: imageFormat, advertisement: advertisementId}).exec(function(err, doc){
                        advertisement.update({id: advertisementId}, {shareImage: doc.id}).exec(function(err){
                            if(err){
                                return res.serverError(err);
                            }
                            res.redirect("/advertisement/"+advertisementId);
                        });
                    })
                });
            });
        });
        });
    },
		removeOldDeviceMonitor: function(req, res){
			DeviceMonitor.find().exec(function(err, dms){
				var dm;
				var deviceIds = [];
				while(dms.length){
					dm = dms.pop();
					deviceIds.push(dm.device);
				}
				Device.search({}, function(err, resultArr){
            if(err){
                return res.serverError(err);
            }
						var newDeviceIds = [];
						while(resultArr.length){
							var res = resultArr.pop();
							newDeviceIds.push(res.id);
						}
						var device;
						var deviceArrToRemove;
						while(newDeviceIds.length){
							deviceArrToRemove = _.without(deviceIds, newDeviceIds.pop());
						}
						DeviceMonitor.destroy({device: deviceArrToRemove}).exec(function(err){
							res.end();
						})

        })

			})
		}
}
