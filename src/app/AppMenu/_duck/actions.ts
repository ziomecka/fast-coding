import { actions as menuListActions, MenuListActions } from '@app/MenuList/_duck/actions';

export const actions = {
    ...menuListActions
};

export type AppMenuActions = MenuListActions;