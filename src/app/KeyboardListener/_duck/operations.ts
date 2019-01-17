import {
    AddListener,
    KeyboardListenerContainerListenersType,
    ListenerType,
    RemoveListener,
    RemoveAllListeners
} from './types';

import { LISTENERS } from './constants';

const addKeyDownListener = ( listeners: [ KeyboardListenerContainerListenersType, number ], listener: ListenerType ): number => {
    document.addEventListener( listener[ 0 ], listener[ 1 ] );
    let i = listeners[1]++;
    listeners[0].set( i, listener );
    return i;
};

const removeKeyDownListener = ( listeners: [ KeyboardListenerContainerListenersType, number ], listenerId: number ): boolean => {
    try {
        let listener = listeners[ 0 ].get( listenerId );
        document.removeEventListener( listener[ 0 ], listener[ 1 ] );
        listener = null; // GC
        return listeners[ 0 ].delete( listenerId );
    } catch ( err ) {
        return false;
    }
};

const removeAllKeyDownListeners = ( listeners: [ KeyboardListenerContainerListenersType, number ] ): boolean => {
    if ( listeners[ 0 ].size ) {
        listeners.forEach( listener => document.removeEventListener( listener[ 0 ], listener[ 1 ] ) );
        listeners[ 0 ].clear();
    }
    return true;
};

export const onAddListener = ( options: AddListener ): any => (
    addKeyDownListener( LISTENERS.get( options.container ), options.listener )
);

export const onRemoveListener = ( options: RemoveListener ): boolean => (
    removeKeyDownListener( LISTENERS.get( options.container ), options.listenerId )
);

export const onRemoveAllListeners = ( options: RemoveAllListeners ): boolean => (
    removeAllKeyDownListeners( LISTENERS.get( options.container ) )
);

export default {
    onAddListener,
    onRemoveListener,
    onRemoveAllListeners
};
