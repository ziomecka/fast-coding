import { Reducer } from 'redux';

import { KeyboardListenerListenersType } from './types';

import { KeyboardListenerActions } from './actions';
import { AppContainers, ComponentsContainers, ViewsContainers, MenuContainers } from '../../../_common/';

const { dialog, welcome } = AppContainers;
const { lesson } = ComponentsContainers;
const { homeView } = ViewsContainers;
const { languagesMenu, mainMenu, userMenu } = MenuContainers;

export const INITIAL_STATE: KeyboardListenerState = {
    listeners: new Map([
        [ dialog, new Map() ],
        // @ts-ignore
        [ lesson, new Map([]) ],
        // @ts-ignore
        [ homeView, new Map([]) ],
        [ welcome, new Map([]) ],
        // @ts-ignore
        [ languagesMenu, new Map([]) ],
        // @ts-ignore
        [ mainMenu, new Map([]) ],
        // @ts-ignore
        [ userMenu, new Map([]) ]
    ])
};

const reducer: Reducer<KeyboardListenerState, KeyboardListenerActions> = (state = INITIAL_STATE) => {
    return { ...state };
}

export { reducer as keyboardListenerReducer };

export interface KeyboardListenerState {
    listeners: KeyboardListenerListenersType;
};