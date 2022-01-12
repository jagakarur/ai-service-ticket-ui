const express = require("express");
const path = require('path');
var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;

const app = express();


var indexRouter = require('./routes/index');
var transactionalRouter = require('./routes/transactional');
var awsDynamoDBRouter = require('./routes/awsDynamoDB');
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/api', indexRouter);
app.use('/api/transactional', transactionalRouter);
app.use('/api/awsDynamoDB', awsDynamoDBRouter);


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});