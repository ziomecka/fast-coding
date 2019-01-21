import {
    AddListener,
    RemoveListener,
    RemoveAllListeners
} from './types';

import { LISTENERS } from './constants';

/**
 *
 * @param options {Object}
 * @param options.listener {Array}
 * @param options.container {string}
 *
 * Add event listener to document and listeners' map
 *
 */
const addListener = ( options: AddListener ): number => {
    let { listener, container } = options;
    let listeners = LISTENERS.get( container );

    document.addEventListener( listener[ 0 ], listener[ 1 ] );

    let i = listeners[ 1 ]++;
    listeners[ 0 ].set( i, listener );
    listeners = null; //GC

    return i;
};

/**
 *
 * @param options {Object}
 * @param options.container {string}
 * @param options.listenerId {number}
 *
 * Remove event listener from document and listeners' map
 */
const removeListener = ( options: RemoveListener ): boolean => {
    const { container, listenerId } = options;

    let listeners = LISTENERS.get( container );
    let listener = listeners[ 0 ].get( listenerId );

    if ( listener ) {
        /** Remove from document */
        document.removeEventListener( listener[ 0 ], listener[ 1 ] );
    }

    /** Remove from map */
    let result = listeners[ 0 ].delete( listenerId );

    listeners = null; //GC
    listener = null; // GC

    return result;
};

/**
 *
 * @param options {Object}
 * @param options.container {string}
 *
 * Remove all listeners from document and map
 */
const removeAllListeners = ( options: RemoveAllListeners ): boolean => {
    let listeners = LISTENERS.get( options.container );

    if ( listeners[ 0 ].size ) {
        listeners[ 0 ].forEach( listener => document.removeEventListener( listener[ 0 ], listener[ 1 ] ) );
        listeners[ 0 ].clear();

        listeners = null; //GC

        return true;
    }

    listeners = null; //GC
    return false;
};

export default {
    addListener,
    removeListener,
    removeAllListeners
};
