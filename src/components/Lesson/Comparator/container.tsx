import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as Comparator } from './component';
import { ApplicationState } from '../../../store';

import { ComparatorState } from './_duck/reducers';
import { LessonState } from '../_duck/reducers';

import { ComponentsContainers, ApplicationContainers, LocalStorageItemTypes } from '@applicationTypes';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;

import { onEndingLesson, onStartLesson } from '../_duck/operations/life';
import { onKeepState, onRestoreState } from '../_duck/operations/restore.state';

import { default as operations  } from './_duck/operations/index';
const {
    onAddEventListener,
    onTurnOnComparator,
    onRemoveEventListener,
    handleKeyboardDown
} = operations;

import { restoreState } from './_duck/actions';

// TODO chyba nie jest potrzebny cały state
const mapStateToProps = (state: ApplicationState): ComparatorState & LessonState => ({
    ...state[components][comparator],
    ...state[components][lesson]
});

const mapDispatchToProps = (dispatch: Dispatch): ComparatorDispatch => ({
    turnOnComparator: () => dispatch(onTurnOnComparator()),
    startLesson: () => dispatch(onStartLesson()),
    endingLesson: () => dispatch(onEndingLesson()),
    addEventListener: () => dispatch(onAddEventListener(handleKeyboardDown)),
    removeEventListener: () => dispatch(onRemoveEventListener()),
    keepState: () => dispatch(onKeepState(LocalStorageItemTypes.comparator, comparator)),
    restoreState: () => dispatch(onRestoreState(LocalStorageItemTypes.comparator, restoreState))
});

const ComparatorContainer = connect(mapStateToProps, mapDispatchToProps)(Comparator);

export default ComparatorContainer;

export interface ComparatorDispatch {
    turnOnComparator: () => void;
    startLesson: () => void;
    endingLesson: () => void;
    addEventListener: () => void;
    removeEventListener: () => void;
    keepState: () => void;
    restoreState: () => void;
};

export interface ComparatorProps extends
    ComparatorState,
    ComparatorDispatch,
    LessonState {};