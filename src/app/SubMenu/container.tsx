import { connect } from 'react-redux';

import { default as SubMenuComponent } from './component';

import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';

import { setNavAnchorEl } from './_duck/actions';
import { onSetNavAnchorEl } from './_duck/operations';

import { withRouter, RouteComponentProps} from 'react-router-dom';

import { MenuState } from '../AppMenu/_duck/reducers';
import { MenuContainers, SubMenuRulesEnum, NavRulesEnum } from '../_common/';

import { ApplicationContainers, AppContainers } from '../../_common/';

import { WithStyles } from '@material-ui/core/';

const { app } = ApplicationContainers;
const { appMenu, user } = AppContainers;

/** MenuState because component gets anchorEl from whole [menu] state */
const mapStateToProps = (state: ApplicationState): MenuState => ({
    ...state[app][appMenu],
    authorized: state[app][user].authorized
});

const mapDispatchToProps = (dispatch: Dispatch): SubMenuDispatch => ({
    setNavAnchorEl: (container, element) => dispatch(onSetNavAnchorEl(container, element || null))
});

const SubMenuContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SubMenuComponent));

export default SubMenuContainer;

export interface SubMenuDispatch {
    setNavAnchorEl: (container: MenuContainers, element?: HTMLElement | null) => void
};

export type SubMenuItemType = [string, string, SubMenuRulesEnum[]?];

export interface __SubMenuProps {
    menuItems?: SubMenuItemType[];
    menuItem?: SubMenuItemType;
    icon: JSX.Element;
    container?: MenuContainers;
    rules?: NavRulesEnum[]
};

export interface SubMenuProps extends __SubMenuProps,
    SubMenuDispatch,
    MenuState,
    RouteComponentProps<{}>,
    WithStyles {};