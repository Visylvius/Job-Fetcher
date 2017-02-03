const express = require('express');
const app = express();
const middleware = require('./middleware');

//inject middleware into express
middleware(app);
