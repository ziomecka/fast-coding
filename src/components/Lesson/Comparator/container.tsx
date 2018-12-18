import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as Comparator } from './component';
import { ApplicationState } from '../../../store';

import { ComparatorState } from './_duck/reducers';
import { LessonState } from '../_duck/reducers';

import { ComponentsContainersEnum, ApplicationContainersEnum, LocalStorageItemEnum } from '@applicationTypes';

const { components } = ApplicationContainersEnum;
const { comparator, lesson } = ComponentsContainersEnum;

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
    keepState: () => dispatch(onKeepState(LocalStorageItemEnum.comparator, comparator)),
    restoreState: () => dispatch(onRestoreState(LocalStorageItemEnum.comparator, restoreState))
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