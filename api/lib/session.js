function Session(session) {
  this.session = session;
}

Session.prototype.authenticated = function authenticated(){
    if(this.session.user)
      return true;
    return false;
};

Session.prototype.login = function login(user){
    this.session.user = user;
};

Session.prototype.username = function username(){
    return this.session.user.username;
}

Session.prototype.logout = function reset(){
    this.session.destroy();
}

module.exports = Session;
