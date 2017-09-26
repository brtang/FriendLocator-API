const routes = require('express').Router();
      express = require('express');
      passport = require('passport');
      AuthenticationController = require('../controllers/authentication');
      FriendController = require('../controllers/friend');
      passportService = require('../config/passport')();  
      
module.exports = function(app){
    
    //General Registration route
    app.post('/registration', AuthenticationController.registration);
    
    app.post('/login', AuthenticationController.login);
    
    app.post('/friendrequest', passportService.authenticateClient(), FriendController.friendrequest);

};      