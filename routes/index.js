const routes = require('express').Router();
      express = require('express');
      passport = require('passport');
      AuthenticationController = require('../controllers/authentication');
      FriendController = require('../controllers/friend');
      passportService = require('../config/passport')();  
      
module.exports = function(app){
    
    //General Registration & Login routes
    app.post('/registration', AuthenticationController.registration);
    
    app.post('/login', AuthenticationController.login);
    
    
    //Friend request, accept, and decline routes
    var friendRoutes = express.Router(); 
    
    friendRoutes.post('/request', passportService.authenticateClient(), FriendController.request);
    
    friendRoutes.post('/accept', passportService.authenticateClient(), FriendController.accept);
    
     friendRoutes.post('/decline', passportService.authenticateClient(), FriendController.decline);
     
    app.use('/friend', friendRoutes);

};      