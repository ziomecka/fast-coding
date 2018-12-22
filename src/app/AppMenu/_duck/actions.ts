import { actions as menuListActions, MenuListActions } from '../../MenuList/_duck/actions';

export const actions = {
    ...menuListActions
};

export type AppMenuActions = MenuListActions;