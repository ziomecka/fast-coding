import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as Welcome } from './component';

import { WithStyles } from '@material-ui/core/styles';
import { onOpenDemoLesson, onAddKeyDownListener, onRemoveKeyDownListener } from './_duck/operations';

import { ILocationContextProps } from '@app/AppLocation/';

const mapStateToProps = () => ( {} );

const mapDispatchToProps = ( dispatch: Dispatch ): WelcomeDispatch => ( {
    openDemoLesson: () => dispatch( onOpenDemoLesson() ),
    addEventListener: () => onAddKeyDownListener(),
    removeEventListener: () => onRemoveKeyDownListener()
} );

// @ts-ignore
const WelcomeContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( Welcome ) );

export default WelcomeContainer;

export interface WelcomeDispatch {
    openDemoLesson: () => Action;
    addEventListener: () => number;
    removeEventListener: () => boolean;
}

export interface WelcomeProps extends WelcomeDispatch,
    WithStyles,
    ILocationContextProps,
    RouteComponentProps<{}> {
        heading: string;
    }
