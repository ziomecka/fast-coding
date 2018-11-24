import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Welcome } from './component';
import { ApplicationState } from '../../store';

import { changeLocation } from './_duck/actions';
import { AppLocation } from '../_common/';

import { WelcomeState } from './_duck/reducers';

import { ApplicationContainers, AppContainers } from '../../_common/';

import { WithStyles } from '@material-ui/core';

const { app } = ApplicationContainers;
const { welcome } = AppContainers;

const mapStateToProps = (state: ApplicationState): WelcomeState => ({
    ...state[app][welcome]
});

const mapDispatchToProps = (dispatch: Dispatch): WelcomeDispatch => ({
    changeLocation: (appLocation: AppLocation) => dispatch(changeLocation(appLocation))
});

// @ts-ignore
const WelcomeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));

export default WelcomeContainer;

export interface WelcomeDispatch {
    changeLocation: (appLocation: AppLocation) => void;
};

export interface WelcomeProps extends WelcomeDispatch,
    WelcomeState,
    WithStyles,
    RouteComponentProps<{}> {
        heading: string;
        animated: boolean;
        timeout: number;
    };