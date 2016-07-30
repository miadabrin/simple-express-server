'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())

// Listen on this port
var PORT = 3000;
var VERSION = 1;

// This will have all the todos, no need to save it between restarts.
var todos = [];

// TODO Write server here


//Version
app.get('/', function (req, res) {
  res.send('Version:' + VERSION);
});

app.get('/todos', function (req, res) {
  res.send(todos);
});

app.post('/todos',function (req, res) {
	todos.push(req.body);
	res.status(201).send({});
});

app.listen(PORT, function () {
  console.log('Backend challange app listening on port 3000!');
});