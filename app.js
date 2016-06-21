var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

// var json = require('./textJson');

app.use('/',require('./deleteItem.js'));
app.use('/',require('./getAllItems'));
app.use('/',require('./getOneItem'));
app.use('/',require('./insert'));
app.use('/',require('./updataItem'));

app.listen(3000,function (){
    console.log('server start');
});
