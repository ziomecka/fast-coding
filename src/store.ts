// import { Reducer } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { applicationReducer } from './_reducers/';

const middlewares = [ thunk ];

export default createStore(
    applicationReducer,
    // composeWithDevTools(
        applyMiddleware(...middlewares)
    // )
);

export { ApplicationState } from './_reducers/reducers';