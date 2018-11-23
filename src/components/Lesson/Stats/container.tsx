import { connect } from 'react-redux';

import { default as Stats } from './component';
import { ApplicationState } from '../../../store';

import { StatsState } from './_duck/reducers';

import { ComponentsContainers, ApplicationContainers, ComparatorContainers } from '../../../_common/';

const { components } = ApplicationContainers;
const { comparator, lesson } = ComponentsContainers;
const { stats } = ComparatorContainers;

const mapStateToProps = (state: ApplicationState): ExtendedStatsState => ({
    allErrors: state[components][comparator].allErrors,
    text: state[components][lesson].text,
    endedLesson: state[components][lesson].ended,
    ...state[components][comparator][stats]
});

const StatsContainer = connect(mapStateToProps)(Stats);

export default StatsContainer;

interface ExtendedStatsState extends StatsState {
    allErrors: number[];
    text: string;
    endedLesson: boolean;
}

export interface StatsProps extends ExtendedStatsState {
};