const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const orm = require('orm');
const qOrm = require('q-orm');
const ormConfig = require('../../model');

module.exports = (app, express) => {
  app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use(qOrm.qConnect('postgres://nkltpffk:2m0aUHvM_1gvcjyxYFGsu1vHtHa45p_N@babar.elephantsql.com:5432/nkltpffk', ormConfig));
};
