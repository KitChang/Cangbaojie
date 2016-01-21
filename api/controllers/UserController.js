/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passwordHash = require('password-hash');
module.exports = {
	find: function(req, res) {
        user.find({deleted: false}).exec(function(err, resultArr){
            if(err){
                return res.serverError(err);
            }
            res.view('user', {resultArr: resultArr});
        });
    },
    findOne: function(req, res){
        
        var id = req.param('id');
        
        user.findOne({id: id}).exec(function(err, result){
            
            res.view('user-one', {result: result})
        });
    },
    create: function(req, res){
        
        var username = req.param('username');
        var password = req.param('password');
        
        var role = req.param('role');
        var client = req.param('client');
        var hashedPassword = passwordHash.generate(password);
        
        user.findOne({username: username}).exec(function(err, doc){
            
            if(doc!=null){
                return res.serverError(err);
            }
            
            user.create({username: username, password: hashedPassword, role: role}).exec(function(err, doc){
                res.redirect('/user/'+doc.id);
            });
        });
    },
    update: function(req, res){
        
        var id = req.param('id');
        var role = req.param('role');
        var changePassword = req.param('changePassword');
        var password = req.param('password');
        var hashedPassword = passwordHash.generate(password);
        option = {};
        option.role = role;
        if(changePassword=='change')
            option.password = hashedPassword;
        
        user.update({id: id}, option).exec(function(err, doc){
            
            res.redirect('/user/'+id);  
        });
    },
    new: function(req, res){
        
        res.view('user-new');
    },
    destroy: function(req, res){
        
        var id = req.param("id");
        
        user.destroy({id: id}).exec(function(err, result){
            
            res.redirect('user');
        })
    },
    login: function(req, res){
        
        var username = req.param('username');
        var password = req.param('password');
        user.findOne({username: username}).exec(function(err, doc) {
            if(doc==null||!passwordHash.verify(password, doc.password)){
                var message = "用户名或密码错误";
                res.redirect('/login?omitNavigation=omitNavigation&message='+encodeURIComponent(message));
                return;
            }
            
            var Session = require("../lib/session");
            var session = new Session(req.session);
            session.login(doc);
            res.redirect("/");
        });
        
    },
    logout: function(req, res){
        var Session = require('../lib/session');
        var session = new Session(req.session);
        session.logout();
        res.redirect("/login");
    },
    
    destroy: function(req, res){
        var id = req.param('id');
        user_client.update({id: id},{deleted: true}).exec(function(err){
            
        });
    }
    
    
    
};

