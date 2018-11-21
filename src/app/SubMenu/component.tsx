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
      icon,
      setNavAnchorEl,
      container,
    } = props;

    // console.log('props[container]')
    // console.log(props[container])

    const { anchorEl = null} = Object(props[container]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => (
      setNavAnchorEl(container, event.currentTarget)
    );

    const handleClose = (loc: string) => {
      props.history.push(loc);
      setNavAnchorEl(container);
    };

    const handleClickAway = () => {
      if (anchorEl) {
        setNavAnchorEl(container);
      }
    };

    const style = {
      maxWidth: "100px"
    };

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
};

export default SubMenuComponent;
