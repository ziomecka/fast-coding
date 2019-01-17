import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as Comparator } from './component';
import { ApplicationState } from '@appStore';

import {
    ComparatorState,
    addEventListener,
    handleKeyboardDown,
    turnOnComparator,
    removeEventListener,
    restoreState
} from './_duck/';

import {
    LessonState,
    onEndingLesson,
    onKeepState,
    onRestoreState,
    onStartLesson
} from '@components/Lesson/';

import { ComponentsContainersEnum } from '@componentsTypes';
import { LocalStorageItemEnum } from '@appTypes';

const { comparator } = ComponentsContainersEnum;

// TODO chyba nie jest potrzebny cały state
const mapStateToProps = ( state: ApplicationState ): ComparatorState & LessonState => ( {
    ...state.components.comparator,
    ...state.components.lesson
} );

const mapDispatchToProps = ( dispatch: Dispatch ): ComparatorDispatch => ( {
    turnOnComparator: () => dispatch( turnOnComparator() ),
    startLesson: () => dispatch( onStartLesson() ),
    endingLesson: () => dispatch( onEndingLesson() ),
    addEventListener: () => dispatch( addEventListener( handleKeyboardDown ) ),
    removeEventListener: () => dispatch( removeEventListener() ),
    keepState: () => dispatch( onKeepState( LocalStorageItemEnum.comparator, comparator ) ),
    restoreState: () => dispatch( onRestoreState( LocalStorageItemEnum.comparator, restoreState ) )
} );

const ComparatorContainer = connect( mapStateToProps, mapDispatchToProps )( Comparator );

export default ComparatorContainer;

export interface ComparatorDispatch {
    turnOnComparator: () => Action;
    startLesson: () => Action;
    endingLesson: () => Action;
    addEventListener: () => Action;
    removeEventListener: () => Action;
    keepState: () => Action;
    restoreState: () => Action;
}

export interface ComparatorProps extends
    ComparatorState,
    ComparatorDispatch,
    LessonState {}
