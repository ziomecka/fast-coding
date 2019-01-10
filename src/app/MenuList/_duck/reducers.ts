import { MenuListState } from '@app/MenuList/_duck/reducers';

export const INITIAL_STATE: MenuListState = {
    anchorEl: null
};

export interface MenuListState {
    anchorEl: HTMLElement | null;
}