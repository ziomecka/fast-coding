import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as LessonButtons } from './component';
import { ApplicationState } from '@appStore';

import {
    LessonState,
    onPauseLesson,
    onReset,
    onRestartLesson,
    onUnpauseLesson
} from '@components/Lesson/';

import { pausedLessonListener } from '@components/LessonComparator/';

import { WithStyles } from '@material-ui/core/styles';

import {
    LessonButtonsState,
    onStartLeaving,
    resetDraggableLessonButtons,
    turnOffDraggableLessonButtons,
    turnOnDraggableLessonButtons
} from './_duck/';

import { LocalizeState } from 'react-localize-redux';

const mapDispatchToProps = ( dispatch: Dispatch ): LessonButtonsDispatch => ( {
    restartLesson: () => dispatch( onRestartLesson() ),
    resetLesson: () => dispatch( onReset() ),
    turnOnDraggable: () => dispatch( turnOnDraggableLessonButtons() ),
    turnOffDraggable: () => dispatch( turnOffDraggableLessonButtons() ),
    resetLessonButtons: () => dispatch( resetDraggableLessonButtons() ),
    startLeaving: () => dispatch( onStartLeaving() ),
    pauseLesson: () => dispatch( onPauseLesson( pausedLessonListener ) ),
    unpauseLesson: () => dispatch( onUnpauseLesson() )
} );

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    ...state.components.lesson,
    ...state.components.lessonButtons,
    dialogOpened: state.app.dialog.dialogProps.open,
    localize: state.localize
} );

const LessonButtonsContainer = withRouter( connect( mapStateToProps, mapDispatchToProps )( LessonButtons ) );

export default LessonButtonsContainer;

interface MapStateToPropsI extends LessonState, LessonButtonsState {
    localize: LocalizeState,
    dialogOpened: boolean;
}

export interface LessonButtonsDispatch {
    restartLesson: () => Action;
    resetLesson: () => Action;
    turnOnDraggable: () => Action;
    turnOffDraggable: () => Action;
    resetLessonButtons: () => Action;
    startLeaving: () => Action;
    pauseLesson: () => Action;
    unpauseLesson: () => Action;
}

export interface LessonButtonsProps extends
    MapStateToPropsI,
    LessonButtonsDispatch,
    RouteComponentProps<{}>,
    WithStyles {}
