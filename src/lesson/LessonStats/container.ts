import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as LessonStats } from './component';
import { ApplicationState } from '@appStore';

import { ILessonCommonState } from '@lessonTypes';
import { LessonStatsState, pauseLessonStats, unpauseLessonStats } from './_duck/';

import { WithStyles } from '@material-ui/core/styles';
import { WithTableProps } from '@app/Table/';

import { LocalizeState } from 'react-localize-redux';

import { mapDispatchToProps as commonMapDispatchToProps } from '@lesson/_shared/';

const mapStateToProps = ( state: ApplicationState ): IMapStateToProps => ( {
    ...commonMapDispatchToProps( state ),
    allErrors: state.lesson.lessonComparator.allErrors,
    errors: state.lesson.lessonComparator.errors,
    text: state.lesson.lessonComponent.lessonText,
    ...state.lesson.lessonStats,
    localize: state.localize
} );

const mapDispatchToProps = ( dispatch: Dispatch ): IMapDispatchToProps => ( {
    pauseLessonStats: () => dispatch( pauseLessonStats() ),
    unpauseLessonStats: () => dispatch( unpauseLessonStats() )
} );

const LessonStatsContainer = connect( mapStateToProps, mapDispatchToProps )( LessonStats );

export default LessonStatsContainer;

interface IMapStateToProps extends
ILessonCommonState,
LessonStatsState {
    allErrors: number[];
    errors: number[];
    text: string;
    localize: LocalizeState;
}

interface IMapDispatchToProps {
    pauseLessonStats: () => Action;
    unpauseLessonStats: () => Action;
}

export interface LessonStatsProps extends
IMapDispatchToProps,
IMapStateToProps,
WithStyles,
WithTableProps {}
