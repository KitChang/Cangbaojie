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
    }
};

