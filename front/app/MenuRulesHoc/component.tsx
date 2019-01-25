import * as React from 'react';

import MenuRulesHocContext from './context';
import { MenuProviderProps } from './container';

const { Provider } = MenuRulesHocContext;

import { AppRoutesEnum, MenuRulesEnum, UserAuthorizationMethodEnum } from '@appTypes';

const { fastcoding } = UserAuthorizationMethodEnum;

const {
    notAnyLesson, notDemoLesson, notHome, notLesson,
    notCurrentLocation, onlyAuthorized, onlyUnauthorized, notActiveLanguage,
    fastCodingAuthorization
} = MenuRulesEnum;

const { demo, lesson, home } = AppRoutesEnum;

import { getActiveLanguage } from 'react-localize-redux';

const MenuProvider: React.StatelessComponent<MenuProviderProps> = ( props ) => {
    const {
        authorized,
        location: { pathname },
        localize,
        children,
        authorizationMethod
    } = props;

    const { code: activeLang } = getActiveLanguage( localize );

    return (
        <Provider value={options => {
            const { path, lang } = options;

            return {
                [ onlyAuthorized ]: () => authorized,
                [ onlyUnauthorized ]: () => !authorized,
                [ notCurrentLocation ]: () => path !== pathname,
                [ notActiveLanguage ]: () => !lang || lang !== activeLang,
                [ notLesson ]: () => !RegExp( `.*${lesson}.*`, 'g' ).test( pathname ),
                [ notDemoLesson ]: () => pathname !== demo,
                [ notAnyLesson ]: () => !RegExp( `.*${lesson}.*`, 'g' ).test( pathname ) && pathname !== demo,
                [ notHome ]: () => pathname !== home,
                [ fastCodingAuthorization ]: () => authorizationMethod === fastcoding
            };
        }}>
            { children }
        </Provider>
    );
};

export default MenuProvider;
