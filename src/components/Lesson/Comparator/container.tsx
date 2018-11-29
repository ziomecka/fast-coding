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
import { startLesson } from '../_duck/actions';
import { onTurnOnComparator, onTurnOffComparator, onAddEventListener, onRemoveEventListener } from './_duck/operations';

// TODO chyba nie jest potrzebny cały state
const mapStateToProps = (state: ApplicationState): ComparatorState & LessonState => ({
    ...state[components][comparator],
    ...state[components][lesson]
});

const mapDispatchToProps = (dispatch: Dispatch): ComparatorDispatch => ({
    turnOnComparator: () => dispatch(onTurnOnComparator()),
    turnOffComparator: () => dispatch(onTurnOffComparator()),
    startLesson: () => dispatch(startLesson()),
    endingLesson: () => dispatch(onEndingLesson()),
    addEventListener: () => dispatch(onAddEventListener()),
    removeEventListener: () => dispatch(onRemoveEventListener())
});

const ComparatorContainer = connect(mapStateToProps, mapDispatchToProps)(Comparator);

export default ComparatorContainer;

export interface ComparatorDispatch {
    turnOnComparator: () => void;
    turnOffComparator: () => void;
    startLesson: () => void;
    endingLesson: () => void;
    addEventListener: () => void;
    removeEventListener: () => void;
};

// TODO verify
export interface ComparatorProps extends
    ComparatorState,
    ComparatorDispatch,
    LessonState {
        verify?(): boolean;
    };