import { FETCH_ALL_JOBS } from '../actions/job-actions';

const initialState = { jobs: null, error: null, loaded: false};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_JOBS':
      return { jobs: action.payload, error: null, loaded: true};
    case `${FETCH_ALL_JOBS}_PENDING`:
      return state;
    case `${FETCH_ALL_JOBS}_FULFILLED`:
      return { jobs: action.payload, error: null, loaded: true};
    case `${FETCH_ALL_JOBS}_REJECTED`:
      return { jobs: null, error: action.payload, loaded: false};
    default:
      return state;
  }
};
