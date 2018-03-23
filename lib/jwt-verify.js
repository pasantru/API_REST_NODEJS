var config = require('../config');
var jwt = require('jsonwebtoken');
var authenticate = function(req, res, next){
    var token = req.headers['access-tokens'] || req.body.accessToken || req.query.accessToken;
    jwt.verify(token, config.jwt.secret, function(err,decoded){
        if(err){
            return res.json(err);
        }
        next();
    });
}
module.exports = jwt;