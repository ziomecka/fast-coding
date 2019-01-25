import { Action, Dispatch } from 'redux';

import { ILessonComponentState } from './_duck/';
import {
    onKeepState,
    onReset,
    onRestoreState,
} from '@lesson/_operations/';

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
import { ILessonCommonState } from '@lessonTypes';
import { IWithMedia } from '@app/Media/';
import { default as Lesson } from './component';
import { LocalizeState } from 'react-localize-redux';
import { WithStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { mapDispatchToProps as commonMapDispatchToProps } from '@lesson/_shared/';
import { operations } from './_duck';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => {
    const { running, start, stop, time } = state.lesson.lessonStats;

    return {
        ...commonMapDispatchToProps( state ),
        ...state.lesson.lessonComponent,
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
    /** inform about xs media if mounted or media becomes xs */
    informXs: () => dispatch( operations.informXs() ),
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

interface MapStateToPropsI extends
ILessonCommonState,
ILessonComponentState {
    start: number;
    time: number;
    stop: number;
    running: boolean;
    localize: LocalizeState;
}

export interface LessonDispatch {
    deregisterOnDrop: ( fun: Function ) => void;
    informXs(): () => Action;
    keepState: () => Action;
    onMoveLesonButtons: ( x: number | 'auto', y: number | 'auto' ) => void;
    registerOnDrop: ( fun: Function ) => void;
    reset: () => void;
    restoreState: () => Action;
    startLeaving: () => Action;
}

export interface LessonProps extends
    IWithMedia,
    LessonDispatch,
    MapStateToPropsI,
    RouteComponentProps<{}>,
    WithStyles {}
