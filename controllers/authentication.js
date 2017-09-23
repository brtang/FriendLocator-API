const jwt = require('jsonwebtoken');
var User = require('../models/users.js').User;
var config = require('../config/config.js'); 


exports.registration = function(req, res, next){
    console.log("Received password: ", req.body.password);
    console.log("Received username: ", req.body.username);
    console.log("Received name: ", req.body.firstName + ' ' + req.body.lastName);

    if (!req.body.username || !req.body.password){
        return res.json({"type": 'registration',
                "success": false,
                "reason": 'Username or password cannot be null'})
                
    }
    
    User.findOne({'username': req.body.username})
    .then(function(obj){
        if(!obj){
            var newUser = new User({username : req.body.username, 
                                    password: req.body.password,
                                    firstName: req.body.firstName, 
                                    lastName: req.body.lastName});
            newUser.save()
            .then(function (obj, numAffected){
                console.log("Num affected: ", numAffected);
                var token = jwt.sign(obj, config.secret, {
                    expiresIn: 60*180*999999999 
                });
                obj.token = token;
                res.json({"type": 'registration',
                  "success": true,
                  "token" : token});
            });
        }else{
            res.json({"type": 'registration',
                    "success": false,
                    "reason": 'User already exists'});
        }            
    })
    .catch(function(err){
        res.json({"success": false,
                  "error": err });
    });
      
}

exports.login = function(req, res, next){
    console.log("Received username: ", req.body.username);
    console.log("Received password: ", req.body.password);
    
    if (!req.body.username || !req.body.password){
        return res.json({"type": 'login',
                "success": false,
                "reason": 'Username or password cannot be null'});
    }
    
    
    User.findOne({'username': req.body.username})
    .then(function(obj){
        if(!obj){
            res.json({"type": 'login',
                    "success": false,
                    "reason": 'User does not exist!'});
        }else if(req.body.password !== obj.password){
            res.json({"type": 'login',
                    "success": false,
                    "reason": 'Incorrect password'});
        }else{
            var token = jwt.sign(obj, config.secret, {
                expiresIn: 60*180*99999999 // expires in 180 mins
            });
            obj.token = token;
            res.json({"type": "login",
                    "success": true,
                    "token" : token,
                    "obj" : obj,
                    "reason": 'Correct username and password'});                   
        }
    
    })
    .catch(function(err){
        res.json({"success": false,
                  "error": err });
    });
    
}