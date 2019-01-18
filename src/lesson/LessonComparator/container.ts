import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as LessonComparator } from './component';
import { ApplicationState } from '@appStore';

import {
    LessonComparatorState,
    listenKeys,
    stopListenKeys,
    turnOnLessonComparator,
} from './_duck/';

import {
    ILessonComponentState,
    onEndingLesson,
    onStartLesson
} from '@lesson/LessonComponent/';

// TODO chyba nie jest potrzebny cały state
const mapStateToProps = ( state: ApplicationState ): LessonComparatorState & ILessonComponentState => ( {
    ...state.lesson.lessonComparator,
    ...state.lesson.lessonComponent
} );

const mapDispatchToProps = ( dispatch: Dispatch ): LessonComparatorDispatch => ( {
    turnOnLessonComparator: () => dispatch( turnOnLessonComparator() ),
    startLesson: () => dispatch( onStartLesson() ),
    endingLesson: () => dispatch( onEndingLesson() ),
    listenKeys: () => dispatch( listenKeys() ),
    stopListenKeys: () => dispatch( stopListenKeys() )
} );

const LessonComparatorContainer = connect( mapStateToProps, mapDispatchToProps )( LessonComparator );

export default LessonComparatorContainer;

export interface LessonComparatorDispatch {
    turnOnLessonComparator: () => Action;
    startLesson: () => Action;
    endingLesson: () => Action;
    listenKeys: () => Action;
    stopListenKeys: () => Action;
}

export interface LessonComparatorProps extends
    LessonComparatorState,
    LessonComparatorDispatch,
    ILessonComponentState {}
