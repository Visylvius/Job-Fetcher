const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;
const path = require('path');
const indexPath = path.dirname(__dirname)


mongoose.connect(`mongodb://localhost/${process.env.DATABASE || 'myapp'}`);

//inject instance of app into middleware for more modular code
require('./config/middleware.js')(app, express);
app.use('/api', routes);

const server = app.listen(port, () => {
  console.log('server is listening on port ' + port )
})

app.get('/*', (req, res) => {
  console.log('dirname', __dirname);
  res.sendFile(path.join(indexPath, 'dist/index.html'));
});

module.exports = app;
