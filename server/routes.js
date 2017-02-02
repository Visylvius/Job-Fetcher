const jobHandler = require('./job');
const Router = require('express').Router;

module.exports = new Router()
  .get('/job', jobHandler.getAllJobs)
  .get('/job/:id', jobHandler.getSpecificJob)
  .post('/job', jobHandler.postJob);
