const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;
mongoose.connect('mongodb://localhost/myapp');

require('./config/middleware.js')(app, express);
app.use('/api', routes);

const server = app.listen(port, () => {
  console.log('server is listening on port ' + port )
})


//to start mongo
// brew services start mongo

module.exports = app;
