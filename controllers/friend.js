var User = require('../models/users.js').User;
var config = require('../config/config.js'); 

exports.friendrequest = function(req, res, next){
    
    var requesting_user = req.user;
    var friend_requested = req.body.friend_to_request;
    
    if (!req.body.friend_to_request){
        return res.json({"type": 'addfriend',
                "success": false,
                "reason": 'Friend_to_request cannot be null'})
                
    }
    
    //console.log("Requesting user: ", requesting_user);  
    //console.log("Requesting friend for: ", friend_requested);   

    User.findOneAndUpdate({'username': friend_requested,
                        'friends_request': { $ne: requesting_user}},
                        {$addToSet: {friends_request: requesting_user}},
                        {new: true}) 
    .then(function(obj){
        if(obj == null){
            res.json({"type": 'addFriend',
                   "success": false,
                   "reason": 'User does not exist or User has already requested friend'});
        }else{
            //console.log("Querying user: ", friend_requested);
            //console.log("Friends request array: ", obj.friends_request); 
            
            User.findOneAndUpdate({'username': requesting_user},
                                  {$push: {friends_pending: friend_requested}},
                                  {new: true})
            .then(function(obj){
                console.log("Querying username: ", requesting_user);
                console.log("This is pendings array for: ", obj.friends_pending);
                res.json({"type": 'addFriend',
                          "success": true,
                          "reason": 'Both friends exist and no errors reported'});
            })                        
        }
    })
    .catch(function(err){
        res.json({"success": false,
                  "error": err });
    });    
    
  
}