'use strict';
var express = require('express');
var app = express();

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

app.listen(PORT, function () {
  console.log('Backend challange app listening on port 3000!');
});