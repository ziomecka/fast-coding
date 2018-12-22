import { AppRoutesEnum, SubMenuRulesEnum } from '@appTypes';
import { NavMenuType } from './_duck/types';

const { home, lessons, login, newuser, changePassword, remindPassword } = AppRoutesEnum;
const { onlyAuthorized, onlyUnauthorized, notCurrentLocation } = SubMenuRulesEnum;

export const lessonsMenuItem: NavMenuType = {
    title: 'courses',
    appRoute: lessons,
    rules: [ notCurrentLocation ]
};

export const homeMenuItem: NavMenuType = {
    title: 'home',
    appRoute: home,
    rules: [ notCurrentLocation ]
};

export const mainMenuItems: NavMenuType[] = [
    {
        title: 'courses',
        appRoute: lessons,
        rules: [ notCurrentLocation ]
    }
];

export const userMenuItems: NavMenuType[] = [
    {
        title: 'subMenuUserLogin',
        appRoute: login,
        rules: [ onlyUnauthorized, notCurrentLocation ]
    },
    {
        title: 'subMenuUserNewUser',
        appRoute: newuser,
        rules: [ onlyUnauthorized, notCurrentLocation ]
    },
    {
        title: 'subMenuUserChangePassword',
        appRoute: changePassword,
        rules: [ onlyAuthorized, notCurrentLocation ]
    },
    {
        title: 'subMenuRemindPassword',
        appRoute: remindPassword,
        rules: [ onlyUnauthorized, notCurrentLocation ]
    }
];