import { connect } from 'react-redux';

import { default as MenuButtonComponent } from './component';

import { ApplicationState } from '../../store';

import { withRouter, RouteComponentProps} from 'react-router-dom';

import { MenuState } from '../AppMenu/_duck/reducers';

import { ApplicationContainersEnum, LanguagesEnum } from '@applicationTypes';
import {
    AppContainersEnum,
    AppRoutesEnum,
    SubMenuRulesEnum,
    NavRulesEnum,
} from '@appTypes';

import { WithStyles } from '@material-ui/core/styles';

import { IconButtonProps } from '@material-ui/core/IconButton';
import { WithMenuRules }  from '../MenuRulesHoc/';

const { app } = ApplicationContainersEnum;
const { appMenu } = AppContainersEnum;

import { LocalizeState } from 'react-localize-redux';

/** MenuState because component gets anchorEl from whole [menu] state */
const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    ...state[app][appMenu],
    localize: state.localize
});

// @ts-ignore
const MenuButtonContainer = withRouter(connect(mapStateToProps)(MenuButtonComponent));

export default MenuButtonContainer;

export type MenuButtonItemType = {
    title: string;
    appRoute?: AppRoutesEnum;
    rules: SubMenuRulesEnum[];
    onClick?: () => void;
    lang?: LanguagesEnum;
};

export interface __MenuButtonProps {
    menuItem: MenuButtonItemType;
    icon: JSX.Element;
    rules?: NavRulesEnum[];
    iconButton?: IconButtonProps;
    title: string;
};

interface MapStateToPropsI extends MenuState {
    localize: LocalizeState;
};

export interface MenuButtonProps extends __MenuButtonProps,
    MapStateToPropsI,
    RouteComponentProps<{}>,
    WithStyles,
    WithMenuRules {};