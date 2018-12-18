import { connect } from 'react-redux';

import { default as SubMenuComponent } from './component';

import { ApplicationState } from '../../store';
import { Dispatch } from 'redux';

import { onSetNavAnchorEl } from './_duck/operations';

import { withRouter, RouteComponentProps} from 'react-router-dom';

import { MenuState } from '../AppMenu/_duck/reducers';

import { ApplicationContainers } from '@applicationTypes';
import {
    AppContainers,
    AppRoutes,
    MenuContainers,
    SubMenuRulesEnum,
    NavRulesEnum,
    LanguagesEnum
} from '@appTypes';

import { WithStyles } from '@material-ui/core/styles';

import { IconButtonProps } from '@material-ui/core/IconButton';
const { app } = ApplicationContainers;
const { appMenu, user } = AppContainers;

import { LocalizeState } from 'react-localize-redux';

/** MenuState because component gets anchorEl from whole [menu] state */
const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[app][appMenu],
    authorized: state[app][user].authorized,
    localize: state.localize
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
    lang?: LanguagesEnum;
};

export interface __SubMenuProps {
    menuItems?: SubMenuItemType[];
    menuItem?: SubMenuItemType;
    icon: JSX.Element;
    container?: MenuContainers;
    rules?: NavRulesEnum[];
    iconButton?: IconButtonProps;
    title: string;
};

interface MapStateToPropsI extends MenuState {
    authorized: boolean;
    localize: LocalizeState;
};

export interface SubMenuProps extends __SubMenuProps,
    SubMenuDispatch,
    MapStateToPropsI,
    RouteComponentProps<{}>,
    WithStyles {};