var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hackersweek' });
});

router.get('/memes',function(req, res, next){

  res.json({
    "Meme1": "Matias prats",
    "Frase2": "Frase celebre de matias"  })
});

module.exports = router;
