const config = require('./config'),
      passport = require('passport'),
     
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
      
//JWT strategy options
const jwtOptions = {
    //jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
}; 


module.exports = function(){
   //Jwt strategy to authenticate user's with Client role
   passport.use('jwt-1',  new JwtStrategy(jwtOptions, function(payload, done) {
        console.log("Payload username: ", payload.username);
        var user = payload.username;
        return done(null, user);
   }));
   
    
   return {
        initialize: function() {
            return passport.initialize();
        },
        authenticateClient: function(){
            return passport.authenticate('jwt-1', { session: false });
        }
   };
};   
      