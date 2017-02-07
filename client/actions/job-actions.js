import axios from 'axios';
export const FETCH_ALL_JOBS = 'FETCH_ALL_JOBS';

export const fetchJobs = () => {
  return (dispatch) => {
    return axios.get('/api/job')
      .then(response => {
        dispatch({
          type: FETCH_ALL_JOBS,
          payload: response.data
        });
      });
  };
};
