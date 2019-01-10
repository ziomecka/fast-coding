import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Welcome } from './component';
import { ApplicationState } from '@appStore';

import { changeLocation } from './_duck/actions';

import { WelcomeState } from './_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum, AppLocationEnum } from '@appTypes';

import { WithStyles } from '@material-ui/core/styles';
import { onOpenDemoLesson, onAddKeyDownListener, onRemoveKeyDownListener } from './_duck/operations';

import { IWithMedia } from '@app/Media/';

const { app } = ApplicationContainersEnum;
const { welcome } = AppContainersEnum;

const mapStateToProps = ( state: ApplicationState ): WelcomeState => ( {
    ...state[app][welcome]
} );

const mapDispatchToProps = ( dispatch: Dispatch ): WelcomeDispatch => ( {
    changeLocation: ( appLocation: AppLocationEnum ) => dispatch( changeLocation( appLocation ) ),
    openDemoLesson: () => dispatch( onOpenDemoLesson() ),
    addEventListener: () => dispatch( onAddKeyDownListener() ),
    removeEventListener: () => dispatch( onRemoveKeyDownListener() )
} );

// @ts-ignore
const WelcomeContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( Welcome ) );

export default WelcomeContainer;

export interface WelcomeDispatch {
    changeLocation: ( appLocation: AppLocationEnum ) => Action;
    openDemoLesson: () => Action;
    addEventListener: () => Action;
    removeEventListener: () => Action;
}

export interface WelcomeProps extends WelcomeDispatch,
    WelcomeState,
    WithStyles,
    IWithMedia,
    RouteComponentProps<{}> {
        heading: string;
        animated: boolean;
        timeout: number;
    }
