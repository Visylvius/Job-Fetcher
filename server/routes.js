const jobHandler = require('./job');
const Router = require('express').Router;

module.exports = new Router()
  .get('/job', jobHandler.getJobs)
  .post('/job', jobHandler.postJob);
