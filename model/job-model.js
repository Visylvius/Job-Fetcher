var orm = require('orm');

var Job = module.exports = {
  properties: {
    status: String,
    html: { type: 'text' },
    url: String,
    id: { type: 'serial', key: true }
  }
};
