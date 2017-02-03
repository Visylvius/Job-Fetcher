let mocha = require ('mocha');
let chai = require('chai');
let expect = chai.expect;
let should = chai.should;
let request = require('supertest');
let express = require('express');
let app = require('../server');
let jobModel = require('../model/job-model');

//we set this variable so we can grab the id for the post test
let id;
//when running tests use the command
// database=test mocha test/api-test.js

describe('Api Test', () => {
  before(() => {
    jobModel.remove({}, () => {
      console.log('job model has been cleared');
    });
  });
  it('it should return JSON on a get request on the /job endpoint', (done) => {
    request(app)
    .get('/api/job')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
  });
  it('it should fail if not application/json;', (done) => {
    request(app)
    .get('/api/job')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200, (err) => {
      expect(err).to.exist
      done();
    });
  });
  it('should only have 2 entries in the database', (done) => {
    request(app)
    .post('/api/job')
    .send({
      url: "http://google.com"
    })
    .expect(200)
      //we use a promise here because we are making concurrent requests
      .then((response) => {
        console.log('response', response.body);
        id = response.body;
        request(app)
        .post('/api/job')
        .send({
          url: "http://yelp.com"
        })
        .expect(200, () => {
          jobModel.find({}, (err, jobs) => {
            expect(jobs).to.have.length.of(2);
            console.log('id', id);
            done();
          });
        });
      });
  });
  it('should be able to retrieve an individual item in the database', (done) => {
    request(app)
    .get(`/api/job/${id}`)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
  })
});


//check for individual item in the database
//check to see if the request html matches the html from the actual site
//check to see how it responds to a bogus url
