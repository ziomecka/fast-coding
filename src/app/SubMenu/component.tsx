import * as React from 'react';

import { NavLink } from 'react-router-dom';

import { SubMenuProps } from './container';

/* Materials */
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const SubMenuComponent: React.StatelessComponent<SubMenuProps> = props => {
    const {
      menuItems,
      menuItem,
      icon,
      setNavAnchorEl,
      container,
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

    const style = { maxWidth: "100px" };

    if (menuItems && container && !menuItem) {
        return (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Toolbar {...{ style }}>
              <IconButton onClick={handleClick}>
                {icon}
              </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
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
                <Toolbar {...{ style }}>
                    <IconButton onClick={() => handleClose(menuItem[1])}>
                        {icon}
                    </IconButton>
                </Toolbar>
            );
        }

        return null;
    }

    throw new Error('SubMenu received incorrect props.');
};

export default SubMenuComponent;
