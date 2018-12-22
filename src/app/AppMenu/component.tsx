import * as React from 'react';

import { AppMenuProps } from './container';

/** Materials */
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';

const AppMenuComponent: React.StatelessComponent<AppMenuProps> = (props) => {
    const { subMenus, classes: { toolbar } } = props;

    return (
        <Toolbar className={toolbar}>
            { subMenus.map((subAppMenu, ind) => <React.Fragment key={ ind } > { subAppMenu.component } </React.Fragment> ) }
        </Toolbar>
    );
};

export default withStyles(style)(AppMenuComponent);