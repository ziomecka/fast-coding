import { connect } from 'react-redux';

import { default as Stats } from './component';
import { ApplicationState } from '../../../store';

import { ComparatorState } from '../Comparator/_duck/reducers';

import { ComponentsContainers, ApplicationContainers } from '../../../_common/';

const { components } = ApplicationContainers;
const { comparator } = ComponentsContainers;

const mapStateToProps = (state: ApplicationState): ComparatorState => ({
    ...state[components][comparator]
});

const StatsContainer = connect(mapStateToProps)(Stats);

export default StatsContainer;

export interface StatsProps extends ComparatorState {};