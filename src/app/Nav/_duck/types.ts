import { MenuButtonOptionsI } from '@app/MenuButton/';
import { MenuListItemType } from '@app/MenuList/container';

export enum MenuContainersEnum {
    userMenu = 'USER_MENU',
    mainMenu = 'MAIN_MENU',
    languagesMenu = 'LANGUAGES_MENU'
}

export type NavMenuType = MenuButtonOptionsI | MenuListItemType;

export interface NavMenuProps {
    component: JSX.Element
}