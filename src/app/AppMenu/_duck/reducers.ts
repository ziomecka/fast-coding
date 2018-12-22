import { Reducer } from 'redux';

import { MenuListActionsEnum } from '../../MenuList/_duck/types';

const { APP_MENU_LIST_SET_ANCHOREL } = MenuListActionsEnum;

import {
    MenuListState,
    INITIAL_STATE as MENU_LIST_INITIAL_STATE
} from '../../MenuList/_duck/reducers';

import { MenuContainersEnum } from '@appTypes';

import { AppMenuActions } from './actions';

const { mainMenu, userMenu, languagesMenu} = MenuContainersEnum;

export const INITIAL_STATE: MenuState = {
    [mainMenu]: { ...MENU_LIST_INITIAL_STATE },
    [userMenu]: { ...MENU_LIST_INITIAL_STATE },
    [languagesMenu]: { ...MENU_LIST_INITIAL_STATE }
};

const reducer: Reducer<MenuState, AppMenuActions> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_MENU_LIST_SET_ANCHOREL: {
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
    [subMenuName: MenuContainersEnum]: MenuListState
};