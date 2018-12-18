import { Action, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { default as NavComponent } from './component';
import { WithStyles } from '@material-ui/core/styles';
import { LocalizeState } from 'react-localize-redux';
import { ApplicationState } from '../../_reducers';

import { onLogOut } from './_duck/operations';

import { AppContainersEnum, ApplicationContainersEnum } from '@appTypes';

const { app } = ApplicationContainersEnum;
const { user } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    localize: { ...state.localize },
    login: state[app][user].login
});

const mapDispatchToProps = (dispatch: Dispatch): NavDispatchI => ({
    logOut: () => dispatch(onLogOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavComponent));

import { LocalizeContextProps } from 'react-localize-redux';

export interface NavProps extends MapStateToPropsI, WithStyles, LocalizeContextProps, RouteComponentProps<{}>, NavDispatchI {};

interface MapStateToPropsI {
    localize: LocalizeState;
    login: string;
};

interface NavDispatchI {
    logOut: () => Action;
}