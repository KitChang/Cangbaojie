/**
 * SystemMsgController
 *
 * @description :: Server-side logic for managing Appusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
moment = require('moment');
 module.exports = {
    find: function(req, res){
        SystemMsg.find({deleted: false}).exec(function(err, resultArr){
            if(err)
                return res.serverError(err);
            res.view('system-msg', {resultArr: resultArr});
            });
    },
    findOne: function(req, res){
        var id = req.param("id");
        SystemMsg.findOne({id: id}).exec(function(err, result){
            if(err)
                return res.serverError(err);
            res.view('system-msg-one', {result: result});
            });
    },
    new: function(req, res){
        res.view('system-msg-new');
    },
    create: function(req, res){
        var title = req.param('title');
        var content = req.param('content');
        var expiredAt = req.param('expiredAt');
        expiredAt = expiredAt.replace(/\//g, "");
        expiredAt = moment(expiredAt, "MMDDYYYY").startOf('day').toDate();
        var effectiveAt = req.param('effectiveAt');
        effectiveAt = effectiveAt.replace(/\//g, "");
        effectiveAt = moment(effectiveAt, "MMDDYYYY").startOf('day').toDate();
        
        SystemMsg.create({
            title: title,
            content: content,
            expiredAt: expiredAt,
            effectiveAt: effectiveAt
        }).exec(function(err, result){
            if(err){
                res.serverError(err);
                return;
            }
            res.redirect("/SystemMsg");
        });
        
    },
     update: function(req, res){
        var id = req.param("id");
        var title = req.param('title');
        var content = req.param('content');
        var expiredAt = req.param('expiredAt');
        expiredAt = expiredAt.replace(/\//g, "");
        expiredAt = moment(expiredAt, "MMDDYYYY").startOf('day').toDate();
        var effectiveAt = req.param('effectiveAt');
        effectiveAt = effectiveAt.replace(/\//g, "");
        effectiveAt = moment(effectiveAt, "MMDDYYYY").startOf('day').toDate();
       
        SystemMsg.update({id: id}, 
        {
            title: title,
            content: content,
            expiredAt: expiredAt,
            effectiveAt: effectiveAt
        }).exec(function(err, result){
            if(err){
                return res.serverError(err);
            }
            res.redirect('/SystemMsg/'+id);
        });
    },
    destroy: function(req, res){
        
        var id = req.param("id");
        SystemMsg.update({id: id}, {deleted: true}).exec(function(err, result){
            res.redirect('/SystemMsg');
        })
    },
     /*
 	getMsg: function (req, res) {
 		var session = req.param('session');
 		if(session==null){
            session = "-1";
        }
        auth.getUserId(session, function(err, appUserId){
            AppUser.findOne({id: appUserId}).exec(function (err, appuser) {
                if(err)
                {
                    res.status(401);
                    res.end();
                    return;
                }
                if(appuser==null)
                {
                    console.log("App user not found");
                    res.status(400);
                    res.end();
                    return;
                }
                console.log(appuser.seenMsg);
                SystemMsg.find({}).sort({createAt: -1}).exec(function (err, systemMsgs) {
                	if (err) {
                		res.status(500);
                		res.end();
                		return;
                	};
                	if (systemMsgs.length == 0) {
                		res.status(204);
                		res.end();
                		return;
                	};
                	res.status(200);
                	res.json({message: systemMsgs});

                })
            });
        });
 	}
 	,createMsg: function (req, res) {
 		var title = req.param('title');
 		var content = req.param('content');
 		var createAt = req.param('createAt');
 		var expireAt = req.param('expireAt');

 		if(title==null||content==null){
            res.status(400);
            res.json({message: "参数不足"});
            return;
        }
        if (createAt==null || createAt=="") {
        	createAt = new Date();
        }
        else {
            createAt = new Date(createAt);
        }
        if (expireAt!=null && expireAt!="") {
            expireAt = new Date(expireAt);
        };
        SystemMsg.create({title: title, content: content
        	, createAt: createAt, expireAt: expireAt}).exec(
        	function (err, systemMsg) {
        		if(err)
                {
                    res.status(401);
                    res.end();
                    return;
                }
                res.status(201);
                res.json(systemMsg);
        	});
 	}
    */

};