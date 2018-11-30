import { connect } from 'react-redux';

import { default as SubMenuComponent } from './component';

import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';

import { onSetNavAnchorEl } from './_duck/operations';

import { withRouter, RouteComponentProps} from 'react-router-dom';

import { MenuState } from '../AppMenu/_duck/reducers';
import { MenuContainers, SubMenuRulesEnum, NavRulesEnum } from '../_common/';

import { ApplicationContainers, AppContainers, AppRoutes } from '../../_common/';

import { WithStyles } from '@material-ui/core/styles';

import { IconButtonProps } from '@material-ui/core/IconButton';
const { app } = ApplicationContainers;
const { appMenu, user } = AppContainers;

/** MenuState because component gets anchorEl from whole [menu] state */
const mapStateToProps = (state: ApplicationState): ExtendedMenuState => ({
    ...state[app][appMenu],
    authorized: state[app][user].authorized
});

const mapDispatchToProps = (dispatch: Dispatch): SubMenuDispatch => ({
    setNavAnchorEl: (container, element) => dispatch(onSetNavAnchorEl(container, element || null))
});

// @ts-ignore
const SubMenuContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SubMenuComponent));

export default SubMenuContainer;

export interface SubMenuDispatch {
    setNavAnchorEl: (container: MenuContainers, element?: HTMLElement | null) => void
};

export type SubMenuItemType = {
    title: string;
    appRoute?: AppRoutes;
    rules: SubMenuRulesEnum[];
    onClick?: () => void;
};

export interface __SubMenuProps {
    menuItems?: SubMenuItemType[];
    menuItem?: SubMenuItemType;
    icon: JSX.Element;
    container?: MenuContainers;
    rules?: NavRulesEnum[];
    iconButton?: IconButtonProps;
};

interface ExtendedMenuState extends MenuState {
    authorized: boolean;
};

export interface SubMenuProps extends __SubMenuProps,
    SubMenuDispatch,
    ExtendedMenuState,
    RouteComponentProps<{}>,
    WithStyles {};