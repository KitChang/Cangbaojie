      
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
    var role = req.session.user.role;
    if(role!="admin"){
        res.view('login', { message: 'Not Authorized' });
        return;
    }
    next();
}