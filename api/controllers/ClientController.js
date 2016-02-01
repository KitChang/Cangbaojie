/**
 * ClientController
 *
 * @description :: Server-side logic for managing advertisingcompanies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require("fs");
var path = require('path');
var uuid = require('node-uuid');
module.exports = {
	find: function(req, res){
        client.find({deleted: false}).populate('clientImage').exec(function(err, resultArr){
            if(err)
                return res.serverError(err);
            res.view('client', {resultArr: resultArr});
            });
    },
    findOne: function(req, res){
        var id = req.param("id");
        client.findOne({id: id}).populate("clientImage").exec(function(err, result){
            if(err)
                return res.serverError(err);
            res.view('client-one', {result: result});
            });
    },
    new: function(req, res){
        res.view('client-new');
    },
    create: function(req, res){
        var name = req.param('name');
        var contactPerson = req.param('contactPerson');
        //var mobilePhone = req.param('mobilePhone');
        var phone = req.param('phone');
        var fax = req.param('fax');
        var email = req.param('email');
        var address = req.param('address');
        var companyIntroduction = req.param('companyIntroduction');
        client.create({
            name: name,
            contactPerson: contactPerson,
            //mobilePhone: mobilePhone,
            phone: phone,
            fax: fax,
            email: email,
            address: address,
            companyIntroduction: companyIntroduction
        }).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }
            res.redirect("/client/"+result.id);
        });
        
    },
    update: function(req, res){
        var id = req.param("id");
        var name = req.param('name');
        var contactPerson = req.param('contactPerson');
        //var mobilePhone = req.param('mobilePhone');
        var phone = req.param('phone');
        var fax = req.param('fax');
        var email = req.param('email');
        var address = req.param('address');
        var companyIntroduction = req.param('companyIntroduction');
        client.update({id: id}, 
        {
            name: name,
            contactPerson: contactPerson,
            //mobilePhone: mobilePhone,
            phone: phone,
            fax: fax,
            email: email,
            address: address,
            companyIntroduction: companyIntroduction
        }).exec(function(err, result){
            if(err){
                return res.serverError(err);
            }
            res.redirect('/client/'+id);
        });
    },
    destroy: function(req, res){
        
        var id = req.param("id");
        client.update({id: id}, {deleted: true}).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }
            res.redirect('client');
        })
    },
    add: function(req, res){
        
    },
    remove: function(req, res){
        
    },
    balance: function(req, res){
        var clientId = req.param('id');
        client.findOne({id: clientId}).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }
            res.view('client-balance', {result: result});
        })
    },
    addToBalance: function(req, res){
        var clientId = req.param('id');
        var addValue = req.param('addValue');
        client.findOne({id: clientId}).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }
            var account = result.account;
            addValue = parseInt(addValue);
            account = account + addValue;
            client.update({id: clientId}, {account: account}).exec(function(err){
                if(err){
                    res.serverError(err);
                    return;
                }
                res.redirect('/client/'+clientId+"/balance");
            });
        });
    },
    balanceReminder: function(req, res){
        client.find({sort: 'account DESC'}).exec(function(err, clients){
            if(err){
                res.serverError(err);
                return;
            }
            res.view('client-balance-reminder', {clients: clients});
        });
    },
    clickRanking: function(req, res){
        client.find({sort: 'accessCount ASC'}).exec(function(err, clients){
            if(err){
                res.serverError(err);
                return;
            }
            res.view('client-click-ranking', {clients: clients});
        })
    },
    clientImage: function(req, res){
        req.file('clientImage').upload(function (err, files) {
        if(err){
            res.serverError(err);
            return;
        }
        var clientId = req.param("id");
        if(!files[0]){
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
                ClientImage.update({client: clientId}, {replaced: true}).exec(function(err){
                    ClientImage.create({imagePublicId: imagePublicId, imageFormat: imageFormat, client: clientId}).exec(function(err, doc){
                        client.update({id: clientId}, {clientImage: doc.id}).exec(function(err){
                            if(err){
                                return res.serverError(err);
                            }
                            res.redirect("/client/"+clientId);
                        });
                    })
                });
            });
        });
        });
    }
    
};

