import { default as AppMenuComponent } from './component';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { __SubMenuProps } from '../SubMenu/container';
import { WithStyles } from '@material-ui/core';

export default withRouter(AppMenuComponent);

export interface AppMenuProps extends
    RouteComponentProps<{}>,
    WithStyles {
    subMenus: __SubMenuProps[];
};
