import * as React from 'react';

import { NavProps } from './container';

import AppMenu from '../../app/AppMenu';

/** Materials */
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Face from '@material-ui/icons/Face';
import Home from '@material-ui/icons/Home';

import { MenuContainers } from '../../_common/';
const { userMenu, mainMenu } = MenuContainers;

const appBarColor = 'primary';

import * as submenus from './submenus';
import { __SubMenuProps } from '../SubMenu/container';

const NavComponent: React.StatelessComponent<NavProps> = props => {
    const subMenus = [
        {
            menuItem: submenus.homeMenuItem,
            icon: <Home />
        },
        {
            menuItems: submenus.userMenuItems,
            icon: <Face />,
            container: userMenu,
        },
        {
            menuItems: submenus.mainMenuItems,
            icon: <MenuIcon />,
            container: mainMenu
        }
    ] as __SubMenuProps[];

  return (
    <AppBar color={appBarColor}>
      <AppMenu {...{ subMenus }} />
    </AppBar>
  );
};

export default NavComponent;