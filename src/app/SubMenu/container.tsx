import * as React from 'react';
import { connect } from 'react-redux';

import { default as SubMenuComponent } from './component';

import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';

import { setNavAnchorEl } from './_duck/actions';

import { withRouter, RouteComponentProps} from 'react-router-dom';

import { MenuState } from '../AppMenu/_duck/reducers';
import { MenuContainers } from '../_common/';

import { ApplicationContainers, AppContainers } from '../../_common/';

const { app } = ApplicationContainers;
const { appMenu } = AppContainers;

/** MenuState because component gets anchorEl from whole [menu] state */
const mapStateToProps = (state: ApplicationState): MenuState => ({
    ...state[app][appMenu]
});

const mapDispatchToProps = (dispatch: Dispatch): SubMenuDispatch => ({
    setNavAnchorEl: (container, element) => dispatch(setNavAnchorEl(container, element || null))
});

const SubMenuContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SubMenuComponent));

export default SubMenuContainer;

export interface SubMenuDispatch {
    setNavAnchorEl: (container: MenuContainers, element?: HTMLElement | null) => void
};

export interface __SubMenuProps {
    menuItems?: [string, string][];
    menuItem?: [string, string];
    icon: JSX.Element;
    container?: MenuContainers;
};

export interface SubMenuProps extends __SubMenuProps, SubMenuDispatch, MenuState, RouteComponentProps<{}> {
};