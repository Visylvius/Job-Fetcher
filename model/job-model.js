const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  url: String,
  status: String,
  html: String
});

const job = mongoose.model('job', jobSchema);

module.exports = job;
