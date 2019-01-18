import { Action, Dispatch } from 'redux';

import {
    ILessonComponentState,
    onKeepState,
    onReset,
    onRestoreState,
} from './_duck/';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
    deregisterOnDrop,
    registerOnDrop
} from '@app/Content/_duck/actions';

import {
    moveLessonButtons,
    onStartLeaving
} from '@lesson/LessonButtons/';

import { ApplicationState } from '@appStore';
import { default as Lesson } from './component';
import { LocalizeState } from 'react-localize-redux';
import { WithStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => {
    const { running, start, stop, time } = state.lesson.lessonStats;

    return {
        ...state.lesson.lesson,
        localize: { ...state.localize },
        running,
        start,
        stop,
        time,
    };
};

const mapDispatchToProps = ( dispatch: Dispatch ): LessonDispatch => ( {
    /** deregisterOnDrop in componentWillUnmount */
    deregisterOnDrop: ( fun ) => dispatch( deregisterOnDrop( fun ) ),
    /** keepState in componentDidMount */
    keepState: () => dispatch( onKeepState() ),
    /** onMoveLessonButtons in onDrop */
    onMoveLesonButtons: ( x, y ) => dispatch( moveLessonButtons( x, y ) ),
    /** registerOnDrop in componentDidMount */
    registerOnDrop: ( fun ) => dispatch( registerOnDrop( fun ) ),
    /** reset in componentWillUnmount */
    reset: () => dispatch( onReset() ),
    /** restoreState in componentDidMount */
    restoreState: () => dispatch( onRestoreState() ),
    /** startLeaving in window.onpopstate */
    startLeaving: () => dispatch( onStartLeaving() )
} );

// @ts-ignore
const LessonContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( Lesson ) );

export default LessonContainer;

interface MapStateToPropsI extends ILessonComponentState {
    start: number;
    time: number;
    stop: number;
    running: boolean;
    localize: LocalizeState;
}

export interface LessonDispatch {
    deregisterOnDrop: ( fun: Function ) => void;
    keepState: () => Action;
    onMoveLesonButtons: ( x: number | 'auto', y: number | 'auto' ) => void;
    registerOnDrop: ( fun: Function ) => void;
    reset: () => void;
    restoreState: () => Action;
    startLeaving: () => Action;
}

export interface LessonProps extends LessonDispatch,
    MapStateToPropsI,
    RouteComponentProps<{}>,
    WithStyles {}
