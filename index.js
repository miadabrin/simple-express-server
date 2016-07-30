'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;
app.use(bodyParser.json())
var TodoSchema = {
    type: 'object',
    properties: {
        text: {
            type: 'string',
            required: true
        },
        completed: {
            type: 'boolean',
            required: true
        }
    }
}


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

app.post('/todos', validate({body: TodoSchema}), function (req, res) {
	todos.push(req.body);
	var location = req.url + '/' + (todos.length - 1)
	res.status(201).send(location);
});

app.put('/todos/:index',function (req, res) {
	todos[req.params.index] = req.body;
	res.status(204).send();
});

app.delete('/todos/:index',function (req, res) {
	if(todos.length <= req.params.index){
		res.status(404).send();	
	}
	todos.splice(req.params.index, 1);
	res.status(204).send();
});


app.use(function(err, req, res, next) {
    var responseData;
    if (err.name === 'JsonSchemaValidation') {
        res.status(400).send();
    }
    next();
});

app.listen(PORT, function () {
  console.log('Backend challange app listening on port 3000!');
});

