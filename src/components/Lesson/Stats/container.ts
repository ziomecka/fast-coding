import { connect } from 'react-redux';

import { default as Stats } from './component';
import { ApplicationState } from '@appStore';

import { StatsState } from './_duck/reducers';

import { WithStyles } from '@material-ui/core/styles';
import { WithTableProps } from '@app/Table/';

import { LocalizeState } from 'react-localize-redux';

const mapStateToProps = ( state: ApplicationState ): ExtendedStatsState => ( {
    allErrors: state.components.comparator.allErrors,
    errors: state.components.comparator.errors,
    text: state.components.lesson.lessonText,
    endedLesson: state.components.lesson.ended,
    ...state.components.comparator.stats,
    localize: state.localize
} );

const StatsContainer = connect( mapStateToProps )( Stats );

export default StatsContainer;

interface ExtendedStatsState extends StatsState {
    allErrors: number[];
    errors: number[];
    text: string;
    endedLesson: boolean;
    localize: LocalizeState;
}

export interface StatsProps extends ExtendedStatsState, WithStyles, WithTableProps {}
