import { connect } from 'react-redux';

import { default as Comparator } from './component';
import { ApplicationState } from '../../../store';

import { ComparatorState } from './_duck/reducers';
import { LessonState } from '../_duck/reducers';

import { ComponentsContainers, ApplicationContainers } from '../../../_common/';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;

// TODO chyba nie jest potrzebny cały state
const mapStateToProps = (state: ApplicationState): ComparatorState & LessonState => ({
    ...state[components][comparator],
    ...state[components][lesson]
});

const ComparatorContainer = connect(mapStateToProps)(Comparator);

export default ComparatorContainer;

// TODO verify
export interface ComparatorProps extends ComparatorState, LessonState {
    verify?(): boolean;
};