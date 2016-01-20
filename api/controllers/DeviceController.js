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
var sync = require('synchronize');
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
            if(!result){
                
            }
            advertisement.find({device: id}).populate('advertisementImage').exec(function(err, ads){
                var accessDateBefore = moment().subtract(30, 'days').toDate();
                DeviceMonitor.findOne({device: id, accessDate: {'<': accessDateBefore} }).exec(function(err, faultDeviceFound){
                    res.view('device-one', {result: result, ads: ads, faultDeviceFound: faultDeviceFound});
                });
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
    destroy: function(req, res){
        var id = req.param("id");
        device.destroy({id: id}).exec(function(err, result){
            res.redirect('device');
        })
    },
    add: function(req, res){
        
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
                    console.log(filteredDeviceArr.length);
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
    addAdvertisement: function(req, res){
        var advertisementId = req.param('advertisement');
        var adDevices = req.param('device');
        
        Device.search({}, function(err, deviceMaxArr){
            if(err){
                return res.serverError(err);
            }else{
                device.find().exec(function(err, deviceCbjArr){
                    var deviceMaxOne;
                    var deviceNotInCbjArr = [];
                    var deviceIdCbjArr = [];
                    while(deviceCbjArr.length){
                        deviceIdCbjArr.push(deviceCbjArr.pop().id);
                    }
                    while(deviceMaxArr.length){
                        deviceMaxOne = deviceMaxArr.pop();
                        if(!_.contains(deviceIdCbjArr, deviceMaxOne.id)){
                            deviceNotInCbjArr.push(deviceMaxOne.id);
                        }
                    }
                    var obj = {};
                    var createDeviceObjArr = [];
                    while(deviceNotInCbjArr.length){
                        obj = {};
                        obj.id = deviceNotInCbjArr.pop();
                        obj.advertisement = [];
                        createDeviceObjArr.push(obj);
                    }
                    console.log("165")
                    if(createDeviceObjArr.length){
                        console.log("167");
                        device.create(createDeviceObjArr).exec(function(err){
                            if(err){
                                console.log(err);
                            }
                            if(adDevices!=null)
                                device.find({id: adDevices}).exec(function(err, deviceToUpdateArr){
                                    var deviceToUpdate;
                                    console.log("170");
                                    while(deviceToUpdateArr.length){
                                        deviceToUpdate = deviceToUpdateArr.pop();
                                        sync(deviceToUpdate, 'save');
                                        if(!_.contains(deviceToUpdate.advertisement, advertisementId)){
                                            deviceToUpdate.advertisement.push(advertisementId);
                                            deviceToUpdate.save();
                                        }   
                                        console.log("185");
                                    }
                                    res.redirect('/advertisement/'+advertisementId+"/deploy");
                                    res.end();
                                    return;
                                });
                        });
                    }else{
                        console.log(adDevices.length);
                        device.find({id: adDevices}).exec(function(err, deviceToUpdateArr){
                            var deviceToUpdate;
                            console.log("188");
                            
                            while(deviceToUpdateArr.length){
                                console.log(deviceToUpdateArr.length+"asdfd");
                                deviceToUpdate = deviceToUpdateArr.pop();
                                var query;
                                query = device.update({id: deviceToUpdate.id}, {advertisement: deviceToUpdate.advertisement});
                                sync(query, 'exec');
                                sync.fiber(function(){
                                    if(!_.contains(deviceToUpdate.advertisement, advertisementId)){
                                    deviceToUpdate.advertisement.push(advertisementId);
                                    query.exec();
                                    }   
                                });
                                
                            }
                            res.redirect('/advertisement/'+advertisementId+"/deploy");
                            res.end();
                            return;
                        });
                    }
                    
                });
                
            }
            
        });
    },
    
};

