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
            res.redirect('/');
        })
    },
    findFromDashboard: function(req, res){
        request.find({status: ['open', 'process']}).populate('client').exec(function(err, requests){
            res.view('request-dashboard', {requests: requests});
        });
    },
    updateStatus: function(req, res){
        var status = req.param("status");
        var id = req.param("request");
        request.update({id: id}, {status: status}).exec(function(){
            res.redirect("/request/findFromDashboard");
        })
    }
    
};

