import { MenuButtonOptionsI } from '@app/MenuButton/';
import { MenuListItemType } from '@app/MenuList/container';
import { MediaEnum } from '@app/Media';

export enum MenuContainersEnum {
    userMenu = 'userMenu',
    mainMenu = 'mainMenu',
    languagesMenu = 'languagesMenu'
}

export type NavMenuType = MenuButtonOptionsI | MenuListItemType;

export interface NavMenuProps {
    component: JSX.Element
}

export interface INavState {
    media: MediaEnum
}
