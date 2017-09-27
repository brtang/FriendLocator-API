var User = require('../models/users.js').User;
var config = require('../config/config.js'); 

exports.request = function(req, res, next){
    
    const user = req.user,
          friend = req.body.friend;
    
    if (!req.body.friend){
        return res.json({"type": 'request',
            "success": false,
            "reason": 'Friend cannot be null'})
    }
  
    User.findOneAndUpdate({'username': friend,
        'friends_request': { $ne: user}},
        {$addToSet: {friends_request: user}},
        {new: true}) 
    .then(function(obj){
        if(obj == null){
            return res.json({"type": 'request',
                "success": false,
                "reason": 'User does not exist or User has already requested friend'});
        }else{         
            User.findOneAndUpdate({'username': user},
                {$push: {friends_pending: friend}},
                {new: true})
            .then(function(obj){               
                return res.json({"type": 'request',
                    "success": true,
                    "reason": 'Both friends exist and no errors reported'});
            })                        
        }
    })
    .catch(function(err){
        return res.json({"success": false,
            "error": err });
    });      
}


exports.accept = function(req, res, next){
    
   const user = req.user,
        friend = req.body.friend,
        accept_notification = user + " has accepted your friend request";
   
    if (!req.body.friend){
        return res.json({"type": 'accept',
            "success": false,
            "reason": 'Friend cannot be null'})               
    }
   
    //Update friends list of requesting user
    User.findOneAndUpdate({'username': user, 'friends_request': friend},
        {$pull: {friends_request: friend}, $addToSet: {friends_list: friend}},
        {new: true})
    .then(function(obj){          
        if(obj == null){
            return res.json({"type": 'accept',
                "success": false,
                "reason": 'User does not exist'});
        }else{
            //Update friends list of friend
            User.findOneAndUpdate({'username': friend},
                {$pull: {friends_pending: user} ,
                $addToSet: {friends_list: user, friends_notifications: accept_notification}},
                {new: true})
            .then(function(obj){               
                if(obj == null){
                    return res.json({"type": 'accept',
                        "success": false,
                        "reason": 'Friend does not exist'});
                }else{             
                    return res.json({"type": 'accept',
                        "success": true,
                        "reason": 'Both friends exist'});
                }
            })        
        }
    })
    .catch(function(err){
        return res.json({"success": false,
              "error": err });
    });  
}


exports.decline = function(req, res, next){
    
   const user = req.user,
         friend = req.body.friend,
         reject_notification = user + " has rejected your friend request";
   
    if (!req.body.friend){
        return res.json({"type": 'decline',
                "success": false,
                "reason": 'Friend cannot be null'})               
    }
       
   //Update friends request of requesting user
    User.findOneAndUpdate({'username': user, 'friends_request': friend},
        {$pull: {friends_request: friend}},
	    {new: true}, function(err, obj){
      if(err) return handleError(err);
      

      
      if(obj == null){
         return res.json({"type": 'decline',
                   "success": false,
                   "reason": 'User does not exist'});
      }else{
        
         //Update notifications list of friend
        User.findOneAndUpdate({'username': friend},
			{$pull: {friends_pending: user}, $addToSet: {friends_notifications: reject_notification}},
			{new: true}, function(err, obj){
            if(err) return handleError(err);
      
            if(obj == null){
               return res.json({"type": 'decline',
                   "success": false,
                   "reason": 'User does not exist'});
            }else{             
                return res.json({"type": 'decline',
                  "success": true,
                  "reason": 'Both users exist'});
            }
        });
      }
   });
  
}