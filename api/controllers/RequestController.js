/**
 * RequestController
 *
 * @description :: Server-side logic for managing Requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	read: function(req, res){
        var requestId = req.param('request');   
        request.update({id: requestId}, {read: true}).exec(function(err){
            if(err){
                res.serverError(err);
                return;
            }
            res.redirect('/');
        })
    },
    findFromDashboard: function(req, res){
        request.find({status: ['open', 'process']}).populate('client').exec(function(err, requests){
            if(err){
                res.serverError(err);
                return;
            }
            res.view('request-dashboard', {requests: requests});
        });
    },
    updateStatus: function(req, res){
        var status = req.param("status");
        var id = req.param("request");
        request.update({id: id}, {status: status}).exec(function(err){
            if(err){
                res.status(500);
                res.end();
                return;
            }
            res.redirect("/request/findFromDashboard");
            
        })
    }
    
};

