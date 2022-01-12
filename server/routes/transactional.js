var express = require('express');
var axios = require('axios');
var uuid = require('uuid');
var AWS = require('aws-sdk');
var router = express.Router();
AWS.config.update({
  region: "us-east-1"
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/doTransactionsStage1', function(req, res, next) {
  var data = req.body.data ? req.body.data:'';  
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


router.post('/doTransactionsStage2', function(req, res, next) {
  var data = req.body.data ? req.body.data:'';  
  write_to_dynamoDB(req.body.data)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    res.json({ message: 'Tiicket added in db'});
  })
  .catch(function (error) {
    console.log(error);
    res.send(JSON.stringify(error, null, 2));
  });  
});


async function write_to_dynamoDB(user_input_txt, bert_classified, accepted_flag, user_classified, user_classified_other) { 
   var table = "bert_bk_model_txt_classify";
   var params = {
     TableName: table,
     Item: {
       ticket_id: uuid.v4(),
       user_input_txt: user_input_txt?user_input_txt:null,
       bert_classified: bert_classified?bert_classified:null,
       accepted_flag: accepted_flag?accepted_flag:null,
       user_classified: user_classified?user_classified:null,
       user_classified_other: user_classified_other?user_classified_other:null,
       created_tm: new Date().toISOString()
     }
   };
   await docClientDynamo.put(params, function (err, data) {
     if (err) {
       console.error(JSON.stringify(err, null, 2));
     }
   });
 }

module.exports = router;
