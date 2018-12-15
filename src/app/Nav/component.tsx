import * as React from 'react';

import { NavProps } from './container';

import AppMenu from '../../app/AppMenu';
import Welcome from '../../app/Welcome/';
import {
    HOME_HEADING_ANIMATED,
    HOME_NOTIFICATION,
    HOME_WELCOME_TIMEOUT
} from '../../constants';
import { getTranslations, getActiveLanguage, getLanguages } from 'react-localize-redux';

/** Materials */
import AppBar from '@material-ui/core/AppBar';
import Face from '@material-ui/icons/Face';
import Language from '@material-ui/icons/Language';
import Dashboard from '@material-ui/icons/Dashboard';

/* Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

import { MenuContainers, NavRulesEnum, SubMenuRulesEnum } from '../../_common/';
const { userMenu, languagesMenu } = MenuContainers;

const appBarColor = 'primary';

import * as submenus from './submenus';
import { __SubMenuProps } from '../SubMenu/container';
import { withLocalize } from 'react-localize-redux';

const NavComponent: React.StatelessComponent<NavProps> = props => {
    const { notAnyLesson } = NavRulesEnum;
    const { notActiveLanguage, onlyAuthorized } = SubMenuRulesEnum;
    const {
        languages,
        setActiveLanguage,
        activeLanguage,
        classes: { navClass, navLessonClass, navLogin },
        logOut,
        login
    } = props;

    const subMenus: __SubMenuProps[] = [
        /** Languages menu */
        {
            menuItems: Object.keys(languages)
                .reduce((acc, cv) => {
                    const { code } = languages[cv];

                    acc.push({
                        title: code,
                        rules: [ notActiveLanguage ],
                        lang: code,
                        onClick: () => {
                            setActiveLanguage(code)
                        } });
                    return acc;
                }, []),
            icon: <>{activeLanguage? activeLanguage.code : ''}</>,
            container: languagesMenu,
            rules: [],
            title: 'submenuChangeLanguage',
        },
        /** Lessons menu */
        {
            menuItem: submenus.lessonsMenuItem,
            icon: <Dashboard />,
            rules: [ notAnyLesson ],
            title: 'submenuGoToCourses',
        },
        /** User menu */
        {
            menuItems: submenus.userMenuItems
                /** Sign out added */
                .concat([ {
                    title: 'subMenuUserLogOut',
                    rules: [ onlyAuthorized ],
                    onClick: logOut
                } ]),
            //@ts-ignore
            icon: <span className={ navLogin } login={ login }> <Face /> </span>,
            container: userMenu,
            title: 'submenuOpenUserMenu',
        }
    ] as __SubMenuProps[];

    const isLesson = () => RegExp(/.*lessons\/lesson-.*/).test(props.location.pathname);

    return (
        <AppBar color={appBarColor} className={`${navClass} ${isLesson() ? navLessonClass : ''}`}>
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
            <AppMenu {...{ subMenus }} />
        </AppBar>
    );
};

export default withStyles(style)(withLocalize(NavComponent));