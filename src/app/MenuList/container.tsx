import { connect } from 'react-redux';

import { default as MenuListComponent } from './component';

import { ApplicationState } from '@store';
import { Dispatch } from 'redux';

import { onSetNavAnchorEl } from './_duck/operations';

import { withRouter, RouteComponentProps} from 'react-router-dom';

import { MenuState } from '../AppMenu/_duck/reducers';

import { ApplicationContainersEnum, LanguagesEnum } from '@applicationTypes';
import {
    AppContainersEnum,
    AppRoutesEnum,
    MenuContainersEnum,
    MenuRulesEnum
} from '@appTypes';

import { WithStyles } from '@material-ui/core/styles';

import { IconButtonProps } from '@material-ui/core/IconButton';
const { app } = ApplicationContainersEnum;
const { appMenu, user } = AppContainersEnum;

import { LocalizeState } from 'react-localize-redux';
import { WithMenuRules }  from '../MenuRulesHoc/';

/** MenuState because component gets anchorEl from whole [menu] state */
const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[app][appMenu],
    authorized: state[app][user].authorized,
    localize: state.localize
});

const mapDispatchToProps = (dispatch: Dispatch): MenuListDispatch => ({
    setNavAnchorEl: (container, element) => dispatch(onSetNavAnchorEl(container, element || null))
});

// @ts-ignore
const MenuListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuListComponent));

export default MenuListContainer;

export interface MenuListDispatch {
    setNavAnchorEl: (container: MenuContainersEnum, element?: HTMLElement | null) => void
};

export type MenuListItemType = {
    title: string;
    appRoute?: AppRoutesEnum;
    rules: MenuRulesEnum[];
    onClick?: () => void;
    lang?: LanguagesEnum;
};

export interface __MenuListProps {
    menuItems: MenuListItemType[];
    icon: JSX.Element;
    container: MenuContainersEnum;
    rules?: MenuRulesEnum[];
    iconButton?: IconButtonProps;
    title: string;
};

interface MapStateToPropsI extends MenuState {
    authorized: boolean;
    localize: LocalizeState;
};

export interface MenuListProps extends __MenuListProps,
    MenuListDispatch,
    MapStateToPropsI,
    RouteComponentProps<{}>,
    WithStyles,
    WithMenuRules {};