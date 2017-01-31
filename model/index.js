const jobSchema = require('./job-model');
const qOrm = require('q-orm');

const config = {
  define: (db, models, next) => {
    models.job = db.qDefine('job', jobSchema.properties);
    db.qSync()
      .then(() => {
        next();
      })
      .catch((err) => {
        throw err;
      });
  }
};

module.exports = config;
