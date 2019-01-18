import { connect } from 'react-redux';

import { default as LessonText } from './component';
import { ApplicationState } from '@appStore';

import { ComparatorState } from '@components/Comparator/';
import { LessonState } from '@components/Lesson/';

import { WithStyles } from '@material-ui/core/styles';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    ...state.components.comparator,
    ...state.components.lesson
} );

const LessonTextContainer = connect( mapStateToProps )( LessonText );

export default LessonTextContainer;

interface MapStateToPropsI extends ComparatorState, LessonState {}

export interface LessonTextProps extends
    MapStateToPropsI,
    WithStyles {}
