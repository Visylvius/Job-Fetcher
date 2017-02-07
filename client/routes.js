import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './reducers';
import test from './components/test';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={test} />
  </Router>
);
