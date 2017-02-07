import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './reducers';
import test from './components/test';
import { fetchJobs } from './actions/job-actions';


const fetchAllJobs = () => {
  store.dispatch(fetchJobs());
};

export default (
  <Router history={browserHistory}>
    <Route path='/' component={test} onEnter={fetchAllJobs} />
  </Router>
);
