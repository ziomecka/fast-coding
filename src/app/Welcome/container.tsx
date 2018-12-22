import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Welcome } from './component';
import { ApplicationState } from '@store';

import { changeLocation } from './_duck/actions';

import { WelcomeState } from './_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum, AppLocationEnum } from '@appTypes';

import { WithStyles } from '@material-ui/core/styles';
import { onOpenDemoLesson, onAddKeyDownListener, onRemoveKeyDownListener } from './_duck/operations';

const { app } = ApplicationContainersEnum;
const { welcome } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): WelcomeState => ({
    ...state[app][welcome]
});

const mapDispatchToProps = (dispatch: Dispatch): WelcomeDispatch => ({
    changeLocation: (appLocation: AppLocationEnum) => dispatch(changeLocation(appLocation)),
    openDemoLesson: () => dispatch(onOpenDemoLesson()),
    addEventListener: () => dispatch(onAddKeyDownListener()),
    removeEventListener: () => dispatch(onRemoveKeyDownListener())
});

// @ts-ignore
const WelcomeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));

export default WelcomeContainer;

export interface WelcomeDispatch {
    changeLocation: (appLocation: AppLocationEnum) => void;
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