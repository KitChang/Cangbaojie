/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var Device = require('../lib/device');
var moment = require('moment');
var _ = require('underscore');
module.exports = {
    
    find: function(req, res){
        Device.search({}, function(err, resultArr){
            if(err){
                return res.serverError(err);
            }else{
                res.view('device', {resultArr: resultArr});    
            }
        })
        
    },
    
    findOne: function(req, res){
        var id = req.param("id");
        Device.findOne(id, function(err, result){
            if(err){
                    res.serverError(err);
                    return;
            }
            devicePushMsg.findOne({device: id}).exec(function (err, pushmsg) {
                if (err) { return;};
                if (pushmsg) {
                    advertisement.find({device: id}).populate('advertisementImage').exec(function(err, ads){
                        if(err){
                            res.serverError(err);
                            return;
                        }
                        var accessDateBefore = moment().subtract(30, 'days').toDate();
                        DeviceMonitor.findOne({device: id, accessDate: {'<': accessDateBefore} }).exec(function(err, faultDeviceFound){
                            if(err){
                                res.serverError(err);
                                return;
                            }
                            res.view('device-one', {result: result, ads: ads, faultDeviceFound: faultDeviceFound, pushmsg: pushmsg.message});
                        });
                    });
                } else {
                    advertisement.find({device: id}).populate('advertisementImage').exec(function(err, ads){
                        if(err){
                            res.serverError(err);
                            return;
                        }
                        var accessDateBefore = moment().subtract(30, 'days').toDate();
                        DeviceMonitor.findOne({device: id, accessDate: {'<': accessDateBefore} }).exec(function(err, faultDeviceFound){
                            if(err){
                                res.serverError(err);
                                return;
                            }
                            res.view('device-one', {result: result, ads: ads, faultDeviceFound: faultDeviceFound});
                        });
                    });
                }
            });

        });
    },
    new: function(req, res){
        res.view('device-new');
    },
    create: function(req, res){
        var name = req.param('name');
        var uuid = req.param('uuid');
        var major = req.param('major');
        var minor = req.param('minor');
        var state = req.param('state');
        var city = req.param('city');
        var region = req.param('region');
        var street = req.param('street');
        var location = req.param('location');
        var locationType = req.param('locationType');
        device.create({name: name, uuid: uuid, major: major, minor: minor, state: state, city: city, region: region, location: location, locationType: locationType, street: street}).exec(function(err, result){
            if(err){
                return res.serverError(err);
            }
            res.view('device-one', {message: "created", result: result});
        });
    },
    update: function(req, res){
        var id = req.param("id");
        var cbjTag = req.param("cbjTag");
        Device.updateCbjTag(id, cbjTag, function(err, result){
            if(err){
                return res.serverError(err);
            }
            res.redirect('/device/'+id);
        });
    },
    import: function(req, res){
        Device.search({}, function(err, deviceArr_max){
            if(err){
                return res.serverError(err);
            }else{
                device.find().exec(function(err, deviceArr_cbj){
                    var deviceId_max = [];
                    var deviceId_cbj = [];
                    var deviceId; 
                    var deviceObj;
                    while(deviceArr_cbj.length){
                        deviceObj = deviceArr_cbj.pop();
                        deviceId_cbj.push(deviceObj.id);
                    }
                    var filteredDeviceArr = _.reject(deviceArr_max, function(dev){
                        return _.contains(deviceId_cbj, dev.id);
                    });
                    device.create(filteredDeviceArr).exec(function(err){
                        res.redirect('/device');
                    });
                });
            }
        })
    },
    search: function(req, res){
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
            if(err){
                return res.serverError(err);
            }else{
                res.view('device', {resultArr: resultArr});
            }
        });
    },
    pushmsg: function (req, res) {
        var id = req.param("id");
        var message = req.param('message');
        devicePushMsg.findOne({device: id}).exec(function (err, pushMsg) {
           if (err) {return;};
           if (!pushMsg) {
                devicePushMsg.create({device: id, message: message}).exec(function (err, devicePushMsg) {
                    if(err){
                        res.serverError(err);
                        return;
                    }
                    Device.findOne(id, function(err, result){
                        if(err){
                            res.serverError(err);
                            return;
                        }
                        advertisement.find({device: id}).populate('advertisementImage').exec(function(err, ads){
                            if(err){
                                res.serverError(err);
                                return;
                            }
                            var accessDateBefore = moment().subtract(30, 'days').toDate();
                            DeviceMonitor.findOne({device: id, accessDate: {'<': accessDateBefore} }).exec(function(err, faultDeviceFound){
                                if(err){
                                    res.serverError(err);
                                    return;
                                }
                                res.view('device-one', {result: result, ads: ads, faultDeviceFound: faultDeviceFound, pushmsg: message});
                            });
                        });
                    });
                });
            } else {
                devicePushMsg.update({device: id} ,{message: message}).exec(function (err, devicePushMsg) {
                    if(err){
                        res.serverError(err);
                        return;
                    }
                    Device.findOne(id, function(err, result){
                        if(err){
                            res.serverError(err);
                            return;
                        }
                        advertisement.find({device: id}).populate('advertisementImage').exec(function(err, ads){
                            if(err){
                                res.serverError(err);
                                return;
                            }
                            var accessDateBefore = moment().subtract(30, 'days').toDate();
                            DeviceMonitor.findOne({device: id, accessDate: {'<': accessDateBefore} }).exec(function(err, faultDeviceFound){
                                if(err){
                                    res.serverError(err);
                                    return;
                                }
                                res.view('device-one', {result: result, ads: ads, faultDeviceFound: faultDeviceFound, pushmsg: message});
                            });
                        });
                    });
                });
            }
        });
    }
};

