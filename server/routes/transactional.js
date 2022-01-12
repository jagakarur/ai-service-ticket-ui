var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/doTransactions', function(req, res, next) {

  var data = req.body.data ? req.body.data:'Getting low card warning every time';
  
  var config = {
    method: 'post',
    url: 'http://20.190.214.26:80/api/v1/service/myservice123/score',
    headers: { 
      'Authorization': 'Bearer a5GHp64EI4Kb1rl1kMHue99JNvlCoDas', 
      'Content-Type': 'text/plain'
    },
    data : data
  };
  axios(config)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    res.json({ message: response.data});
  })
  .catch(function (error) {
    console.log(error);
    res.send(JSON.stringify(error, null, 2));
  });

  
});

module.exports = router;
