import { AppRoutes, SubMenuRulesEnum } from '../../_common/';
import { SubMenuItemType } from '../SubMenu/container';

const { home, lessons, about, login, newuser } = AppRoutes;
const { onlyAuthorized, onlyUnauthorized, notCurrentLocation } = SubMenuRulesEnum;

export const lessonsMenuItem: SubMenuItemType = {
    title: 'Lessons',
    appRoute: lessons,
    rules: [ notCurrentLocation ]
};

export const homeMenuItem: SubMenuItemType = {
    title: 'Home',
    appRoute: home,
    rules: [ notCurrentLocation ]
};

export const mainMenuItems: SubMenuItemType[] = [
    {
        title: 'Lessons',
        appRoute: lessons,
        rules: [ notCurrentLocation ]
    },
    {
        title: 'About',
        appRoute: about,
        rules: [ notCurrentLocation ] 
    }
];

export const userMenuItems: SubMenuItemType[] = [
    {
        title: 'Login',
        appRoute: login,
        rules: [ onlyUnauthorized, notCurrentLocation ]
    },
    {
        title: 'Newuser',
        appRoute: newuser,
        rules: [ onlyUnauthorized, notCurrentLocation ]
    }
];