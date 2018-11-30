import * as React from 'react';

import { NavProps } from './container';

import AppMenu from '../../app/AppMenu';

/** Materials */
import AppBar from '@material-ui/core/AppBar';
import Face from '@material-ui/icons/Face';
import Language from '@material-ui/icons/Language';
import Dashboard from '@material-ui/icons/Dashboard';

/* Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

import { MenuContainers, NavRulesEnum } from '../../_common/';
const { userMenu, languagesMenu } = MenuContainers;

const appBarColor = 'primary';

import * as submenus from './submenus';
import { __SubMenuProps } from '../SubMenu/container';
import { withLocalize } from 'react-localize-redux';

const NavComponent: React.StatelessComponent<NavProps> = props => {
    const { notAnyLesson } = NavRulesEnum;
    const { languages, setActiveLanguage, activeLanguage } = props;

    const subMenus: __SubMenuProps[] = [
        {
            menuItems: Object.keys(languages)
                .reduce((acc, cv) => {
                    const { code } = languages[cv];
                    acc.push({
                        title: code,
                        onClick: () => {
                            setActiveLanguage(code)
                        } });
                    return acc;
                }, []),
            icon: <span>{activeLanguage? activeLanguage.code : ''}</span>,
            container: languagesMenu,
            rules: [],
        },
        {
            menuItem: submenus.lessonsMenuItem,
            icon: <Dashboard />,
            rules: [ notAnyLesson ],
            iconButton: {
                title: 'Courses'
            }
        },
        {
            menuItems: submenus.userMenuItems,
            icon: <Face />,
            container: userMenu,
            rules: [ notAnyLesson ],
            iconButton: {
                title: 'User'
            }
        }
    ] as __SubMenuProps[];

    return (
        <AppBar color={appBarColor}>
            <AppMenu {...{ subMenus }} />
        </AppBar>
    );
};

export default withStyles(style)(withLocalize(NavComponent));