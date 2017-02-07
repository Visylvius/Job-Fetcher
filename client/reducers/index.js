import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise(), ReduxThunk, createLogger())(createStore);

const initialState = { stuff: 'none', error: null, loaded: false};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
    return state;
  }
};

const rootReducer = combineReducers({
 test: testReducer
});

export default createStoreWithMiddleware(rootReducer);
