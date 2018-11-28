import { Dispatch } from 'redux';
import { setNavAnchorEl } from './actions';
import { MenuContainers } from '../../../_common/';

/** If escape pressed close the submenu */
const keyDownCallback = (dispatch: Dispatch, container: MenuContainers, e: React.KeyboardEvent) => {
    if ( e.keyCode === 27 ) {
        dispatch(setNavAnchorEl(container));
    }
};

let callback;

export const onSetNavAnchorEl = (container: MenuContainers, element?: HTMLElement): any => (dispatch: Dispatch) => {
    if (element) {
        callback = keyDownCallback.bind(null, dispatch, container);
        window.addEventListener('keydown', callback);
    } else {
        window.removeEventListener('keydown', callback);
    }

    dispatch(setNavAnchorEl(container, element || null));
};

export default {
    onSetNavAnchorEl
};