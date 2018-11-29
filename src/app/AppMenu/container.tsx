import { default as AppMenuComponent } from './component';

import { __SubMenuProps } from '../SubMenu/container';
import { WithStyles } from '@material-ui/core';
export default AppMenuComponent;

export interface AppMenuProps extends WithStyles {
    subMenus: __SubMenuProps[];
};
