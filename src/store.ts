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

let store;

/** Enable redux devtools only for development */
if ( process.env.NODE_ENV === 'development' ) {
    store = createStore(
        applicationReducer,
        composeWithDevTools({
            maxAge: 10,
            serialize: {
                undefined: true
            },
            actionSanitizer,
            stateSanitizer
        })( applyMiddleware(...middlewares) )
    );
} else {
    store = createStore(
        applicationReducer,
        applyMiddleware(...middlewares)
    );
}

export default store;

export { ApplicationState } from './_reducers/';