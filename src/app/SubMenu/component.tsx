import * as React from 'react';

import { NavLink } from 'react-router-dom';

import { SubMenuProps } from './container';
import { AppRoutes, SubMenuRulesEnum, NavRulesEnum } from '../../_common/';

/* Materials */
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const SubMenuComponent: React.StatelessComponent<SubMenuProps> = props => {
    const {
      menuItems,
      menuItem,
      icon,
      setNavAnchorEl,
      container,
      classes
    } = props;

    const currentPathname = props.location.pathname;
    const { anchorEl = null} = Object(props[container]);

    const {
        onlyAuthorized,
        onlyUnauthorized,
        notCurrentLocation,
    } = SubMenuRulesEnum;

    const { lesson, demo, home } = AppRoutes;
    const { notLesson, notAnyLesson, notDemoLesson, notHome } = NavRulesEnum;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => (
      setNavAnchorEl(container, event.currentTarget)
    );

    const handleClose = (loc: string) => {
        props.history.push(loc);
        if (container) {
            setNavAnchorEl(container);
        }
    };

    const handleClickAway = () => {
      if (anchorEl) {
        setNavAnchorEl(container);
      }
    };

    // @ts-ignore
    const subMenuRules: {[key: SubMenuRulesEnum]: () => boolean} = {
        [onlyAuthorized]: () => props.authorized,
        [onlyUnauthorized]: () => !props.authorized,
        [notCurrentLocation]: (path: string) => path !== currentPathname
    };

    // TODO moze sie zdarzyc zefunkcja nie zaimplementowana, bedzie blad
    // TODO
    // powinny pokryc testy?
    const areSubMenuRulesMet: (rules: SubMenuRulesEnum[] | null, pathname: string) => boolean = (rules, pathname) => {
        return (!rules || rules.every(rule => subMenuRules[rule](pathname)));
    };

    // @ts-ignore
    const navRules: {[key: NavRulesEnum]: () => boolean} = {
        [notLesson]: () => currentPathname !== lesson,
        [notDemoLesson]: () => currentPathname !== lesson,
        [notAnyLesson]: () => currentPathname !== lesson && currentPathname !== demo,
        [notHome]: () => currentPathname !== home
    };

    // TODO moze sie zdarzyc zefunkcja nie zaimplementowana, bedzie blad
    // TODO
    // powinny pokryc testy?
    const areNavRulesMet: (rules: NavRulesEnum[] | null) => boolean = (rules) => {
        return (!rules || rules.every(rule => navRules[rule]()));
    };

    if (areNavRulesMet(props.rules)) {
        if (menuItems && container && !menuItem) {
            return (
              <ClickAwayListener onClickAway={handleClickAway}>
                <Toolbar className={classes.menuToolbar}>
                  <IconButton
                    onClick={handleClick}
                    className={classes.menuIcon}
                  >
                    {icon}
                  </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        className={classes.menu}
                      >
                        {menuItems.map((menuItem, ind) => {
                            if (areSubMenuRulesMet(menuItem[2], menuItem[1])) {
                              return (
                                <MenuItem
                                  onClick={() => handleClose(menuItem[1])}
                                  key={`${menuItem[0]}-${ind}`}
                                  divider={true}
                                >
                                  <NavLink to={menuItem[1]}>
                                    {menuItem[0]}
                                  </NavLink>
                                </MenuItem>
                              );
                            }
                            /** Do not render if current pathname */
                            return null;
                          })
                        }
                      </Menu>
                </Toolbar>
              </ClickAwayListener>
            );
        }

        if (menuItem && !container && !menuItems) {
            /** Render if not current pathname */
            if (areSubMenuRulesMet(menuItem[2], menuItem[1])) {
                return (
                    <Toolbar className={classes.menuToolbar}>
                        <IconButton
                            onClick={() => handleClose(menuItem[1])}
                            className={classes.menuIcon}
                        >
                            {icon}
                        </IconButton>
                    </Toolbar>
                );
            }

            return null;
        }

        throw new Error('SubMenu received incorrect props.');
    }

    return null;
};

export default withStyles(styles)(SubMenuComponent);