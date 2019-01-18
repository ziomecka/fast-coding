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
    onEndingLesson,
    onStartLesson
} from '@lesson/_operations/';

import { ILessonCommonState } from '@lessonTypes';
import { ILessonComponentState } from '@lesson/LessonComponent/';
import { mapDispatchToProps as commonMapDispatchToProps } from '@lesson/_shared/';

// TODO chyba nie jest potrzebny cały state
const mapStateToProps = ( state: ApplicationState ): IMapStateToProps => ( {
    ...commonMapDispatchToProps( state ),
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

interface IMapStateToProps extends
LessonComparatorState,
ILessonCommonState,
ILessonComponentState {}
