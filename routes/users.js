var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');
var connection = mysql.createConnection(config.database);


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


router.get('/:username',function(req,res,next) {

	connection.query('CALL sp_select_user(?)', req.params.username,function(err,user){


		if (err) {
			return next(err);
		}

		res.json(user);

	});

});


module.exports = router;
