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



router.post('/doExplainability', function(req, res, next) {
  var data = req.body.data ? req.body.data:'';  
  var config = {
    method: 'post',
    url: 'http://20.96.44.183:80/api/v1/service/bertexpl/score',
    headers: { 
      'Authorization': 'Bearer ewFVGMkduns4r45OWqkmh7OSs69pQ4Wt', 
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
  var data = req.body;  
  var ticket_id = uuid.v4();
  //console.log(req.body);
  write_to_dynamoDB(data, ticket_id)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    res.json({ message: ticket_id});
  })
  .catch(function (error) {
    console.log(error);
    res.send(JSON.stringify(error, null, 2));
  });  
});


async function write_to_dynamoDB(inputData, ticket_id) { 
  var dynamodb = new AWS.DynamoDB.DocumentClient();
   var table = "bert_bk_model_txt_classify";
   var params = {
     TableName: table,
     Item: {
       ticket_id: ticket_id,
       user_input_txt: (typeof inputData.user_input_txt !== 'undefined')?inputData.user_input_txt:null,
       bert_classified: (typeof inputData.bert_classified !== 'undefined')?inputData.bert_classified:null,
       accepted_flag: (typeof inputData.accepted_flag !== 'undefined')?inputData.accepted_flag:null,
       user_classified: (typeof inputData.user_classified !== 'undefined')?inputData.user_classified:null,
       user_classified_other: (typeof inputData.user_classified_other !== 'undefined')?inputData.user_classified_other:null,
       created_tm: new Date().toISOString()
     }
   };
   await dynamodb.put(params, function (err, data) {
     if (err) {
       console.error(JSON.stringify(err, null, 2));
     }
   });
 }

module.exports = router;
