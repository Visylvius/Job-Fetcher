let rp = require('request-promise');
let validator = require('validator');
let jobModel = require('../../model/job-model');
// let queue = require('../workers');

let kue = require('kue');
let queue = kue.createQueue();

// console.log('queue', queue);


exports.getJobs = (req, res) => {
  jobModel.find({})
  .then((model) => {
    res.status(200).send(model);
  });
};

exports.postJob = (req, res) => {
  const url = req.body.url;
  console.log('url', url);
  jobModel.create({
    url,
    status: 'pending',
    html: null
  }, (err, newJob) => {
    console.log('newJob', newJob);
    console.log('url', url);
    queue.create('job', {
      url,
      status: 'pending',
      html: null,
      id: newJob._id
    }).save((err) => {
      if (err) {
        return res.status(404).json({err});
      }
    });
    res.status(200).send(newJob._id);
  });
};

const getStaticHtml = () => {

};

queue.process('job', 100, (job, done) => {
  console.log('job in queue', job.data);
});
