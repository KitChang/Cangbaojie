/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
module.exports = {
	findFromDashboard: function(req, res){
        message.find({status: ['open', 'process'], sort: 'createdAt ASC'}).populate('client').populate('user').exec(function(err, messages){
            if(err){
                    res.serverError(err);
                    return;
            }
            res.view('message-find-from-dashboard', {messages: messages, moment: moment});
        });
    },
    updateStatus: function(req, res){
        var status = req.param("status");
        var id = req.param("id");
        message.update({id: id}, {status: status}).exec(function(err){
            if(err){
                res.status(500);
                res.end();
                return;
            }
            res.redirect("/message/find-from-dashboard");
            
        })
    }
};

