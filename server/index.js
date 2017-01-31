const express = require('express');
const app = express();

const port = process.env.PORT || 4000;
const routes = require('./routes');

require('./config/middleware.js')(app, express);
app.use('/api', routes);

const server = app.listen(port, () => {
  console.log('server is listening on port ' + port )
})

module.exports = app;
