// import { Reducer } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { applicationReducer } from './_reducers/';

const middlewares = [ thunk ];

const actionSanitizer = (action) => (
        action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
        { ...action, data: '<<LONG_BLOB>>' } : action
);

const stateSanitizer = (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state;

const composeEnhancers = composeWithDevTools({
    maxAge: 10,
    serialize: {
        undefined: true
    },
    actionSanitizer,
    stateSanitizer
});

export default createStore(
    applicationReducer,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

export { ApplicationState } from './_reducers/';