import { default as AppMenuComponent } from './component';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { NavMenuProps  } from '@app/Nav/';
import { WithStyles } from '@material-ui/core/styles/';

export default withRouter(AppMenuComponent);

export interface AppMenuProps extends
    RouteComponentProps<{}>,
    WithStyles {
    subMenus: NavMenuProps[];
}
