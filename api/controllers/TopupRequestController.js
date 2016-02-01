/**
 * TopupRequestController
 *
 * @description :: Server-side logic for managing Topuprequests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require("moment");
module.exports = {
    findFromDashboard: function(req, res){
        TopupRequest.find({status: ['open', 'process'], sort: 'createdAt ASC'}).populate('client').populate('user').exec(function(err, requests){
            if(err){
                res.serverError(err);
                return;
            }
            res.view('topup-request-find-from-dashboard', {requests: requests, moment: moment});
        });
    },
    updateStatus: function(req, res){
        var status = req.param("status");
        var id = req.param("id");
        TopupRequest.update({id: id}, {status: status}).exec(function(err){
            if(err){
                res.status(500);
                res.end();
                return;
            }
            res.redirect("/TopupRequest/find-from-dashboard");
            
            
        })
    }
};

