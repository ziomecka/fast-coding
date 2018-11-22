import * as React from 'react';

import { NavProps } from './container';

import AppMenu from '../../app/AppMenu';

/** Materials */
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Face from '@material-ui/icons/Face';

import { MenuContainers } from '../../_common/';
const { userMenu, mainMenu } = MenuContainers;

const appBarColor = 'primary';

const NavComponent: React.StatelessComponent<NavProps> = props => {
  const mainMenuItems = [
    ['Home', '/'],
    ['Lessons', '/lessons'],
    ['About', '/about'],
  ];

  const userMenuItems = [
    ['Login', '/login'],
    ['Newuser', '/newuser'],
  ];

  return (
    <AppBar color={appBarColor}>
      <AppMenu
        subMenus={[
          {
            menuItems: userMenuItems,
            icon: <Face />,
            container: userMenu
          },
          {
            menuItems: mainMenuItems,
            icon: <MenuIcon />,
            container: mainMenu
          }
        ]}
      />
    </AppBar>
  );
};

export default NavComponent;