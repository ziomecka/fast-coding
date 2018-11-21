import { actions as subMenuActions, SubMenuActions } from '../../SubMenu/_duck/actions';

export const actions = {
    ...subMenuActions
};

export type AppMenuActions = SubMenuActions;