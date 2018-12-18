import { Action, ActionCreator } from 'redux';
import { SubMenuActionsEnum } from './types';
const { APP_SUBMENU_SET_ANCHOREL } = SubMenuActionsEnum;

import { MenuContainersEnum } from '@appTypes';

export const setNavAnchorEl: ActionCreator<SetNavAnchorElAction> =
    (menuContainer: MenuContainersEnum, anchorEl: HTMLElement | null) => ({
        type: APP_SUBMENU_SET_ANCHOREL,
        menuContainer,
        anchorEl
    });

interface SetNavAnchorElAction extends Action {
    readonly type: string;
    menuContainer: MenuContainersEnum;
    anchorEl: HTMLElement | null;
};

export const actions = {
    setNavAnchorEl
};

export type SubMenuActions = SetNavAnchorElAction;