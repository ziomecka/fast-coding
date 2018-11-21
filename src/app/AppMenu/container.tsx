import { default as AppMenuComponent } from './component';

import { __SubMenuProps } from '../SubMenu/container';

export default AppMenuComponent;

export interface AppMenuProps {
    subMenus: __SubMenuProps[];
};
