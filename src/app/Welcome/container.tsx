import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Welcome } from './component';
import { ApplicationState } from '../../store';

import { changeLocation } from './_duck/actions';

import { WelcomeState } from './_duck/reducers';

import { ApplicationContainers } from '@applicationTypes';
import { AppContainers, AppLocation } from '@appTypes';

import { WithStyles } from '@material-ui/core/styles';
import { onOpenDemoLesson, onAddKeyDownListener, onRemoveKeyDownListener } from './_duck/operations';

const { app } = ApplicationContainers;
const { welcome } = AppContainers;

const mapStateToProps = (state: ApplicationState): WelcomeState => ({
    ...state[app][welcome]
});

const mapDispatchToProps = (dispatch: Dispatch): WelcomeDispatch => ({
    changeLocation: (appLocation: AppLocation) => dispatch(changeLocation(appLocation)),
    openDemoLesson: () => dispatch(onOpenDemoLesson()),
    addEventListener: () => dispatch(onAddKeyDownListener()),
    removeEventListener: () => dispatch(onRemoveKeyDownListener())
});

// @ts-ignore
const WelcomeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));

export default WelcomeContainer;

export interface WelcomeDispatch {
    changeLocation: (appLocation: AppLocation) => void;
    openDemoLesson: () => void;
    addEventListener: () => Action;
    removeEventListener: () => Action;
};

export interface WelcomeProps extends WelcomeDispatch,
    WelcomeState,
    WithStyles,
    RouteComponentProps<{}> {
        heading: string;
        animated: boolean;
        timeout: number;
    };