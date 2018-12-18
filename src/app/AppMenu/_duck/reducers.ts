import { Reducer } from 'redux';

import { SubMenuActionsEnum } from '../../SubMenu/_duck/types';
const { APP_SUBMENU_SET_ANCHOREL } = SubMenuActionsEnum;

import {
    SubMenuState,
    INITIAL_STATE as SUMBENU_INITIAL_STATE
} from '../../SubMenu/_duck/reducers';

import { MenuContainersEnum } from '@appTypes';

import { AppMenuActions } from './actions';

const { mainMenu, userMenu, languagesMenu} = MenuContainersEnum;

export const INITIAL_STATE: MenuState = {
    [mainMenu]: { ...SUMBENU_INITIAL_STATE },
    [userMenu]: { ...SUMBENU_INITIAL_STATE },
    [languagesMenu]: { ...SUMBENU_INITIAL_STATE }
};

const reducer: Reducer<MenuState, AppMenuActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_SUBMENU_SET_ANCHOREL: {
            return {
                ...state,
                [action.menuContainer]: {
                    anchorEl: action.anchorEl
                }
            };
        }

        default: {
            return { ...state };
        }
    }
}

export { reducer as menuReducer };

export interface MenuState {
    // @ts-ignore
    [subMenuName: MenuContainersEnum]: SubMenuState
};