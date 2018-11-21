import { SubMenuState } from '../../SubMenu/_duck/reducers';

export const INITIAL_STATE: SubMenuState = {
    anchorEl: null
};

export interface SubMenuState {
    anchorEl: HTMLElement | null;
};