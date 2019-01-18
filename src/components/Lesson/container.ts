import { Action, Dispatch } from 'redux';

import {
    LessonState,
    onKeepState,
    onReset,
    onRestoreState,
    restoreState
} from './_duck/';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
    deregisterOnDrop,
    registerOnDrop
} from '@app/Content/_duck/actions';

import {
    moveLessonButtons,
    onStartLeaving
} from '@components/LessonButtons/';

import { ApplicationState } from '@appStore';
import { ComponentsContainersEnum } from '@componentsTypes';
import { default as Lesson } from './component';
import { LocalStorageItemEnum } from '@appTypes';
import { LocalizeState } from 'react-localize-redux';
import { WithStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const { lesson: container } = ComponentsContainersEnum;
const { lesson: localStorageItem } = LocalStorageItemEnum;

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => {
    const { running, start, stop, time } = state.components.lessonStats;

    return {
        ...state.components.lesson,
        localize: { ...state.localize },
        running,
        start,
        stop,
        time,
    };
};

const mapDispatchToProps = ( dispatch: Dispatch ): LessonDispatch => ( {
    deregisterOnDrop: ( fun ) => dispatch( deregisterOnDrop( fun ) ),
    keepState: () => dispatch( onKeepState( { container, localStorageItem } ) ),
    onMoveLesonButtons: ( x, y ) => dispatch( moveLessonButtons( x, y ) ),
    registerOnDrop: ( fun ) => dispatch( registerOnDrop( fun ) ),
    reset: () => dispatch( onReset() ),
    restoreState: () => dispatch( onRestoreState( { action: restoreState, localStorageItem } ) ),
    startLeaving: () => dispatch( onStartLeaving() )
} );

// @ts-ignore
const LessonContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( Lesson ) );

export default LessonContainer;

interface MapStateToPropsI extends LessonState {
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
