import * as React from 'react';

import { LanguagesEnum } from '@applicationTypes';
import { AppRoutesEnum, MenuRulesEnum } from '@appTypes';

const {
    notAnyLesson, notDemoLesson, notHome, notLesson,
    notCurrentLocation, onlyAuthorized, onlyUnauthorized, notActiveLanguage
} = MenuRulesEnum;

export interface MenuRulesHocOptionsI {
    path?: AppRoutesEnum; // path to which Component redirects
    lang?: LanguagesEnum; // language to which component redirects
};

export type MenuRulesHocType = (options?: MenuRulesHocOptionsI) => ({
    [onlyAuthorized]: () => boolean;
    [onlyUnauthorized]: () => boolean;
    [notCurrentLocation]: () => boolean;
    [notActiveLanguage]: () => boolean;
    [notLesson]: () => boolean;
    [notDemoLesson]: () => boolean;
    [notAnyLesson]: () => boolean;
    [notHome]: () => boolean;
});

const defaultValue: MenuRulesHocType = (options) => ({
    [onlyAuthorized]: () => false,
    [onlyUnauthorized]: () => true,
    [notCurrentLocation]: () => false,
    [notActiveLanguage]: () => false,
    [notLesson]: () => false,
    [notDemoLesson]: () => false,
    [notAnyLesson]: () => false,
    [notHome]: () => false
});

const context = React.createContext(defaultValue);

export default context;