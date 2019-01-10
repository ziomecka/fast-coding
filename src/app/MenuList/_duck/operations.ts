import { Dispatch } from 'redux';
import { setNavAnchorEl } from './actions';
import { MenuContainersEnum } from '@appTypes';

/** Keyboard listener imports */
import * as manageKeydownListeners from '@app/KeyboardListener/_duck/operations';

let listenerId;

/** If escape pressed close the menuList */
const keyDownCallback = (dispatch: Dispatch, container: MenuContainersEnum, e: React.KeyboardEvent) => {
    if ( e.keyCode === 27 ) {
        dispatch(setNavAnchorEl(container));
    }
};

let callback;

export const onSetNavAnchorEl = (container: MenuContainersEnum, element?: HTMLElement): any => (dispatch: Dispatch) => {
    if (element) {
        callback = keyDownCallback.bind(null, dispatch, container);
        listenerId = dispatch(manageKeydownListeners.onAddListener({
            container,
            listener: [ 'keydown', callback ]
        }));
    } else {
        dispatch(manageKeydownListeners.onRemoveListener({ container, listenerId }));
    }

    dispatch(setNavAnchorEl(container, element || null));
};

export default {
    onSetNavAnchorEl
};