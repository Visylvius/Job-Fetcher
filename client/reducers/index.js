import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise(), ReduxThunk, createLogger())(createStore);

import { jobReducer } from './job-reducer';

const rootReducer = combineReducers({
 job: jobReducer
});

export default createStoreWithMiddleware(rootReducer);
