var express = require('express');
var router = express.Router();
// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');

AWS.config.update({
  region: "us-east-1"
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  testAWSS3();
  res.send('Test AWS S3');
});

router.get('/createTable', function (req, res, next) {
var dynamodb = new AWS.DynamoDB();
var params = {
    TableName : "bert_bk_model_txt_classify",
    KeySchema: [
        { AttributeName: "ticket_id", KeyType: "HASH" },
        { AttributeName: "user_input_txt", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [   
        { AttributeName: "ticket_id", AttributeType: "S"},
        { AttributeName: "user_input_txt", AttributeType: "S"}
       
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
      res.send(JSON.stringify(err, null, 2));
    } else {
      res.send(JSON.stringify(data, null, 2));
    }
});
});




router.get('/writeDataToDynamoDB', function (req, res, next) {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = "Movies";
  var year = 2015;
  var title = "The Big New Movie";
  var params = {
    TableName: table,
    Item: {
      "year": year,
      "title": title,
      "info": {
        "plot": "Nothing happens at all.",
        "rating": 0
      }
    }
  };

  console.log("Adding a new item...");
  docClient.put(params, function (err, data) {
    if (err) {
      res.send(JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.send(JSON.stringify(data, null, 2));
    }
  });
  //res.send(testDynamoDBWrite("Movies"));
});


router.get('/readDataFromDynamoDB', function (req, res, next) {
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
      TableName: "Movies",
      Select: "ALL_ATTRIBUTES"
  };  
  docClient.scan(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          res.send(JSON.stringify(err, null, 2));
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          res.send(JSON.stringify(data, null, 2));
      }
  });
});

function testAWSS3() {
  // Create unique bucket name
  var bucketName = 'node-sdk-sample-' + uuid.v4();
  // Create name for uploaded object key
  var keyName = 'hello_world.csv';
  // Create a promise on S3 service object
  var bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName }).promise();
  // Handle promise fulfilled/rejected states
  bucketPromise.then(
    function (data) {
      // Create params for putObject call
      var objectParams = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };
      // Create object upload promise
      var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
      uploadPromise.then(
        function (data) {
          console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
        });
    }).catch(
      function (err) {
        console.error(err, err.stack);
      });
}
module.exports = router;