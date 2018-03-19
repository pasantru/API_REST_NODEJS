var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require("../config.js");
var connection = mysql.createConnection(config.database);
/* GET users listing. */
router.get('/', function(req, res, next) {
  //Hacer consulta a la base de datos
  connection.query("SELECT * FROM users", function(err, users){

      if(err){
        return next(err);
      }
      //Devolver los datos

      //Modificaciones rápidas
      console.log("Soy el segundo");
      res.json(users);
  });
  router.get("/user",function(req,res, next){
    connection.query("CALL sp_select_user(?)", req.query.username, function(err,users))
    if(err){
      return next(err);
    }
    res.json(user);
  });
  
  router.get("/:username",function(req,res, next){
    connection.query("CALL sp_select_user(?)", req.params.username, function(err,users))
    if(err){
      return next(err);
    }
    res.json(user);
  });

  // res.send('respond with a resource');
});

module.exports = router;
