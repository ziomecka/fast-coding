import { AppRoutes, SubMenuRulesEnum } from '../../_common/';
import { SubMenuItemType } from '../SubMenu/container';

const { home, lessons, login, newuser } = AppRoutes;
const { onlyAuthorized, onlyUnauthorized, notCurrentLocation } = SubMenuRulesEnum;

export const lessonsMenuItem: SubMenuItemType = {
    title: 'courses',
    appRoute: lessons,
    rules: [ notCurrentLocation ]
};

export const homeMenuItem: SubMenuItemType = {
    title: 'home',
    appRoute: home,
    rules: [ notCurrentLocation ]
};

export const mainMenuItems: SubMenuItemType[] = [
    {
        title: 'courses',
        appRoute: lessons,
        rules: [ notCurrentLocation ]
    }
];

export const userMenuItems: SubMenuItemType[] = [
    {
        title: 'login',
        appRoute: login,
        rules: [ onlyUnauthorized, notCurrentLocation ]
    },
    {
        title: 'new user',
        appRoute: newuser,
        rules: [ onlyUnauthorized, notCurrentLocation ]
    }
];