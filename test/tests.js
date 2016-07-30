'use strict';

var server = require('../index.js');
var expect = require('chai').expect;
var request = require('supertest')('http://localhost:3000');

describe('Backend challenge', function() {
  it('should get empty todos list', function(done) {
    request.
    get('/todos').
    expect(200, [], done);
  });

  it('should add a todo', function(done) {
    request.
    post('/todos').
    send({
      text: 'Finish the frontend challenge',
      completed: true
    }).
    expect(201, done);
  });

  it('should verify just one todo exist', function(done) {
    request.
    get('/todos').
    expect(200).
    end(function(err, response) {
      if (err) {
        throw err;
      }

      expect(response.body).to.be.instanceof(Array);
      expect(response.body).to.have.length(1);
      expect(response.body[0].text).to.be.an('string');
      expect(response.body[0].completed).to.be.an('boolean');

      expect(response.body[0].text).to.equal('Finish the frontend challenge');
      expect(response.body[0].completed).to.equal(true);

      done();
    });
  });

  it('should add a todo', function(done) {
    request.
    post('/todos').
    send({
      text: 'Finish the backend challenge',
      completed: false
    }).
    expect(201, done);
  });

  it('should verify two todos exist', function(done) {
    request.
    get('/todos').
    expect(200).
    end(function(err, response) {
      if (err) {
        throw err;
      }

      expect(response.body).to.be.instanceof(Array);
      expect(response.body).to.have.length(2);

      expect(response.body[0].text).to.be.an('string');
      expect(response.body[0].completed).to.be.an('boolean');

      expect(response.body[1].text).to.be.an('string');
      expect(response.body[1].completed).to.be.an('boolean');


      expect(response.body[0].text).to.equal('Finish the frontend challenge');
      expect(response.body[0].completed).to.equal(true);

      expect(response.body[1].text).to.equal('Finish the backend challenge');
      expect(response.body[1].completed).to.equal(false);

      done();
    });
  });

  it('should update the first todo', function(done) {
    request.
    put('/todos/0').
    send({
      text: 'Get hired @ Personalics !',
      completed: false
    }).
    expect(204, done);
  });

  it('should verify that update is working correctly', function(done) {
    request.
    get('/todos').
    expect(200).
    end(function(err, response) {
      if (err) {
        throw err;
      }

      expect(response.body).to.be.instanceof(Array);
      expect(response.body).to.have.length(2);

      expect(response.body[0].text).to.be.an('string');
      expect(response.body[0].completed).to.be.an('boolean');

      expect(response.body[1].text).to.be.an('string');
      expect(response.body[1].completed).to.be.an('boolean');


      expect(response.body[0].text).to.equal('Get hired @ Personalics !');
      expect(response.body[0].completed).to.equal(false);

      expect(response.body[1].text).to.equal('Finish the backend challenge');
      expect(response.body[1].completed).to.equal(false);

      done();
    });
  });

  it('should delete the second todo', function(done) {
    request.
    delete('/todos/1').
    expect(204, done);
  });

  it('should verify that delete is working correctly', function(done) {
    request.
    get('/todos').
    expect(200).
    end(function(err, response) {
      if (err) {
        throw err;
      }

      expect(response.body).to.be.instanceof(Array);
      expect(response.body).to.have.length(1);

      expect(response.body[0].text).to.be.an('string');
      expect(response.body[0].completed).to.be.an('boolean');

      expect(response.body[0].text).to.equal('Get hired @ Personalics !');
      expect(response.body[0].completed).to.equal(false);

      done();
    });
  });

  it('should get 400 on wrong parameters when trying to add todo', function(done) {
    request.
    post('/todos').
    send({
      namez: 'this field should be named name',
      completed: 'wrong type'
    }).
    expect(400, done);
  });

  it('should fail deleting a non-exitent todo', function(done) {
    request.
    delete('/todos/20').
    expect(404, done);
  });
});
