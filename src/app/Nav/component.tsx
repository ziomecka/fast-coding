import * as React from 'react';

import { NavProps } from './container';

import AppMenu from '../../app/AppMenu';

/** Materials */
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Face from '@material-ui/icons/Face';
import Home from '@material-ui/icons/Home';

/* Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

import { MenuContainers, NavRulesEnum } from '../../_common/';
const { userMenu, mainMenu } = MenuContainers;

const appBarColor = 'primary';

import * as submenus from './submenus';
import { __SubMenuProps } from '../SubMenu/container';

const NavComponent: React.StatelessComponent<NavProps> = props => {
    const { notAnyLesson, notHome, onlyAbout, notAbout } = NavRulesEnum;
    const { classes } = props;

    const { lessons } = classes;

    const subMenus: __SubMenuProps[] = [
        {
            menuItem: submenus.lessonsMenuItem,
            icon: <span className={lessons}> Lessons </span>,
            rules: [ notAnyLesson ]
        },
        {
            menuItem: submenus.homeMenuItem,
            icon: <Home />,
            rules: [ notAnyLesson, notHome ]
        },
        {
            menuItems: submenus.userMenuItems,
            icon: <Face />,
            container: userMenu,
            rules: [ notAnyLesson ]
        },
        {
            menuItems: submenus.mainMenuItems,
            icon: <MenuIcon />,
            container: mainMenu,
            rules: [ notAnyLesson, notHome, notAbout ]
        }
    ] as __SubMenuProps[];

    return (
        <AppBar color={appBarColor}>
            <AppMenu {...{ subMenus }} />
        </AppBar>
    );
};

export default withStyles(style)(NavComponent);