let rp = require('request-promise');
let validator = require('validator');
let jobModel = require('../../model/job-model');
// let queue = require('../workers');

let kue = require('kue');
let queue = kue.createQueue();

// console.log('queue', queue);


exports.getAllJobs = (req, res) => {
  jobModel.find({})
  .then((model) => {
    res.status(200).send(model);
  });
};

exports.getSpecificJob = (req, res) => {
  console.log('id in getSpecificJob', req.params.id);
  res.sendStatus(200);
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

const getStaticHtml = (url, id, done) => {
  rp(url)
    .then((htmlString) => {
      jobModel.findOneAndUpdate({_id: id}, {status: 'completed', html: htmlString},
      () => {
        console.log(`the request was successful ${id} has successfully cached the html`);
      });
    })
    .catch((err) => {
      console.log('there was an error in retrieving the htmlString', err);
      return done(new Error('There was an error with retreiving the htmlString'));
    });
  done();
};

queue.process('job', 100, (job, done) => {
  getStaticHtml(job.data.url, job.data.id, done);
});
