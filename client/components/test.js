import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import store from '../reducers';
import { fetchJobs } from '../actions/job-actions';

const test = ({job}) => {
  if (job === null) {
    return null;
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-3'>
          <p className='header-text'>Job Id</p>
        </div>
        <div className='col-3'>
          <p className='header-text'>Job Status</p>
        </div>
        <div className='col-3'>
          <p className='header-text'>Url</p>
        </div>
        <div className='col-3'>
          <p className='header-text'>HTML</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-3'>

        </div>
      </div>
      {console.log('job', job)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { job: state.job };
};

export default connect(mapStateToProps, null)(test);
