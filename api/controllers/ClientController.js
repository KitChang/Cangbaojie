/**
 * ClientController
 *
 * @description :: Server-side logic for managing advertisingcompanies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res){
        client.find().exec(function(err, resultArr){
            if(err)
                return res.serverError(err);
            res.view('client', {resultArr: resultArr});
            });
    },
    findOne: function(req, res){
        var id = req.param("id");
        client.findOne({id: id}).exec(function(err, result){
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
        var mobilePhone = req.param('mobilePhone');
        var phone = req.param('phone');
        var fax = req.param('fax');
        var email = req.param('email');
        var address = req.param('address');
        var companyIntroduction = req.param('companyIntroduction');
        client.create({
            name: name,
            contactPerson: contactPerson,
            mobilePhone: mobilePhone,
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
        var mobilePhone = req.param('mobilePhone');
        var phone = req.param('phone');
        var fax = req.param('fax');
        var email = req.param('email');
        var address = req.param('address');
        var companyIntroduction = req.param('companyIntroduction');
        client.update({id: id}, 
        {
            name: name,
            contactPerson: contactPerson,
            mobilePhone: mobilePhone,
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
        client.destroy({id: id}).exec(function(err, result){
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
            res.view('client-balance', {result: result});
        })
    },
    addToBalance: function(req, res){
        var clientId = req.param('id');
        var addValue = req.param('addValue');
        client.findOne({id: clientId}).exec(function(err, result){
            var account = result.account;
            addValue = parseInt(addValue);
            account = account + addValue;
            client.update({id: clientId}, {account: account}).exec(function(err){
                res.redirect('/client/'+clientId+"/balance");
            });
        });
    }
    
};

