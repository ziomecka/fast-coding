import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as Comparator } from './component';
import { ApplicationState } from '../../../store';

import { ComparatorState } from './_duck/reducers';
import { LessonState } from '../_duck/reducers';

import { ComponentsContainers, ApplicationContainers } from '../../../_common/';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;

import { onEndingLesson } from '../_duck/operations';
import { onKeepState, onRestoreState } from './_duck/operations/retore.state';
import { startLesson } from '../_duck/actions';
import { onTurnOnComparator, onAddEventListener, handleKeyboardDown, onRemoveEventListener } from './_duck/operations';

// TODO chyba nie jest potrzebny cały state
const mapStateToProps = (state: ApplicationState): ComparatorState & LessonState => ({
    ...state[components][comparator],
    ...state[components][lesson]
});

const mapDispatchToProps = (dispatch: Dispatch): ComparatorDispatch => ({
    turnOnComparator: () => dispatch(onTurnOnComparator()),
    startLesson: () => dispatch(startLesson()),
    endingLesson: () => dispatch(onEndingLesson()),
    addEventListener: () => dispatch(onAddEventListener(handleKeyboardDown)),
    removeEventListener: () => dispatch(onRemoveEventListener()),
    keepState: () => dispatch(onKeepState()),
    restoreState: () => dispatch(onRestoreState())
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