import { AppRoutesEnum, MenuRulesEnum } from '@appTypes';
import { NavMenuType } from './_duck/types';

import { DialogsEnum } from '@app/Dialog/';
const { simple } = DialogsEnum;

import LoginForm from '@forms/LoginForm';
import NewUserForm from '@forms/NewUserForm';
import RemindPasswordForm from '@forms/RemindPasswordForm';
import ChangePasswordForm from '@forms/ChangePasswordForm';

const { home, lessons } = AppRoutesEnum;
const { onlyAuthorized, onlyUnauthorized, notCurrentLocation, notAnyLesson, fastCodingAuthorization } = MenuRulesEnum;

import { openDialog } from '@app/Dialog';
import store from '@appStore';

export const lessonsMenuItem: NavMenuType = {
    title: 'courses',
    appRoute: lessons,
    rules: [ notCurrentLocation, notAnyLesson ]
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
        onClick: () => store.dispatch( openDialog( {
            variant: simple,
            Component: LoginForm
        } ) ),
        rules: [ onlyUnauthorized ]
    },
    {
        title: 'subMenuUserNewUser',
        onClick: () => store.dispatch( openDialog( {
            variant: simple,
            Component: NewUserForm
        } ) ),
        rules: [ onlyUnauthorized ]
    },
    {
        title: 'subMenuUserChangePassword',
        onClick: () => store.dispatch( openDialog( {
            variant: simple,
            Component: ChangePasswordForm
        } ) ),
        rules: [ onlyAuthorized, fastCodingAuthorization ]
    },
    {
        title: 'subMenuRemindPassword',
        onClick: () => store.dispatch( openDialog( {
            variant: simple,
            Component: RemindPasswordForm
        } ) ),
        rules: [ onlyUnauthorized ]
    }
];
