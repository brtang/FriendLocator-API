var User = require('../models/users.js').User;
var config = require('../config/config.js'); 

exports.addfriend = function(req, res, next){
    
    console.log("Made it!!!!!!!!!!", req.user);
    /*
   var requesting_user = req.body.username;
   var friend_requested = req.body.friend;
  
   console.log("Requesting user: ", requesting_user);  
   console.log("Requesting friend for: ", friend_requested);   

   User.findOneAndUpdate({'username': friend_requested,
			  'friends_request': { $ne: requesting_user}},
			   {$addToSet: {friends_request: requesting_user}},
			   {new: true}, function(err, obj){
      if(err) return handleError(err);
      
      if(obj == null){
         res.json({"type": 'addFriend',
                   "success": false,
                   "reason": 'User does not exist'});
      }else{
        console.log("Querying user: ", friend_requested);
        console.log("Friends request array: ", obj.friends_request); 
        User.findOneAndUpdate({'username': requesting_user},
                              {$push: {friends_pending: friend_requested}},
                              {new: true}, function(err, obj){
                if(err) return handleError(err);         
                console.log("Querying username: ", requesting_user);
                console.log("This is pendings array for: ", obj.friends_pending);
                res.json({"type": 'addFriend',
                  "success": true,
                  "reason": 'Both friends exist and no errors reported'});
        });      
      }
   });
   */


}