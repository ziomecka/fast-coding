import { connect } from 'react-redux';

import { default as MenuButtonComponent } from './component';

import { ApplicationState } from '../../store';

import { withRouter, RouteComponentProps} from 'react-router-dom';

import { MenuState } from '../AppMenu/_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';

import { MenuButtonOptionsI } from './_duck/types';

import { AppContainersEnum } from '@appTypes';

import { WithStyles } from '@material-ui/core/styles';

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

interface MapStateToPropsI extends MenuState {
    localize: LocalizeState;
};

export interface MenuButtonProps extends MenuButtonOptionsI,
    MapStateToPropsI,
    RouteComponentProps<{}>,
    WithStyles,
    WithMenuRules {};