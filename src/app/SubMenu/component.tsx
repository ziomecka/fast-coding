import * as React from 'react';

import { NavLink } from 'react-router-dom';

import { SubMenuProps } from './container';

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

    const { anchorEl = null} = Object(props[container]);

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
                        /** Render if not current pathname */
                        if (menuItem[1] !== props.location.pathname) {
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
        if (menuItem[1] !== props.location.pathname) {
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
};

export default withStyles(styles)(SubMenuComponent);
