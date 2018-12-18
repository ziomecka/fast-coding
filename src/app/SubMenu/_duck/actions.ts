import { Action, ActionCreator } from 'redux';
import { SubMenuActionsEnum } from './types';
const { APP_SUBMENU_SET_ANCHOREL } = SubMenuActionsEnum;

import { MenuContainers } from '@appTypes';

export const setNavAnchorEl: ActionCreator<SetNavAnchorElAction> =
    (menuContainer: MenuContainers, anchorEl: HTMLElement | null) => ({
        type: APP_SUBMENU_SET_ANCHOREL,
        menuContainer,
        anchorEl
    });

interface SetNavAnchorElAction extends Action {
    readonly type: string;
    menuContainer: MenuContainers;
    anchorEl: HTMLElement | null;
};

export const actions = {
    setNavAnchorEl
};

export type SubMenuActions = SetNavAnchorElAction;