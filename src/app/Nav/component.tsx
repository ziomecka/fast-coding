import * as React from 'react';

import { NavProps } from './container';

import AppMenu from '@app/AppMenu';
import Welcome from '@app/Welcome/';

import {
    HOME_HEADING_ANIMATED,
    HOME_WELCOME_TIMEOUT
} from './constants';

import { getTranslations, getActiveLanguage, getLanguages } from 'react-localize-redux';

/** Materials */
import AppBar from '@material-ui/core/AppBar';
import Face from '@material-ui/icons/Face';
import Dashboard from '@material-ui/icons/Dashboard';

/* Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import style from './styles';

import { MenuContainersEnum, MenuRulesEnum } from '@appTypes';
const { userMenu, languagesMenu } = MenuContainersEnum;

const appBarColor = 'primary';

import * as submenus from './submenus';
import { NavMenuProps } from './_duck/types';
import { withLocalize } from 'react-localize-redux';

import { MenuProvider } from '../MenuRulesHoc/index';

import MenuButton from '../MenuButton';
import MenuList from '../MenuList';

import Media from 'react-media';
import { MEDIA_DESKTOP_MD, MEDIA_DESKTOP_LG } from '@constantsStyles';

const NavComponent: React.StatelessComponent<NavProps> = props => {
    const { notAnyLesson, notActiveLanguage, onlyAuthorized } = MenuRulesEnum;
    const {
        languages,
        setActiveLanguage,
        activeLanguage,
        classes: { navClass, navLessonClass, navLogin },
        logOut,
        login,
        displayName
    } = props;

    const language: NavMenuProps = {
        component: <MenuList
            menuItems={ languages
                .reduce((acc, cv) => {
                    const { code } = cv;
                    acc.push({
                        title: code,
                        rules: [ notActiveLanguage ],
                        lang: code,
                        onClick: () => {
                            setActiveLanguage(code)
                        } });
                    return acc;
                }, []) }
            icon={ <> { activeLanguage? activeLanguage.code : '' } </> }
            container={ languagesMenu }
            title={ 'submenuChangeLanguage' }
    />
    };

    const lessons: NavMenuProps = {
        component: <MenuButton
            { ...submenus.lessonsMenuItem }
            icon ={ <Dashboard /> }
            title={ 'submenuGoToCourses' }
        />
    };

    const user: NavMenuProps = {
        component: <MenuList
            menuItems={ submenus.userMenuItems
            /** Sign out added */
            .concat([ {
                title: 'subMenuUserLogOut',
                rules: [ onlyAuthorized ],
                onClick: logOut
            } ]) }
            //@ts-ignore
            icon={ <span> <Face /> </span> }
            container={ userMenu }
            title={ 'submenuOpenUserMenu' }
            iconButton={{
                className: navLogin,
                login: displayName || login // Displayed under Face icon
            }}
        />
    };

    const isLesson = () => RegExp(/.*lessons\/lesson-.*/).test(props.location.pathname);

    return (
        <AppBar color={appBarColor} className={`${navClass} ${isLesson() ? navLessonClass : ''}`}>
            <MenuProvider>
                <Welcome
                    heading={
                        getTranslations(props.localize).welcomeHeading[
                            getLanguages(props.localize)
                            .findIndex(lang => (
                                lang.code === getActiveLanguage(props.localize).code)
                            )
                        ]
                    }
                    animated={HOME_HEADING_ANIMATED}
                    timeout={HOME_WELCOME_TIMEOUT}
                />

                <Media query={`(min-width: ${ MEDIA_DESKTOP_MD }px)`}>
                    { matches => (
                        matches
                            ? <AppMenu subMenus={[ language, lessons, user ]} />
                            : <AppMenu subMenus={[ language ]} />
                    )}
                </Media>
            </MenuProvider>
        </AppBar>
    );
};

export default withStyles(style)(withLocalize(NavComponent));