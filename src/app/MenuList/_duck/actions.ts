import { Action, ActionCreator } from 'redux';
import { MenuListActionsEnum } from './types';
const { APP_MENU_LIST_SET_ANCHOREL } = MenuListActionsEnum;

import { MenuContainersEnum } from '@appTypes';

export const setNavAnchorEl: ActionCreator<SetNavAnchorElAction> =
    (menuContainer: MenuContainersEnum, anchorEl: HTMLElement | null) => ({
        type: APP_MENU_LIST_SET_ANCHOREL,
        menuContainer,
        anchorEl
    });

interface SetNavAnchorElAction extends Action {
    readonly type: string;
    menuContainer: MenuContainersEnum;
    anchorEl: HTMLElement | null;
}

export const actions = {
    setNavAnchorEl
};

export type MenuListActions = SetNavAnchorElAction;