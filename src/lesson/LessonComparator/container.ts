import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as LessonComparator } from './component';
import { ApplicationState } from '@appStore';

import {
    LessonComparatorState,
    listenKeys,
    stopListenKeys,
    turnOnLessonComparator,
    restoreState
} from './_duck/';

import {
    LessonState,
    onEndingLesson,
    onKeepState,
    onRestoreState,
    onStartLesson
} from '@lesson/Lesson/';

// TODO chyba nie jest potrzebny cały state
const mapStateToProps = ( state: ApplicationState ): LessonComparatorState & LessonState => ( {
    ...state.lesson.lessonComparator,
    ...state.lesson.lesson
} );

const mapDispatchToProps = ( dispatch: Dispatch ): LessonComparatorDispatch => ( {
    turnOnLessonComparator: () => dispatch( turnOnLessonComparator() ),
    startLesson: () => dispatch( onStartLesson() ),
    endingLesson: () => dispatch( onEndingLesson() ),
    keepState: () => dispatch( onKeepState() ),
    listenKeys: () => dispatch( listenKeys() ),
    restoreState: () => dispatch( onRestoreState( { action: restoreState, localStorageItem } ) ),
    stopListenKeys: () => dispatch( stopListenKeys() )
} );

const LessonComparatorContainer = connect( mapStateToProps, mapDispatchToProps )( LessonComparator );

export default LessonComparatorContainer;

export interface LessonComparatorDispatch {
    turnOnLessonComparator: () => Action;
    startLesson: () => Action;
    endingLesson: () => Action;
    keepState: () => Action;
    listenKeys: () => Action;
    restoreState: () => Action;
    stopListenKeys: () => Action;
}

export interface LessonComparatorProps extends
    LessonComparatorState,
    LessonComparatorDispatch,
    LessonState {}
