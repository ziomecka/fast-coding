import * as React from 'react';

import { AppMenuProps } from './container';
import SubMenu from '../SubMenu/';

/** Materials */
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const AppMenuComponent: React.StatelessComponent<AppMenuProps> = (props) => {
    const { subMenus, classes } = props;
    const { toolbar } = classes;

    return (
        <Toolbar className={toolbar}>
            {subMenus.map((subAppMenu, ind) => (
                <SubMenu {...subAppMenu} key={`${subAppMenu}-${ind}`} />
            ))}
        </Toolbar>
    );
};

export default withStyles(style)(AppMenuComponent);