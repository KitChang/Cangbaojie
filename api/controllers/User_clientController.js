module.exports = {
	find: function(req, res){
        
        user_client.find({deleted: false}).populate('client').exec(function(err, resultArr){
            
            if(err)
                return res.serverError(err);
            
            res.view('user_client', {resultArr: resultArr});
            });
    },
    findOne: function(req, res){
        
        var id = req.param("id");
        
        user_client.findOne({id: id, deleted: false}).exec(function(err, result){
            if(err)
                return res.serverError(err);
            
            res.view('user_client-one', {result: result});
            });
    },
    new: function(req, res){
        
        res.view('user_client-new');
    },
    create: function(req, res){
        
        var username = req.param('username');
        var password = req.param('password');
        var email = req.param('email');
        var client = req.param("client");
        
        user_client.findOne({username: username}).exec(function(err, doc){
            
            if(doc!=null){
                
                return res.serverError("用户名已经存在");
            }
            
            user_client.create({username: username, password: password, email: email, client}).exec(function(err, doc){
                
                res.redirect('/user_client/'+doc.id);
            });
        });
    },
    update: function(req, res){
        
        var id = req.param("id");
        var email = req.param("email");
        var changePassword = req.param('changePassword');
        var password = req.param('password');
        option = {};
        option.email = email;
        if(changePassword=='change'){
            option.password = password;
            console.log("password change");
        }
        user_client.update({id: id}, option
        ).exec(function(err, result){
            
            if(err){
                return res.serverError(err);
            }
            
            res.redirect('/user_client/'+id);
        });
    },
    destroy: function(req, res){
        
        var id = req.param("id");
        
        user_client.update({id: id}, {deleted: true}).exec(function(err, result){
            
            res.redirect('user_client');
        })
    },
    add: function(req, res){
        
    },
    remove: function(req, res){
        
    },

    client: function(req, res){
        
        client.find().exec(function(err, resultArr){
            
            if(err){
                return res.serverError(err);
            }
            
            res.view('user_client-client', {resultArr: resultArr});
        })
    }
    
};

