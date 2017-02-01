const rp = require('request-promise');
const validator = require('validator');
const jobModel = require('../../model/job-model');
const queue = require('./workers');

exports.getJobs = (req, res) => {
  jobModel.find({})
  .then((model) => {
    res.status(200).send(model);
  });
};

exports.postJob = (req, res) => {
  const url = req.body.url;
  jobModel.create({
    url,
    status: 'pending',
    html: null
  })
  .then((newJob) => {
    queue.create('job', {
      id: newJob.id,
      url: newJob.url,
      status: newJob.status
    });
    res.status(200).send(newJob);
  });
};
