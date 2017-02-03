let rp = require('request-promise');
let validator = require('validator');
let jobModel = require('../../model/job-model');

let kue = require('kue');
let queue = kue.createQueue();

exports.getAllJobs = (req, res) => {
  jobModel.find({}, (err, jobs) => {
    if (err) {
      return res.status(400).json({err});
    }
    res.status(200).send(jobs);
  });
};

exports.getSpecificJob = (req, res) => {
  jobModel.findById(req.params.id, (err, specificJob) => {
    if (err) {
      return res.status(404).json({err});
    }
    res.status(200).send(specificJob);
  });
};

exports.postJob = (req, res) => {
  const url = req.body.url;
  //validator runs a regex on the url to make sure its valid, before saving to the db.
  if (validator.isURL(url)) {
    jobModel.create({
      url,
      status: 'pending',
      html: null
    }, (err, newJob) => {
      //if the url is valid we then add the url to the queue to scrape the html
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
  } else {
    res.status(404).json({error: "The Url submitted wasn't valid. Please submit another url"});
  }
};

const getStaticHtml = (url, id, done) => {
  rp(url)
    .then((htmlString) => {
      jobModel.findOneAndUpdate({_id: id}, {status: 'completed', html: htmlString},
      () => {
        console.log(`the request was successful id:${id} has archived the html`);
      });
    })
    .catch((err) => {
      console.log('there was an error in retrieving the htmlString', err);
      return done(new Error('There was an error with retreiving the htmlString'));
    });
    //we only invoke done when the job is complete
  done();
};


//Whenever a job is queued is function is immediately executed
//the 2nd argument to the process function is how many jobs are allowed to process concurrently.
queue.process('job', 100, (job, done) => {
  getStaticHtml(job.data.url, job.data.id, done);
});
