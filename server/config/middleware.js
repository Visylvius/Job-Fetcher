const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

module.exports = (app, express) => {
  app.use(bodyParser.json());
  app.use(morgan('combined'));

};
