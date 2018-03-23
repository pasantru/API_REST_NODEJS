var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');
var connection = mysql.createConnection(config.database);
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
var jwtVerify = require('../lib/jwt-verify');



//JSON web token
//OAuth1 and 2

/*
//user/passwd
var authenticate = function(req, res, next){
		var _user = "Vega";
		var _pass = "passwd";
		var user = req. body.user;
		var pass = req.body.passwd;
		//igualdad completa ===
		if(_user===user && _pass===pass){
			next();
			return;
		}
		var error = new Error();
		error.msg = "Wrong user or passwd";
		error.status = 403;
		res.json(error);
}
*/




/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM USERS', function(err, users) {
		if (err) {
			return next(err);
		}
		res.json(users);
	});
});


router.get('/user',function(req,res,next) {
	let username = req.query.username;
	connection.query('CALL sp_select_user(?)', username,function(err,user){
		if (err) {
			return next(err);
		}
		res.json(user[0]);
	});
});


//Used to send data via formularies
router.post('/new',function(req,res,err){
	//Hash the password so that the passwd is not in clear text
	var password = sha256(req.body.password);
	//Access the data
	var data = [req.body.name, req.body.surname, req.body.email, password, req.body.username];
	
	//Access the db to create the user
	connection.query('CALL sp_create_user(?,?,?,?,?)', data, function(err, result) {
		if(err){
			return res.json({
				"error":err
			});
		}
		//Return the client data
		res.json(user);
	});
});

router.put('/update', jwtVerify, function(req, res, next) {
	var data = [req.body.name, req.body.surname, req.body.email, req.body.username, req.body.id];
	connection.query('CALL sp_update_user(?,?,?,?,?)', data, function(err, user){
		if(err){
			return res.json({
				"error": err,
				"android": "peine peine",
				"ios": "mejor peine"
			});
		}
		res.json({"user":user[0][0]});
	});
});

//Delete user
router.delete('/delete', jwtVerify, function(req, res, next){
	var id = req.body.id;
	connection.query('DELETE FROM users where id = ?', id, function(err, result){
		if(err){
			return res.json({"err":err});
		}
		res.json({
			"message": "The user has been deleted correctly!",
			"result":result
		});
	});
});

router.post('/sign', function(req, res,next){
	var credentials = {
		email: req.body.email,
		password: sha256(req.body.password)
	};

	var token = jwt.sign(credentials, config.jwt.secret,{
		expiresIn:config.jwt.expiresIn
	});
	res.json({
		"success": "OK",
		"token": token
	});
});

module.exports = router;
